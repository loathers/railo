import { canInteract, Familiar, inebrietyLimit, myInebriety } from "kolmafia";
import { $familiar, $familiars, $item, have } from "libram";

import { freeFightFamiliar } from "./freeFightFamiliar";
import { canOpenRedPresent, MenuOptions, pocketProfessorLectures, timeToMeatify } from "./lib";

export { canOpenRedPresent, timeToMeatify, pocketProfessorLectures, freeFightFamiliar };

export const chooseFamiliar = (options: MenuOptions = {}) =>
  canInteract() && myInebriety() <= inebrietyLimit()
    ? $familiars`Reagnimated Gnome, Temporal Riftlet`.find((f) => have(f)) ??
      freeFightFamiliar(options)
    : freeFightFamiliar();
export const chooseFamEquip = (fam: Familiar) =>
  fam === $familiar`Reagnimated Gnome`
    ? $item`gnomish housemaid's kgnee`
    : fam.elementalDamage || fam.physicalDamage
    ? $item`oversized fish scaler`
    : $item`tiny stillsuit`;
