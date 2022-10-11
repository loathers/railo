import { Args, CombatStrategy, Engine, getTasks, OutfitSlot, OutfitSpec, Quest, Task } from "grimoire-kolmafia";
import {
  adv1,
  cliExecute,
  Familiar,
  inebrietyLimit,
  isDarkMode,
  Item,
  myAdventures,
  myFamiliar,
  myHp,
  myInebriety,
  myMaxhp,
  myTurncount,
  print,
  runChoice,
  useSkill,
  visitUrl
} from "kolmafia";
import {
  $effect,
  $effects,
  $familiar,
  $familiars,
  $item,
  $location,
  $locations,
  $skill,
  AsdonMartin,
  AutumnAton,
  get,
  getKramcoWandererChance,
  have,
  JuneCleaver,
  Macro,
  Session,
  set,
  sinceKolmafiaRevision,
  uneffect,
  withProperty,
} from "libram";

import { freeFightFamiliar } from "./familiar";
import { bestJuneCleaverOption, shouldSkip } from "./juneCleaver";

const args = Args.create("chroner-collector", "A script for farming chroner", {
  turns: Args.number({
    help: "The number of turns to run (use negative numbers for the number of turns remaining)",
    default: Infinity,
  }),
});

const HIGHLIGHT = isDarkMode() ? "yellow" : "blue";
function printh(message: string) {
  print(message, HIGHLIGHT);
}

export function sober() {
  return myInebriety() <= inebrietyLimit() + (myFamiliar() === $familiar`Stooper` ? -1 : 0);
}

type ChronerTask = Task & {
  sobriety: "sober" | "drunk" | "either";
};

class ChronerEngine extends Engine<never, ChronerTask> {
  available(task: ChronerTask): boolean {
    const sobriety =
      task.sobriety === "either" ||
      (sober() && task.sobriety === "sober") ||
      (!sober() && task.sobriety === "drunk");
    return sobriety && super.available(task);
  }

  print() {
    printh(`Task List:`)
    for(const task of this.tasks) {
      printh(`${task.name}: available:${this.available(task)}`)
    }
  }
}

