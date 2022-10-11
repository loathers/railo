import { Args, CombatStrategy, Engine, getTasks, OutfitSpec, Quest, Task } from "grimoire-kolmafia";
import {
  adv1,
  cliExecute,
  myAdventures,
  visitUrl,
  runChoice,
  isDarkMode,
  print,
  myTurncount,
} from "kolmafia";
import {
  AsdonMartin,
  $effect,
  $familiar,
  $familiars,
  $item,
  $location,
  $locations,
  $skill,
  AutumnAton,
  get,
  have,
  Macro,
  Session,
  getKramcoWandererChance,
} from "libram";

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

export function main(command?: string) {
  Args.fill(args, command);

  const turncount = myTurncount();
  const completed =
    args.turns > 0
      ? () => myTurncount() - turncount >= args.turns || myAdventures() === 0
      : () => myAdventures() === -args.turns;
  const familiar = $familiars`Reagnimated Gnome, Temporal Riftlet, none`.find((f) => have(f));
  const famequip =
    familiar === $familiar`Reagnimated Gnome` ? $item`nomish housemaid's kgnee` : $item`stillsuit`;

  const outfitSpec: OutfitSpec = {
    weapon: $item`June cleaver`,
    offhand: $item`carnivorous potted plant`,
    acc1: $item`mafia thumb ring`,
    acc2: $item`time-twitching toolbelt`,
    acc3: $item`lucky gold ring`,
    familiar,
    famequip,
  };

  const globeTheater = $location`Globe Theatre Main Stage`;
  const yrTarget = $location`The Cave Before Time`;

  const ttt: Quest<Task> = {
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
      },
      {
        name: "Autumn-Aton",
        completed: () => completed() && AutumnAton.currentlyIn() !== null,
        do: () => AutumnAton.sendTo($locations`Globe Theatre Main Stage, The Dire Warren`),
        ready: () => AutumnAton.available(),
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
      },
      {
        name: "Asdon Missle",
        ready: () => AsdonMartin.installed(),
        completed: () => get("_missileLauncherUsed") || have($effect`Everything Looks Yellow`),
        combat: new CombatStrategy().macro(Macro.skill($skill`Asdon Martin: Missile Launcher`)),
        prepare: () => AsdonMartin.fillTo(100),
        do: yrTarget,
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
      },
      {
        name: "Chroner",
        completed,
        do: globeTheater,
        outfit: () => {
          if (have($item`Kramco Sausage-o-Matic™`) && getKramcoWandererChance() >= 1) {
            return {
              ...outfitSpec,
              offhand: $item`Kramco Sausage-o-Matic™`,
            };
          }
          return outfitSpec;
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
      },
    ],
  };

  const engine = new Engine(getTasks([ttt]));
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
