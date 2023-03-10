import { Args } from "grimoire-kolmafia";
import {
  descToItem,
  haveEquipped,
  inebrietyLimit,
  isDarkMode,
  Item,
  Location,
  Monster,
  myAdventures,
  myFamiliar,
  myInebriety,
  print,
  runChoice,
  visitUrl,
} from "kolmafia";
import {
  $familiar,
  $item,
  $location,
  $monster,
  Counter,
  CrystalBall,
  get,
  have,
  SourceTerminal,
} from "libram";

import * as OrbManager from "./orbmanager";

/**
 * Find the best element of an array, where "best" is defined by some given criteria.
 * @param array The array to traverse and find the best element of.
 * @param optimizer Either a key on the objects we're looking at that corresponds to numerical values, or a function for mapping these objects to numbers. Essentially, some way of assigning value to the elements of the array.
 * @param reverse Make this true to find the worst element of the array, and false to find the best. Defaults to false.
 */
export function maxBy<T>(
  array: T[] | readonly T[],
  optimizer: (element: T) => number,
  reverse?: boolean
): T;
export function maxBy<S extends string | number | symbol, T extends { [x in S]: number }>(
  array: T[] | readonly T[],
  key: S,
  reverse?: boolean
): T;
export function maxBy<S extends string | number | symbol, T extends { [x in S]: number }>(
  array: T[] | readonly T[],
  optimizer: ((element: T) => number) | S,
  reverse = false
): T {
  if (typeof optimizer === "function") {
    return maxBy(
      array.map((key) => ({ key, value: optimizer(key) })),
      "value",
      reverse
    ).key;
  } else {
    return array.reduce((a, b) => (a[optimizer] > b[optimizer] !== reverse ? a : b));
  }
}

export function shouldRedigitize(): boolean {
  const digitizesLeft = SourceTerminal.getDigitizeUsesRemaining();
  const monsterCount = SourceTerminal.getDigitizeMonsterCount() + 1;
  // triangular number * 10 - 3
  const digitizeAdventuresUsed = monsterCount * (monsterCount + 1) * 5 - 3;
  // Redigitize if fewer adventures than this digitize usage.
  return (
    SourceTerminal.have() &&
    SourceTerminal.canDigitize() &&
    myAdventures() / 0.96 < digitizesLeft * digitizeAdventuresUsed
  );
}

const HIGHLIGHT = isDarkMode() ? "yellow" : "blue";
export function printh(message: string) {
  print(message, HIGHLIGHT);
}

export function printd(message: string) {
  if (args.debug) {
    print(message, HIGHLIGHT);
  }
}

export function sober() {
  return myInebriety() <= inebrietyLimit() + (myFamiliar() === $familiar`Stooper` ? -1 : 0);
}

const trainbots = {
  caboose: {
    brake: $monster`Brake-Operating Trainbot`,
    pingpong: $monster`Ping-Pong-Playing Trainbot`,
    track: $monster`Track-Switching Trainbot`,
  },
  passenger: {
    drink: $monster`Drink-Delivery Trainbot`,
    luggage: $monster`Luggage-Handling Trainbot`,
    ticket: $monster`Ticket-Checking Trainbot`,
  },
  dining: {
    bussy: $monster`Table-Bussing Trainbot`,
    waiter: $monster`Table-Waiting Trainbot`,
    wine: $monster`Wine-Pairing Trainbot`,
  },
  coal: {
    coal: $monster`Coal-Shoveling Trainbot`,
    slag: $monster`Slag-Processing Trainbot`,
    steam: $monster`Steam-Routing Trainbot`,
  },
} as const;

export const args = Args.create("railo", "A script for farming elf stuff", {
  turns: Args.number({
    help: "The number of turns to run (use negative numbers for the number of turns remaining)",
    default: Infinity,
  }),
  car: Args.string({
    options: [
      ["caboose", "Kill robots in the Caboose"],
      ["passenger", "Kill robots in the Passenger Car"],
      ["dining", "Kill robots in the Dining Car"],
      ["coal", "Kill robots in the Coal Car"],
    ],
    default: "caboose",
  }),
  debug: Args.flag({
    help: "Turn on debug printing",
    default: false,
  }),
  priority: Args.string({
    options: [
      ["elves", "rescue elves"],
      ["parts", "gather train parts"],
      ["pingpong", "pingpong"],
    ],
    default: "parts",
  }),
  tableware: Args.string({
    options: [
      ["food", "make platters"],
      ["drink", "make goblets"],
      ["both", "ensure an even number of foods and drinks"],
    ],
    default: "both",
  }),
  orb: Args.string({
    options: [
      ...[...Object.values(trainbots)]
        .map((o) => Object.keys(o))
        .flat()
        .map((key) => [key, `Target the ${key} trainbot with the orb.`] as [string, string]),
      ["none", "Don't use it!"],
    ],
    default: "none",
  }),
});

