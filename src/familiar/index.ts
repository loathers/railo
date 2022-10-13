import { canInteract, Familiar, inebrietyLimit, myInebriety } from "kolmafia";
import { $familiar, $familiars, $item, have } from "libram";

import { freeFightFamiliar } from "./freeFightFamiliar";
import { canOpenRedPresent, MenuOptions, pocketProfessorLectures, timeToMeatify } from "./lib";

export {
  canOpenRedPresent,
  timeToMeatify,
  pocketProfessorLectures,
  freeFightFamiliar,
  MenuOptions,
};

export const chooseFamiliar = (options: MenuOptions = {}) =>
  canInteract() && myInebriety() <= inebrietyLimit()
    ? $familiars`Reagnimated Gnome, Temporal Riftlet`.find((f) => have(f)) ??
      freeFightFamiliar(options)
    : freeFightFamiliar();
export const chooseFamEquip = (fam: Familiar) =>
  fam === $familiar`Reagnimated Gnome` ? $item`gnomish housemaid's kgnee` : $item`tiny stillsuit`;
