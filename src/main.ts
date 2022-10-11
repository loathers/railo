import { Args, CombatStrategy, Engine, getTasks, OutfitSpec, Quest, Task } from "grimoire-kolmafia";
import {
  adv1,
  cliExecute,
  inebrietyLimit,
  isDarkMode,
  Familiar,
  print,
  myAdventures,
  myFamiliar,
  myInebriety,
  myTurncount,
  runChoice,
  visitUrl,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $familiars,
  $item,
  $location,
  $locations,
  $skill,
  AsdonMartin,
  AutumnAton,
  get,
  have,
  Macro,
  Session,
  getKramcoWandererChance,
} from "libram";

import { freeFightFamiliar } from "./familiar";

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
}

export function main(command?: string) {
  Args.fill(args, command);

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
    return {
      weapon: $item`June cleaver`,
      offhand: $item`carnivorous potted plant`,
      acc1: $item`mafia thumb ring`,
      acc2: $item`time-twitching toolbelt`,
      acc3: $item`lucky gold ring`,
      familiar,
      famequip,
      modifier: $familiars`Reagnimated Gnome, Temporal Riftlet`.includes(familiar)
        ? "Familiar Weight"
        : "Item Drop",
    };
  };

  const globeTheater = $location`Globe Theatre Main Stage`;
  const yrTarget = $location`The Cave Before Time`;

  const ttt: Quest<ChronerTask> = {
    name: "TimeTwitchingTower",
    tasks: [
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
        do: () => AutumnAton.sendTo($locations`Globe Theatre Main Stage, The Dire Warren`),
        ready: () => AutumnAton.available(),
        sobriety: "either",
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
