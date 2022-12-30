import { availableAmount, myPrimestat, toEffect, toSkill } from "kolmafia";
import { $effect, $effects, $item, $items, $location, $skill, $stat, have, sum } from "libram";

import { CrimboQuest, CrimboStrategy } from "../engine";
import { args, toasterGazeIfNecessary } from "../lib";
import Macro from "../macro";
import { chooseQuestOutfit, drunkSpec, orbSpec } from "../outfit";

const location = $location`Crimbo Train (Coal Car)`;
const dining: CrimboQuest = {
  name: "Coal Car",
  location,
  tasks: [
    {
      name: "Crimbo",
      completed: () => false,
      do: location,
      outfit: () => chooseQuestOutfit({ location, isFree: false }, drunkSpec, orbSpec(location)),
      effects: () =>
        [
          ...$effects`Blood Bubble, Blood Bond, Frenzied\, Bloody, Empathy, Leash of Linguini, Ruthlessly Efficient, Mathematically Precise, Psalm of Pointiness, Paul's Passionate Pop Song, Cringle's Curative Carol`,
          toEffect($skill`Shield of the Pastalord`),
          myPrimestat() === $stat`mysticality`
            ? $effect`Carol of the Hells`
            : $effect`Carol of the Bulls`,
        ].filter((effect) => have(toSkill(effect))),
      combat: new CrimboStrategy(() => Macro.hardCombat()),
      sobriety: "either",
      choices: {
        [1489]: () => (have($item`Crimbo crystal shards`) ? pickGobletOption() : 3),
      },
      post: toasterGazeIfNecessary,
    },
  ],
};

function pickGobletOption(): 1 | 2 {
  if (args.tableware === "drink") return 1;
  if (args.tableware === "food") return 2;

  const totalFood = sum($items`Crimbo dinner, crystal Crimbo platter`, availableAmount);
  const totalDrink = sum($items`Crimbosmopolitan, crystal Crimbo goblet`, availableAmount);
  return totalFood > totalDrink ? 1 : 2;
}

export default dining;