let orbTarget: Monster | null = null;
export function validateAndSetOrbTarget(target: string, car: string) {
  if (target === "none") return;
  if (!have($item`miniature crystal ball`)) return;
  if (!(car in trainbots)) throw new Error("Invalid car specified!");
  const carTargets = trainbots[car as keyof typeof trainbots];
  if (!(target in carTargets)) throw new Error("Invalid target specified");
  orbTarget = carTargets[target as keyof typeof carTargets];
}
export function getOrbTarget(): Monster | null {
  return orbTarget;
}

function getCMCChoices(): { [choice: string]: number } {
  const options = visitUrl("campground.php?action=workshed");
  let i = 0;
  let match;
  const entries: [string, number][] = [];

  const regexp = /descitem\((\d+)\)/g;
  while ((match = regexp.exec(options)) !== null) {
    entries.push([`${descToItem(match[1])}`, ++i]);
  }
  return Object.fromEntries(entries);
}

export function tryGetCMCItem(item: Item): void {
  const choice = getCMCChoices()[`${item}`];
  if (choice) {
    runChoice(choice);
  }
}

export type CMCEnvironment = "u" | "i";
export function countEnvironment(environment: CMCEnvironment): number {
  return get("lastCombatEnvironments")
    .split("")
    .filter((e) => e === environment).length;
}

export type RealmType = "spooky" | "stench" | "hot" | "cold" | "sleaze" | "fantasy" | "pirate";
export function realmAvailable(identifier: RealmType): boolean {
  if (identifier === "fantasy") {
    return get(`_frToday`) || get(`frAlways`);
  } else if (identifier === "pirate") {
    return get(`_prToday`) || get(`prAlways`);
  }
  return get(`_${identifier}AirportToday`, false) || get(`${identifier}AirportAlways`, false);
}

export const unsupportedChoices = new Map<Location, { [choice: number]: number | string }>([
  [$location`The Spooky Forest`, { [502]: 2, [505]: 2 }],
  [$location`Guano Junction`, { [1427]: 1 }],
  [$location`The Hidden Apartment Building`, { [780]: 6, [1578]: 6 }],
  [$location`The Black Forest`, { [923]: 1, [924]: 1 }],
  [$location`LavaCo??? Lamp Factory`, { [1091]: 9 }],
  [$location`The Haunted Laboratory`, { [884]: 6 }],
  [$location`The Haunted Nursery`, { [885]: 6 }],
  [$location`The Haunted Storage Room`, { [886]: 6 }],
  [$location`The Hidden Park`, { [789]: 6 }],
  [$location`A Mob of Zeppelin Protesters`, { [1432]: 1, [857]: 2 }],
  [$location`A-Boo Peak`, { [1430]: 2 }],
  [$location`Sloppy Seconds Diner`, { [919]: 6 }],
  [$location`VYKEA`, { [1115]: 6 }],
  [
    $location`The Castle in the Clouds in the Sky (Basement)`,
    {
      [670]: 4,
      [671]: 4,
      [672]: 1,
    },
  ],
  [
    $location`The Haunted Bedroom`,
    {
      [876]: 1, // old leather wallet, 500 meat
      [877]: 1, // old coin purse, 500 meat
      [878]: 1, // 400-600 meat
      [879]: 2, // grouchy spirit
      [880]: 2, // a dumb 75 meat club
    },
  ],
  [$location`The Copperhead Club`, { [855]: 4 }],
  [$location`The Castle in the Clouds in the Sky (Top Floor)`, { [1431]: 1, [677]: 2 }],
  [$location`The Hidden Office Building`, { [786]: 6 }],
]);

function untangleDigitizes(turnCount: number, chunks: number): number {
  const turnsPerChunk = turnCount / chunks;
  const monstersPerChunk = Math.sqrt((turnsPerChunk + 3) / 5 + 1 / 4) - 1 / 2;
  return Math.round(chunks * monstersPerChunk);
}

/**
 *
 * @returns The number of digitized monsters that we expect to fight today
 */
export function digitizedMonstersRemaining(): number {
  if (!SourceTerminal.have()) return 0;

  const digitizesLeft = SourceTerminal.getDigitizeUsesRemaining();
  if (digitizesLeft === SourceTerminal.getMaximumDigitizeUses()) {
    return untangleDigitizes(myAdventures(), SourceTerminal.getMaximumDigitizeUses());
  }

  const monsterCount = SourceTerminal.getDigitizeMonsterCount() + 1;

  const turnsLeftAtNextMonster = myAdventures() - Counter.get("Digitize Monster");
  if (turnsLeftAtNextMonster <= 0) return 0;
  const turnsAtLastDigitize = turnsLeftAtNextMonster + ((monsterCount + 1) * monsterCount * 5 - 3);
  return (
    untangleDigitizes(turnsAtLastDigitize, digitizesLeft + 1) -
    SourceTerminal.getDigitizeMonsterCount()
  );
}

export function toasterGazeIfNecessary(): void {
  if (getOrbTarget() && haveEquipped(CrystalBall.orb)) OrbManager.toasterGaze();
}
