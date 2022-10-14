import { myLocation } from "kolmafia";
import { $item, $location, FloristFriar, getKramcoWandererChance } from "libram";

import { ChronerQuest, ChronerStrategy } from "./engine";
import { sober } from "./lib";
import Macro from "./macro";
import { chooseQuestOutfit, ifHave } from "./outfit";

const location = $location`Globe Theatre Main Stage`;
let triedFlorist = false;
export const rose: ChronerQuest = {
  name: "Rose",
  location,
  tasks: [
    {
      name: "Flowers",
      ready: () => FloristFriar.have() && myLocation() === location,
      completed: () => FloristFriar.isFull() || triedFlorist,
      do: () => {
        const flowers = [
          FloristFriar.ArcticMoss,
          FloristFriar.SpiderPlant,
          FloristFriar.BamBoo,
          ...FloristFriar.flowersAvailableFor(location),
        ];
        for (const flower of flowers) flower.plant();
        triedFlorist = true;
      },
      sobriety: "either",
    },
    {
      name: "Chroner",
      completed: () => false,
      do: $location`Globe Theatre Main Stage`,
      outfit: () => {
        const drunkSpec = sober() ? {} : { offhand: $item`Drunkula's wineglass` };
        const sausageSpec =
          getKramcoWandererChance() >= 1 ? ifHave("offhand", $item`Kramco Sausage-o-Matic™`) : {};
        return chooseQuestOutfit(
          { location, isFree: getKramcoWandererChance() >= 1 },
          sausageSpec,
          drunkSpec
        );
      },
      combat: new ChronerStrategy(Macro.standardCombat()),
      sobriety: "either",
    },
  ],
};
