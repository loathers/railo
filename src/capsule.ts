import { $item, $location, getKramcoWandererChance } from "libram";

import { ChronerQuest, ChronerStrategy } from "./engine";
import { sober } from "./lib";
import Macro from "./macro";
import { chooseQuestOutfit, ifHave } from "./outfit";

export const capsule: ChronerQuest = {
  name: "Capsule",
  location: $location`The Cave Before Time`,
  outfit: () => chooseQuestOutfit(capsule),
  tasks: [
    {
      name: "Chroner",
      completed: () => false,
      do: $location`The Cave Before Time`,
      outfit: () => {
        const drunkSpec = sober() ? {} : { offhand: $item`Drunkula's wineglass` };
        const sausageSpec =
          getKramcoWandererChance() >= 1 ? ifHave("offhand", $item`Kramco Sausage-o-Matic™`) : {};
        return chooseQuestOutfit(capsule, sausageSpec, drunkSpec);
      },
      combat: new ChronerStrategy(Macro.standardCombat()),
      sobriety: "either",
    },
  ],
};
