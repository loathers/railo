import { OutfitSpec } from "grimoire-kolmafia";
import { myLocation } from "kolmafia";
import {
  $familiars,
  $item,
  $location,
  FloristFriar,
  get,
  getKramcoWandererChance,
  have,
} from "libram";

import { ChronerQuest, ChronerStrategy } from "./engine";
import { chooseFamEquip, chooseFamiliar } from "./familiar";
import { ifHave, sober } from "./lib";
import Macro from "./macro";

function roseOutfit(): OutfitSpec {
  const familiar = chooseFamiliar({ location: $location`Globe Theatre Main Stage` });
  const famequip = chooseFamEquip(familiar);

  return {
    ...ifHave("weapon", $item`June cleaver`),
    ...ifHave("offhand", $item`carnivorous potted plant`),
    ...ifHave("acc1", $item`mafia thumb ring`),
    ...ifHave("acc2", $item`time-twitching toolbelt`),
    ...ifHave("acc3", $item`lucky gold ring`),
    ...ifHave("acc3", $item`mayfly bait necklace`, () => get("_mayflySummons") < 30),
    ...ifHave("famequip", famequip),
    ...ifHave("back", $item`Time Cloak`),
    ...ifHave(
      "pants",
      $item`designer sweatpants`,
      () => 25 * get("_sweatOutSomeBoozeUsed") + get("sweat") < 75
    ),
    ...ifHave(
      "offhand",
      $item`cursed magnifying glass`,
      () => get("_voidFreeFights") < 5 && get("cursedMagnifyingGlassCount") < 13
    ),
    ...ifHave("offhand", $item`Kramco Sausage-o-Matic™`, () => getKramcoWandererChance() >= 0.04),
    familiar,
    modifier: $familiars`Reagnimated Gnome, Temporal Riftlet`.includes(familiar)
      ? "Familiar Weight"
      : "Item Drop",
  };
}

const location = $location`Globe Theatre Main Stage`;
let triedFlorist = false;
export const rose: ChronerQuest = {
  name: "Rose",
  location,
  outfit: roseOutfit,
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
        if (!sober()) {
          return {
            ...roseOutfit(),
            offhand: $item`Drunkula's wineglass`,
          };
        }
        if (have($item`Kramco Sausage-o-Matic™`) && getKramcoWandererChance() >= 1) {
          return {
            ...roseOutfit(),
            offhand: $item`Kramco Sausage-o-Matic™`,
          };
        }
        return roseOutfit();
      },
      combat: new ChronerStrategy(Macro.standardCombat()),
      sobriety: "either",
    },
  ],
};
