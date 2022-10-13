import { Args, getTasks, Quest } from "grimoire-kolmafia";
import {
  adv1,
  cliExecute,
  getLocationMonsters,
  myAdventures,
  myTurncount,
  totalTurnsPlayed,
  use,
} from "kolmafia";
import {
  $effect,
  $item,
  $location,
  $skill,
  AsdonMartin,
  Counter,
  get,
  have,
  Session,
  sinceKolmafiaRevision,
  withProperty,
} from "libram";

import { capsule } from "./capsule";
import { ChronerEngine, ChronerQuest, ChronerStrategy, ChronerTask, resetNcForced } from "./engine";
import { enableDebug, printd, printh } from "./lib";
import Macro from "./macro";
import { rose } from "./rose";
import { setup } from "./setup";

const args = Args.create("chrono", "A script for farming chroner", {
  turns: Args.number({
    help: "The number of turns to run (use negative numbers for the number of turns remaining)",
    default: Infinity,
  }),
  mode: Args.string({
    options: [
      ["rose", "Farm Roses from The Main Stage"],
      ["capsule", "Farm Time Capsules from the Cave Before Time"],
    ],
    default: "rose",
  }),
  debug: Args.flag({
    help: "Turn on debug printing",
    default: false,
  }),
});

export function main(command?: string) {
  Args.fill(args, command);

  if (args.help) {
    Args.showHelp(args);
    return;
  }
  if (args.debug) {
    enableDebug();
  }

  sinceKolmafiaRevision(26834);
  const turncount = myTurncount();
  const completed =
    args.turns > 0
      ? () => myTurncount() - turncount >= args.turns || myAdventures() === 0
      : () => myAdventures() === -args.turns;

  let digitizes = -1;
  const yrTarget = $location`The Cave Before Time`;

  const quest: ChronerQuest =
    args.mode === "capsule" ? { ...capsule, completed } : { ...rose, completed };
  const global: Quest<ChronerTask> = {
    name: "Global",
    completed,
    tasks: [
      {
        name: "Clara's Bell",
        completed: () => !have($item`Clara's bell`) || get("_claraBellUsed"),
        do: () => {
          use($item`Clara's bell`);
        },
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
            ...quest.outfit(),
            back: $item`protonic accelerator pack`,
          };
        },
        completed: () => get("questPAGhost") === "unstarted",
        combat: new ChronerStrategy(
          Macro.trySkill($skill`Sing Along`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Trap Ghost`)
        ),
        sobriety: "sober",
      },
      {
        name: "Vote Wanderer",
        ready: () =>
          have($item`"I Voted!" sticker`) &&
          totalTurnsPlayed() % 11 === 1 &&
          get("lastVoteMonsterTurn") < totalTurnsPlayed() &&
          get("_voteFreeFights") < 3,
        do: (): void => {
          adv1(quest.location, -1, "");
        },
        outfit: () => {
          return {
            ...quest.outfit(),
            acc3: $item`"I Voted!" sticker`,
          };
        },
        completed: () => get("lastVoteMonsterTurn") === totalTurnsPlayed(),
        combat: new ChronerStrategy(Macro.redigitize().standardCombat()),
        sobriety: "either",
      },
      {
        name: "Digitize Wanderer",
        ready: () => Counter.get("Digitize") <= 0,
        outfit: quest.outfit,
        completed: () => get("_sourceTerminalDigitizeMonsterCount") !== digitizes,
        do: () => {
          adv1(quest.location, -1, "");
          digitizes = get("_sourceTerminalDigitizeMonsterCount");
        },
        combat: new ChronerStrategy(Macro.redigitize().standardCombat()),
        sobriety: "either",
      },
      {
        name: "Time Capsule",
        do: () => {
          adv1($location`The Cave Before Time`, 0, "");
          if (get("lastEncounter") === "Time Cave.  Period.") {
            printd("Forced noncombat!");
            resetNcForced();
          } else {
            printd("Uh oh, we didn't force the NC");
            const possibleEncouters = Object.keys(
              getLocationMonsters($location`The Cave Before Time`)
            );
            if (possibleEncouters.includes(get("lastEncounter"))) {
              printd("We hit a normal monster, so reset the noncombat forcing");
              resetNcForced();
            } else {
              printd("We hit something else, so keep trying for the noncombat");
            }
          }
        },
        forced: true,
        sobriety: "either",
        completed: () => false,
        combat: new ChronerStrategy(Macro.standardCombat()),
      }, {
        name: "Spikolodon Spikes",
        ready: () =>
          have($item`Jurassic Parka`) &&
          have($skill`Torso Awareness`) &&
          get("_spikolodonSpikeUses") < 5,
        outfit: () => {
          return {
            ...quest.outfit(),
            shirt: $item`Jurassic Parka`,
          };
        },
        do: quest.location,
        completed: () => false,
        prepare: () => cliExecute("parka spikolodon"),
        combat: new ChronerStrategy(
          Macro.trySkill($skill`Launch spikolodon spikes`).standardCombat()
        ),
        sobriety: "sober",
      },
      {
        name: "Bowling Ball Run",
        ready: () => get("cosmicBowlingBallReturnCombats") < 1,
        do: $location`The Cave Before Time`,
        sobriety: "sober",
        completed: () => false,
        combat: new ChronerStrategy(
          Macro.tryHaveSkill($skill`Summon Mayfly Swarm`)
            .trySkill($skill`Bowl a Curveball`)
            .abort()
        ),
      },
      {
        name: "Asdon Missle",
        ready: () => AsdonMartin.installed(),
        completed: () => get("_missileLauncherUsed") || have($effect`Everything Looks Yellow`),
        combat: new ChronerStrategy(
          Macro.tryHaveSkill($skill`Summon Mayfly Swarm`)
            .skill($skill`Asdon Martin: Missile Launcher`)
            .abort()
        ),
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
            ...quest.outfit(),
            shirt: $item`Jurassic Parka`,
          };
        },
        prepare: () => cliExecute("parka dilophosaur"),
        do: yrTarget,
        combat: new ChronerStrategy(
          Macro.tryHaveSkill($skill`Summon Mayfly Swarm`)
            .skill($skill`Spit jurassic acid`)
            .abort()
        ),
        sobriety: "sober",
      },
    ],
  };

  const engine = new ChronerEngine(getTasks([setup, global, quest]));
  engine.print();

  const sessionStart = Session.current();

  withProperty("recoveryScript", "", () => {
    try {
      engine.run();
    } finally {
      engine.destruct();
    }
  });

  const sessionResults = Session.current().diff(sessionStart);

  printh(`SESSION RESULTS:`);
  for (const [item, count] of sessionResults.items.entries()) {
    printh(`ITEM ${item} QTY ${count}`);
  }
}
