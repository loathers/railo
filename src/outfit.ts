import { OutfitSlot, OutfitSpec } from "grimoire-kolmafia";
import {
  canEquip,
  canInteract,
  Familiar,
  Item,
  itemAmount,
  Location,
  toItem,
  toSlot,
  totalTurnsPlayed,
} from "kolmafia";
import {
  $familiar,
  $familiars,
  $item,
  $locations,
  get,
  getRemainingStomach,
  have,
  sumNumbers,
} from "libram";

import { freeFightFamiliar, MenuOptions } from "./familiar";
import { garboValue } from "./garboValue";
import { args, realmAvailable, sober } from "./lib";

export function ifHave(slot: OutfitSlot, item: Item, condition?: () => boolean): OutfitSpec {
  return have(item) && canEquip(item) && (condition?.() ?? true)
    ? Object.fromEntries([[slot, item]])
    : {};
}

function mergeSpecs(...outfits: OutfitSpec[]): OutfitSpec {
  return outfits.reduce((current, next) => ({ ...next, ...current }), {});
}

const chooseFamiliar = (options: MenuOptions = {}): Familiar =>
  canInteract() && sober()
    ? $familiars`Reagnimated Gnome, Temporal Riftlet`.find((f) => have(f)) ??
      freeFightFamiliar(options)
    : freeFightFamiliar(options);

type TaskOptions = { location: Location; isFree?: boolean };
export function chooseQuestOutfit(
  { location, isFree }: TaskOptions,
  ...outfits: OutfitSpec[]
): OutfitSpec {
  const familiar = chooseFamiliar({ location });
  const famEquip =
    equipmentFamiliars.get(familiar) ??
    // eslint-disable-next-line libram/verify-constants
    $locations`Crimbo Train (caboose), Crimbo Train (dining car)`.includes(location)
      ? // eslint-disable-next-line libram/verify-constants
        $item`white arm towel`
      : $item`amulet coin`;

  const weapons = mergeSpecs(
    ifHave("weapon", $item`June cleaver`),
    ifHave("weapon", $item`Fourth of May Cosplay Saber`)
  );
  const offhands = mergeSpecs(
    ifHave(
      "offhand",
      $item`cursed magnifying glass`,
      () => get("_voidFreeFights") < 5 && get("cursedMagnifyingGlassCount") < 13
    ),
    ifHave(
      "offhand",
      toItem("Abuela Crimbo's special magnet"),
      () => toItem("Abuela Crimbo's special magnet") !== $item.none
    )
  );

  const useHarness = harnessIsEffective(location);

  const backs = mergeSpecs(
    ifHave(
      "back",
      $item`protonic accelerator pack`,
      () =>
        get("questPAGhost") === "unstarted" &&
        get("nextParanormalActivity") <= totalTurnsPlayed() &&
        sober()
    ),
    ifHave("back", $item`Trainbot harness`, () => useHarness),
    ifHave("back", $item`Buddy Bjorn`, () => !useHarness)
  );

  const spec = mergeSpecs(
    ifHave("hat", $item`Crown of Thrones`, () => useHarness),
    weapons,
    offhands,
    backs,
    { familiar },
    ifHave("famequip", famEquip),
    ifHave(
      "pants",
      $item`designer sweatpants`,
      () => 25 * get("_sweatOutSomeBoozeUsed") + get("sweat") < 75
    ),
    ifHave(
      "pants",
      $item`Pantsgiving`,
      () =>
        get("_pantsgivingCount") < 50 ||
        (get("_pantsgivingFullness") < 2 && getRemainingStomach() === 0)
    ),
    { modifier: "Familiar Weight" }
  );

  const bestAccessories = getBestAccessories(isFree);
  for (let i = 0; i < 3; i++) {
    const accessory = bestAccessories[i];
    if (!accessory) break;
    spec[`acc${i + 1}` as OutfitSlot] = accessory;
  }
  const mergedSpec = mergeSpecs(...outfits, spec);

  const [goodFammy, lessGoodFammy] = useHarness
    ? [$item`Crown of Thrones`, $item`Buddy Bjorn`]
    : [$item`Buddy Bjorn`, $item`Crown of Thrones`];
  const lessGoodSlot = toSlot(lessGoodFammy).toString() as OutfitSlot;
  if (!have(goodFammy) && have(lessGoodFammy) && !(lessGoodSlot in mergedSpec)) {
    mergedSpec[lessGoodSlot] = lessGoodFammy;
  } else {
    mergedSpec.avoid = [...(mergedSpec.avoid ?? []), lessGoodFammy];
  }

  return mergedSpec;
}

function harnessIsEffective(location: Location) {
  return $locations`Crimbo Train (Passenger Car)`.includes(location) && args.priority === "elves";
}

const equipmentFamiliars = new Map<Familiar, Item>([
  [$familiar`Reagnimated Gnome`, $item`gnomish housemaid's kgnee`],
  [$familiar`Shorter-Order Cook`, $item`blue plate`],
  [$familiar`Stocking Mimic`, $item`bag of many confections`],
]);

function luckyGoldRing() {
  // Volcoino has a low drop rate which isn't accounted for here
  // Overestimating until it drops is probably fine, don't @ me
  const dropValues = [
    100, // 80 - 120 meat
    ...[
      itemAmount($item`hobo nickel`) > 0 ? 100 : 0, // This should be closeted
      itemAmount($item`sand dollar`) > 0 ? garboValue($item`sand dollar`) : 0, // This should be closeted
      itemAmount($item`Freddy Kruegerand`) > 0 ? garboValue($item`Freddy Kruegerand`) : 0,
      realmAvailable("sleaze") ? garboValue($item`Beach Buck`) : 0,
      realmAvailable("spooky") ? garboValue($item`Coinspiracy`) : 0,
      realmAvailable("stench") ? garboValue($item`FunFunds™`) : 0,
      realmAvailable("hot") && !get("_luckyGoldRingVolcoino") ? garboValue($item`Volcoino`) : 0,
      realmAvailable("cold") ? garboValue($item`Wal-Mart gift certificate`) : 0,
      realmAvailable("fantasy") ? garboValue($item`Rubee™`) : 0,
    ].filter((value) => value > 0),
  ];

  // Items drop every ~10 turns
  return sumNumbers(dropValues) / dropValues.length / 10;
}

const accessories = new Map<Item, (isFree?: boolean) => number>([
  [
    $item`mafia thumb ring`,
    (isFree?: boolean) => (!isFree ? (1 / 0.96 - 1) * get("valueOfAdventure") : 0),
  ],
  [$item`lucky gold ring`, luckyGoldRing],
  [$item`Mr. Screege's spectacles`, () => 180],
  [$item`Mr. Cheeng's spectacles`, () => 220],
  [
    $item`Trainbot luggage hook`,
    () => (args.car === "passenger" ? (1 / 3) * garboValue($item`lost elf luggage`) : 0),
  ],
  [
    $item`Trainbot radar monocle`,
    () => (args.car === "caboose" ? garboValue($item`pile of Trainbot parts`) : 0),
  ],
]);

function getBestAccessories(isFree?: boolean) {
  return Array.from(accessories.entries())
    .filter(([item]) => have(item) && canEquip(item))
    .map(([item, valueFunction]) => [item, valueFunction(isFree)] as [Item, number])
    .sort(([, a], [, b]) => b - a)
    .map(([item]) => item)
    .splice(0, 3);
}
