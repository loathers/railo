import { myPrimestat, toEffect, toSkill } from "kolmafia";
import { $effect, $effects, $location, $skill, $stat, have } from "libram";

import { CrimboQuest, CrimboStrategy } from "../engine";
import { toasterGazeIfNecessary } from "../lib";
import Macro from "../macro";
import { chooseQuestOutfit, drunkSpec, orbSpec } from "../outfit";

const location = $location`Crimbo Train (Dining Car)`;
const dining: CrimboQuest = {
  name: "Dining Car",
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
      post: toasterGazeIfNecessary,
    },
  ],
};

export default dining;
