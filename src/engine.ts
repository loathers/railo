import { CombatStrategy, Engine, Outfit, Quest, Task } from "grimoire-kolmafia";
import {
  bjornifyFamiliar,
  enthroneFamiliar,
  equippedAmount,
  Location,
  setAutoAttack,
} from "kolmafia";
import { $item, $slot, CrownOfThrones, get, JuneCleaver, PropertiesManager } from "libram";

import { bestJuneCleaverOption, shouldSkip } from "./juneCleaver";
import { args, printd, sober, unsupportedChoices } from "./lib";
import Macro from "./macro";

export type CrimboTask = Task & {
  sobriety: "sober" | "drunk" | "either";
  forced?: boolean;
};

export type CrimboQuest = Quest<CrimboTask> & {
  location: Location;
};

const introAdventures: string[] = [];
export class CrimboStrategy extends CombatStrategy {
  constructor(macro: () => Macro) {
    super();
    this.macro(macro).autoattack(macro);
  }
}

function countAvailableNcForces() {
  return (get("_claraBellUsed") ? 0 : 1) + (5 - get("_spikolodonSpikeUses"));
}

let ncForced = false;
export function resetNcForced() {
  printd("Reset NC forcing");
  ncForced = false;
}
CrownOfThrones.createRiderMode("default", () => 0);
const chooseRider = () => CrownOfThrones.pickRider("default");
export class CrimboEngine extends Engine<never, CrimboTask> {
  available(task: CrimboTask): boolean {
    const sobriety =
      task.sobriety === "either" ||
      (sober() && task.sobriety === "sober") ||
      (!sober() && task.sobriety === "drunk");

    if (task.forced) {
      return sobriety && ncForced && super.available(task);
    }
    return sobriety && super.available(task);
  }

  initPropertiesManager(manager: PropertiesManager): void {
    super.initPropertiesManager(manager);
    for (const choices of unsupportedChoices.values()) manager.setChoices(choices);
    const priority = args.priority as "elves" | "parts" | "pingpong";
    manager.setChoice(1486, { parts: 1, elves: 2, pingpong: 3 }[priority]);
  }

  createOutfit(task: CrimboTask): Outfit {
    const outfit = super.createOutfit(task);
    if (outfit.equips.get($slot`hat`) === $item`Crown of Thrones`) {
      const choice = chooseRider();
      if (choice) enthroneFamiliar(choice.familiar);
    } else if (outfit.equips.get($slot`back`) === $item`Buddy Bjorn`) {
      const choice = chooseRider();
      if (choice) bjornifyFamiliar(choice.familiar);
    }
    return outfit;
  }

  execute(task: CrimboTask): void {
    const ncBefore = countAvailableNcForces();
    super.execute(task);
    const ncAfter = countAvailableNcForces();

    if (ncBefore > ncAfter) {
      ncForced = true;
    }
  }

  setChoices(task: CrimboTask, manager: PropertiesManager): void {
    super.setChoices(task, manager);
    if (equippedAmount($item`June cleaver`) > 0) {
      this.propertyManager.setChoices(
        Object.fromEntries(
          JuneCleaver.choices.map((choice) => [
            choice,
            shouldSkip(choice) ? 4 : bestJuneCleaverOption(choice),
          ])
        )
      );
    }
    this.propertyManager.setChoices({ 955: 2 });
  }

  shouldRepeatAdv(task: CrimboTask): boolean {
    if (["Poetic Justice", "Lost and Found"].includes(get("lastEncounter"))) {
      printd("Skipping repeating Adventure despite free NC (beaten up)");
      return false;
    }
    if (introAdventures.includes(get("lastEncounter"))) {
      printd(`Hit Intro adventure ${get("lastEncounter")} which is a free NC`);
      return true;
    }
    return super.shouldRepeatAdv(task);
  }

  print() {
    printd(`Task List:`);
    for (const task of this.tasks) {
      printd(`${task.name}: available:${this.available(task)}`);
    }
  }

  destruct(): void {
    super.destruct();
    setAutoAttack(0);
  }
}
