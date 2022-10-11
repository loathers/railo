import { Args, CombatStrategy, Engine, getTasks, Quest, Task } from "grimoire-kolmafia";
import { cliExecute, myAdventures, visitUrl, runChoice, myTurncount } from "kolmafia";
import {
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
} from "libram";

const args = Args.create("chroner-collector", "A script for farming chroner", {
  turns: Args.number({
    help: "The number of turns to run (use negative numbers for the number of turns remaining)",
    default: Infinity,
  }),
});

export function main(command?: string) {
  Args.fill(args, command);

  const turncount = myTurncount();
  const completed = args.turns < 0 ? () => myTurncount() - turncount >= args.turns : () => myAdventures() === -args.turns;
  const familiar = $familiars`Reagnimated Gnome, Temporal Riftlet, none`.find((f) => have(f));

  const ttt: Quest<Task> = {
    name: "TimeTwitchingTower",
    tasks: [
      {
        name: "Autumn-Aton",
        completed: () => completed() && AutumnAton.currentlyIn() !== null,
        do: () => AutumnAton.sendTo($locations`Globe Theatre Main Stage, The Dire Warren`),
        ready: () => AutumnAton.available(),
      },
      {
        name: "Spit Jurassic Acid",
        completed: () => have($effect`Everything Looks Yellow`),
        ready: () => have($item`Jurassic Parka`) && have($skill`Torso Awareness`),
        outfit: () => {
          return {
            weapon: $item`June cleaver`,
            offhand: $item`carnivorous potted plant`,
            shirt: $item`Jurassic Parka`,
            acc2: $item`time-twitching toolbelt`,
            acc3: $item`lucky gold ring`,
            familiar,
          };
        },
        prepare: () => cliExecute("parka dilophosaur"),
        do: $location`Globe Theatre Main Stage`,
        combat: new CombatStrategy().macro(Macro.skill($skill`Spit jurassic acid`).abort()),
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
      },
      {
        name: "Chroner",
        completed,
        do: $location`Globe Theatre Main Stage`,
        outfit: () => {
          return {
            weapon: $item`June cleaver`,
            offhand: $item`carnivorous potted plant`,
            acc1: $item`mafia thumb ring`,
            acc2: $item`time-twitching toolbelt`,
            acc3: $item`lucky gold ring`,
            familiar,
          };
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
  try {
    engine.run();
  } finally {
    engine.destruct();
  }
}
