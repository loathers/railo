import { Args, getTasks, Quest } from "grimoire-kolmafia";
import {
  adv1,
  canAdventure,
  cliExecute,
  myAdventures,
  myClass,
  myTurncount,
  totalTurnsPlayed,
  use,
} from "kolmafia";
import {
  $class,
  $effect,
  $item,
  $items,
  $location,
  $monsters,
  $skill,
  Counter,
  get,
  have,
  Session,
  sinceKolmafiaRevision,
  withProperty,
} from "libram";

import { CrimboEngine, CrimboQuest, CrimboStrategy, CrimboTask } from "./engine";
import { args, printh } from "./lib";
import Macro from "./macro";
import { chooseQuestOutfit } from "./outfit";
import { caboose } from "./caboose";
import { setup } from "./setup";

const QUESTS = {
  caboose
} as const;

export function main(command?: string) {
  Args.fill(args, command);

  if (args.help) {
    Args.showHelp(args);
    return;
  }

  sinceKolmafiaRevision(26834);
  const turncount = myTurncount();
  const completed =
    args.turns > 0
      ? () => myTurncount() - turncount >= args.turns || myAdventures() === 0
      : () => myAdventures() === -args.turns;

  let digitizes = -1;
  const yrTarget = $location`The Cave Before Time`;

  const quest: CrimboQuest = QUESTS[args.car as keyof typeof QUESTS];
  const global: Quest<CrimboTask> = {
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
        outfit: () =>
          chooseQuestOutfit(
            { location: quest.location, isFree: true },
            {
              back: $item`protonic accelerator pack`,
              avoid:
                get("ghostLocation") === $location`The Icy Peak`
                  ? $items`Great Wolf's beastly trousers`
                  : [],
            }
          ),
        completed: () => get("questPAGhost") === "unstarted",
        combat: new CrimboStrategy(() =>
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
        outfit: () =>
          chooseQuestOutfit(
            { location: quest.location, isFree: true },
            { acc3: $item`"I Voted!" sticker` }
          ),
        completed: () => get("lastVoteMonsterTurn") === totalTurnsPlayed(),
        combat: new CrimboStrategy(() => Macro.redigitize().standardCombat()),
        sobriety: "either",
      },
      {
        name: "Digitize Wanderer",
        ready: () => Counter.get("Digitize") <= 0,
        outfit: () =>
          chooseQuestOutfit({
            location: quest.location,
            isFree: get("_sourceTerminalDigitizeMonster")?.attributes.includes("FREE"),
          }),
        completed: () => get("_sourceTerminalDigitizeMonsterCount") !== digitizes,
        do: () => {
          adv1(quest.location, -1, "");
          digitizes = get("_sourceTerminalDigitizeMonsterCount");
        },
        combat: new CrimboStrategy(() => Macro.redigitize().standardCombat()),
        sobriety: "either",
      },
      {
        name: "Void Monster",
        ready: () =>
          have($item`cursed magnifying glass`) && get("cursedMagnifyingGlassCount") === 13,
        completed: () => get("_voidFreeFights") >= 5,
        outfit: () =>
          chooseQuestOutfit(
            { location: quest.location, isFree: true },
            { offhand: $item`cursed magnifying glass` }
          ),
        do: quest.location,
        sobriety: "sober",
        combat: new CrimboStrategy(() => Macro.standardCombat()),
      },
      {
        name: "Spit Jurassic Acid",
        completed: () => have($effect`Everything Looks Yellow`),
        ready: () => have($item`Jurassic Parka`) && have($skill`Torso Awareness`),
        outfit: () =>
          chooseQuestOutfit({ location: yrTarget, isFree: true }, { shirt: $item`Jurassic Parka` }),
        prepare: () => cliExecute("parka dilophosaur"),
        do: yrTarget,
        combat: new CrimboStrategy(() => {
          const romance = get("romanticTarget");
          const freeMonsters = $monsters`sausage goblin`;
          if (romance?.attributes.includes("FREE")) freeMonsters.push(romance);
          return Macro.if_(freeMonsters, Macro.standardCombat())
            .tryHaveSkill($skill`Summon Mayfly Swarm`)
            .skill($skill`Spit jurassic acid`)
            .abort();
        }),
        sobriety: "sober",
      },
      {
        name: "Grey You Attack Skill",
        completed: () =>
          have($skill`Nantlers`) || have($skill`Nanoshock`) || have($skill`Audioclasm`),
        do: $location`The Haunted Storage Room`,
        ready: () =>
          myClass() === $class`Grey Goo` && canAdventure($location`The Haunted Storage Room`),
        combat: new CrimboStrategy(() => Macro.standardCombat()),
        sobriety: "sober",
      },
    ],
  };

  const engine = new CrimboEngine(getTasks([setup, global, quest]));
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
