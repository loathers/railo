import { Quest } from "grimoire-kolmafia";
import {
  getWorkshed,
  Item,
  itemAmount,
  myHp,
  myMaxhp,
  putCloset,
  runChoice,
  totalTurnsPlayed,
  useSkill,
  visitUrl,
} from "kolmafia";
import {
  $effect,
  $effects,
  $familiar,
  $item,
  $locations,
  $phylum,
  $skill,
  AutumnAton,
  get,
  have,
  Snapper,
  SongBoom,
  uneffect,
} from "libram";

import { ChronerTask } from "./engine";
import { args, CMCEnvironment, countEnvironment, tryGetCMCItem } from "./lib";

const poisons = $effects`Hardly Poisoned at All, A Little Bit Poisoned, Somewhat Poisoned, Really Quite Poisoned, Majorly Poisoned`;
function cmcTarget(): { item: Item; environment: CMCEnvironment } {
  if (args.mode === "rose") {
    return {
      item: $item`Extrovermectin™`,
      environment: "i",
    };
  } else {
    return {
      item: $item`Breathitin™`,
      environment: "u",
    };
  }
}

export const setup: Quest<ChronerTask> = {
  name: "Setup",
  tasks: [
    {
      name: "Beaten Up",
      completed: () => !have($effect`Beaten Up`),
      do: () => {
        if (["Poetic Justice", "Lost and Found"].includes(get("lastEncounter"))) {
          uneffect($effect`Beaten Up`);
        }
        if (have($effect`Beaten Up`)) {
          throw "Got beaten up for no discernable reason!";
        }
      },
      sobriety: "either",
    },
    {
      name: "Disco Nap",
      ready: () => have($skill`Disco Nap`) && have($skill`Adventurer of Leisure`),
      completed: () => poisons.every((e) => !have(e)),
      do: () => useSkill($skill`Disco Nap`),
      sobriety: "either",
    },
    {
      name: "Antidote",
      completed: () => poisons.every((e) => !have(e)),
      do: () => poisons.forEach((e) => uneffect(e)),
      sobriety: "either",
    },
    {
      name: "Recover",
      ready: () => have($skill`Cannelloni Cocoon`),
      completed: () => myHp() / myMaxhp() >= 0.5,
      do: () => {
        useSkill($skill`Cannelloni Cocoon`);
      },
      sobriety: "either",
    },
    {
      name: "Recover Failed",
      completed: () => myHp() / myMaxhp() >= 0.5,
      do: () => {
        throw "Unable to heal above 50% HP, heal yourself!";
      },
      sobriety: "either",
    },
    {
      name: "Kgnee",
      completed: () =>
        !have($familiar`Reagnimated Gnome`) || have($item`gnomish housemaid's kgnee`),
      do: (): void => {
        visitUrl("arena.php");
        runChoice(4);
      },
      outfit: { familiar: $familiar`Reagnimated Gnome` },
      sobriety: "sober",
    },
    {
      name: "Closet Sand Dollars",
      completed: () => itemAmount($item`sand dollar`) === 0,
      do: () => putCloset(itemAmount($item`sand dollar`), $item`sand dollar`),
      sobriety: "either",
    },
    {
      name: "Closet Hobo Nickels",
      completed: () =>
        itemAmount($item`hobo nickel`) === 0 ||
        (!have($familiar`Hobo Monkey`) && !have($item`hobo nickel`, 1000)),
      do: () => putCloset(itemAmount($item`hobo nickel`), $item`hobo nickel`),
      sobriety: "either",
    },
    {
      name: "Snapper",
      completed: () => Snapper.getTrackedPhylum() === $phylum`dude`,
      do: () => Snapper.trackPhylum($phylum`dude`),
      ready: () => Snapper.have(),
      sobriety: "either",
    },
    {
      name: "Autumn-Aton",
      completed: () => AutumnAton.currentlyIn() !== null,
      do: () =>
        AutumnAton.sendTo(
          $locations`Moonshiners' Woods, The Cave Before Time, The Sleazy Back Alley`
        ),
      ready: () => AutumnAton.available(),
      sobriety: "either",
    },
    {
      name: "Cold Medicine Cabinent",
      completed: () =>
        getWorkshed() !== $item`cold medicine cabinet` ||
        totalTurnsPlayed() < get("_nextColdMedicineConsult") ||
        get("_coldMedicineConsults") >= 5 ||
        countEnvironment(cmcTarget().environment) <= 10,
      do: () => tryGetCMCItem(cmcTarget().item),
      sobriety: "either",
    },
    {
      name: "Boombox",
      completed: () =>
        !SongBoom.have() ||
        SongBoom.song() === "Food Vibrations" ||
        SongBoom.songChangesLeft() === 0,
      do: () => SongBoom.setSong("Food Vibrations"),
      sobriety: "either",
    },
  ],
};
