import { $item, $location } from "libram";

import { CrimboQuest, CrimboStrategy } from "./engine";
import { sober } from "./lib";
import Macro from "./macro";
import { chooseQuestOutfit } from "./outfit";

const location = $location`Crimbo Train (Caboose)`;
export const caboose: CrimboQuest = {
  name: "Caboose",
  location,
  tasks: [
    {
      name: "Crimbo",
      completed: () => false,
      do: location,
      outfit: () => {
        const drunkSpec = sober() ? {} : { offhand: $item`Drunkula's wineglass` };
        return chooseQuestOutfit(
          { location, isFree: false },
          drunkSpec
        );
      },
      combat: new CrimboStrategy(() => Macro.standardCombat()),
      sobriety: "either",
    },
  ],
};
