import { Quest } from "grimoire-kolmafia";
import { ChronerTask } from "./engine";
import { $effect, $effects, $familiar, $item, $locations, $phylum, $skill, AutumnAton, get, have, Snapper, uneffect } from "libram"
import { myHp, myMaxhp, runChoice, useSkill, visitUrl } from "kolmafia"

const poisons = $effects`Hardly Poisoned at All, A Little Bit Poisoned, Somewhat Poisoned, Really Quite Poisoned, Majorly Poisoned`;

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
            name: "Antidote",
            completed: () => poisons.every((e) => !have(e)),
            do: () => poisons.forEach((e) => uneffect(e)),
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
            name: "Snapper",
            completed: () => Snapper.getTrackedPhylum() === $phylum`dude`,
            do: () => Snapper.trackPhylum($phylum`dude`),
            ready: () => Snapper.have(),
            sobriety: "either",
          },
          {
            name: "Autumn-Aton",
            completed: () => AutumnAton.currentlyIn() !== null,
            do: () => AutumnAton.sendTo($locations`Moonshiners' Woods, The Cave Before Time, The Sleazy Back Alley`),
            ready: () => AutumnAton.available(),
            sobriety: "either",
          },
    ]
}
