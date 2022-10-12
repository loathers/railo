import { CombatStrategy, Engine, OutfitSpec, Quest, Task } from "grimoire-kolmafia";
import { equippedAmount, Location, setAutoAttack } from "kolmafia";
import { $item, get, JuneCleaver, PropertiesManager } from "libram";

import { bestJuneCleaverOption, shouldSkip } from "./juneCleaver";
import { printh, sober } from "./lib";
import Macro from "./macro";

export type ChronerTask = Task & {
  sobriety: "sober" | "drunk" | "either";
};

export type ChronerQuest = Quest<ChronerTask> & {
  location: Location;
  outfit: () => OutfitSpec;
};

export class ChronerStrategy extends CombatStrategy {
  constructor(macro: Macro) {
    super();
    this.macro(macro).autoattack(macro);
  }
}

export class ChronerEngine extends Engine<never, ChronerTask> {
  available(task: ChronerTask): boolean {
    const sobriety =
      task.sobriety === "either" ||
      (sober() && task.sobriety === "sober") ||
      (!sober() && task.sobriety === "drunk");
    return sobriety && super.available(task);
  }

  setChoices(task: ChronerTask, manager: PropertiesManager): void {
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
      this.propertyManager.setChoices({ 955: 2 });
    }
  }

  shouldRepeatAdv(task: ChronerTask): boolean {
    if (["Poetic Justice", "Lost and Found"].includes(get("lastEncounter"))) {
      return false;
    }
    return super.shouldRepeatAdv(task);
  }

  print() {
    printh(`Task List:`);
    for (const task of this.tasks) {
      printh(`${task.name}: available:${this.available(task)}`);
    }
  }

  destruct(): void {
    super.destruct();
    setAutoAttack(0);
  }
}
