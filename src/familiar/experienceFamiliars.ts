import { Familiar } from "kolmafia";
import { $familiar, findLeprechaunMultiplier, get, have, propertyTypes } from "libram";
import { familiar } from "libram/dist/resources/2009/Bandersnatch";

import { GeneralFamiliar } from "./lib";

type ExperienceFamiliar = {
  familiar: Familiar;
  used: propertyTypes.BooleanProperty;
  useValue: number;
};

const experienceFamiliars: ExperienceFamiliar[] = [
  {
    familiar: $familiar`Pocket Professor`,
    used: "_thesisDelivered",
    useValue: 11 * get("valueOfAdventure"),
  },
  {
    familiar: $familiar`Grey Goose`,
    used: "_meatifyMatterUsed",
    useValue: 15 ** 4,
  },
];

function valueExperienceFamiliar({ familiar, useValue }: ExperienceFamiliar): GeneralFamiliar {
  const currentExp = familiar.experience || (have($familiar`Shorter-Order Cook`) ? 100 : 0);
  const experienceNeeded = 400 - currentExp;
  const estimatedExperience = 3;
  return {
    familiar,
    expectedValue: useValue / (experienceNeeded / estimatedExperience),
    leprechaunMultiplier: findLeprechaunMultiplier(familiar),
    limit: "experience",
  };
}

export default function getExperienceFamiliars(): GeneralFamiliar[] {
  return experienceFamiliars
    .filter(({ used, familiar }) => have(familiar) && !get(used) && familiar.experience < 400)
    .map(valueExperienceFamiliar);
}

export function getExperienceFamiliarLimit(fam: Familiar): number {
  const target = experienceFamiliars.find(({ familiar }) => familiar === fam);
  if (!have(fam) || !target) return 0;

  return (400 - familiar.experience) / 5;
}