export function main(command?: string) {
  Args.fill(args, command);

  sinceKolmafiaRevision(26834);
  const turncount = myTurncount();
  const completed =
    args.turns > 0
      ? () => myTurncount() - turncount >= args.turns || myAdventures() === 0
      : () => myAdventures() === -args.turns;
  const chooseFamiliar = () =>
    $familiars`Reagnimated Gnome, Temporal Riftlet`.find((f) => have(f)) ?? freeFightFamiliar();
  const chooseFamEquip = (fam: Familiar) =>
    fam === $familiar`Reagnimated Gnome` ? $item`gnomish housemaid's kgnee` : $item`tiny stillsuit`;

  const outfitSpec = (): OutfitSpec => {
    const familiar = chooseFamiliar();
    const famequip = chooseFamEquip(familiar);

    const ifHave = (slot: OutfitSlot, item: Item ): OutfitSpec => have(item) ? Object.fromEntries([[slot, item]]) : {}

    return {
      ...ifHave("weapon", $item`June cleaver`),
      ...ifHave("offhand",$item`carnivorous potted plant`),
      ...ifHave("acc1", $item`mafia thumb ring`),
      ...ifHave("acc2", $item`time-twitching toolbelt`),
      ...ifHave("acc3", $item`lucky gold ring`),
      ...ifHave("famequip", famequip),
      familiar,
      modifier: $familiars`Reagnimated Gnome, Temporal Riftlet`.includes(familiar)
        ? "Familiar Weight"
        : "Item Drop",
    };
  };

  const globeTheater = $location`Globe Theatre Main Stage`;
  const yrTarget = $location`The Cave Before Time`;
  const poisons = $effects`Hardly Poisoned at All, A Little Bit Poisoned, Somewhat Poisoned, Really Quite Poisoned, Majorly Poisoned`

  const ttt: Quest<ChronerTask> = {
    name: "TimeTwitchingTower",
    tasks: [
      {
        name: "Beaten Up",
        completed: () => !have($effect`Beaten Up`),
        do: () => {
          if(have($effect`Beaten Up`)) {
            throw "You were beaten up!"
          }
        },
        sobriety: "either"
      },
      {
        name: "Recover",
        completed: () => myHp() / myMaxhp() >= 0.5,
        do: () => {
          useSkill($skill`Cannelloni Cocoon`);
        },
        sobriety: "either"
      },
      {
        name: "Antidote",
        completed: () => poisons.every((e) => !have(e)),
        do: () => poisons.forEach((e) => uneffect(e)),
        sobriety: "either"
      },
      {
        name: "Kgnee",
        completed: () =>
          !have($familiar`Reagnimated Gnome`) || have($item`gnomish housemaid's kgnee`),
        do: (): void => {
          visitUrl("arena.php");
          runChoice(4);
        },
        outfit: { familiar: $familiar`Reagnimated Gnome` },
        sobriety: "sober",
      },
      {
        name: "Autumn-Aton",
        completed: () => completed() && AutumnAton.currentlyIn() !== null,
        do: () => AutumnAton.sendTo($locations`Moonshiners' Woods, The Dire Warren`),
        ready: () => AutumnAton.available(),
        sobriety: "either",
      },
      {
        name: "June Cleaver",
        completed: () => !!get("_juneCleaverFightsLeft"),
        do: () =>
          withProperty("recoveryScript", "", () => {
            adv1($location`Noob Cave`, -1, "");
            if (["Poetic Justice", "Lost and Found"].includes(get("lastEncounter"))) {
              uneffect($effect`Beaten Up`);
            }
          }),
          prepare: () => {
            for(const choice of JuneCleaver.choices)
            {
              set(`choiceAdventure${choice}`, shouldSkip(choice) ? 4 : bestJuneCleaverOption(choice))
            }
          },
        sobriety: "either",
        ready: () => JuneCleaver.have() && !get("_juneCleaverFightsLeft"),
        outfit: { weapon: $item`June cleaver` },
        combat: new CombatStrategy().macro(Macro.abort()),
      },
      {
        name: "Proton Ghost",
        ready: () =>
          have($item`protonic accelerator pack`) &&
          get("questPAGhost") !== "unstarted" &&
          !!get("ghostLocation"),
        do: (): void => {
          const location = get("ghostLocation");
          if (location) {
            adv1(location, 0, "");
          } else {
            throw "Could not determine Proton Ghost location!";
          }
        },
        outfit: () => {
          return {
            ...outfitSpec,
            back: $item`protonic accelerator pack`,
          };
        },
        completed: () => get("questPAGhost") === "unstarted",
        combat: new CombatStrategy().macro(
          Macro.trySkill($skill`Sing Along`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Trap Ghost`)
        ),
        sobriety: "sober",
      },
      {
        name: "Asdon Missle",
        ready: () => AsdonMartin.installed(),
        completed: () => get("_missileLauncherUsed") || have($effect`Everything Looks Yellow`),
        combat: new CombatStrategy().macro(Macro.skill($skill`Asdon Martin: Missile Launcher`)),
        prepare: () => AsdonMartin.fillTo(100),
        do: yrTarget,
        sobriety: "sober",
      },
      {
        name: "Spit Jurassic Acid",
        completed: () => have($effect`Everything Looks Yellow`),
        ready: () => have($item`Jurassic Parka`) && have($skill`Torso Awareness`),
        outfit: () => {
          return {
            ...outfitSpec,
            shirt: $item`Jurassic Parka`,
          };
        },
        prepare: () => cliExecute("parka dilophosaur"),
        do: yrTarget,
        combat: new CombatStrategy().macro(Macro.skill($skill`Spit jurassic acid`).abort()),
        sobriety: "sober",
      },
      {
        name: "Chroner",
        completed,
        do: globeTheater,
        outfit: () => {
          if (!sober()) {
            return {
              ...outfitSpec(),
              offhand: $item`Drunkula's wineglass`,
            };
          }
          if (have($item`Kramco Sausage-o-Matic™`) && getKramcoWandererChance() >= 1) {
            return {
              ...outfitSpec(),
              offhand: $item`Kramco Sausage-o-Matic™`,
            };
          }
          return outfitSpec();
        },
        combat: new CombatStrategy().macro(
          Macro.externalIf(
            get("cosmicBowlingBallReturnCombats") < 1,
            Macro.trySkill($skill`Bowl Straight Up`)
          )
            .trySkill($skill`Sing Along`)
            .trySkill($skill`Extract`)
            .attack()
            .repeat()
        ),
        sobriety: "either",
      },
    ],
  };

  const engine = new ChronerEngine(getTasks([ttt]));
  const sessionStart = Session.current();

  try {
    engine.run();
  } finally {
    engine.destruct();
  }

  const sessionResults = Session.current().diff(sessionStart);

  printh(`SESSION RESULTS:`);
  for (const [item, count] of sessionResults.items.entries()) {
    printh(`ITEM ${item} QTY ${count}`);
  }
}
