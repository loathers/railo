import { OutfitSpec } from "grimoire-kolmafia";
import { $familiars, $item, $location, get, getKramcoWandererChance, have } from "libram";

import { ChronerQuest, ChronerStrategy } from "./engine";
import { chooseFamEquip, chooseFamiliar } from "./familiar";
import { ifHave, sober } from "./lib";
import Macro from "./macro";

function capsuleOutfit(): OutfitSpec {
  const familiar = chooseFamiliar({ location: $location`The Cave Before Time` });
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
    familiar,
    modifier: $familiars`Reagnimated Gnome, Temporal Riftlet`.includes(familiar)
      ? "Familiar Weight"
      : "Item Drop",
  };
}

export const capsule: ChronerQuest = {
  name: "Capsule",
  location: $location`The Cave Before Time`,
  outfit: capsuleOutfit,
  tasks: [
    {
      name: "Chroner",
      completed: () => false,
      do: $location`The Cave Before Time`,
      outfit: () => {
        if (!sober()) {
          return {
            ...capsuleOutfit(),
            offhand: $item`Drunkula's wineglass`,
          };
        }
        if (have($item`Kramco Sausage-o-Matic™`) && getKramcoWandererChance() >= 1) {
          return {
            ...capsuleOutfit(),
            offhand: $item`Kramco Sausage-o-Matic™`,
          };
        }
        return capsuleOutfit();
      },
      combat: new ChronerStrategy(Macro.standardCombat()),
      sobriety: "either",
    },
  ],
};
