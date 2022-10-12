import { haveEquipped, Item, myFamiliar, Skill } from "kolmafia";
import { $familiar, $item, $monster, $skill, get, have, StrictMacro } from "libram";

import { canOpenRedPresent, timeToMeatify } from "./familiar";
import { shouldRedigitize } from "./lib";

export default class Macro extends StrictMacro {
  tryHaveSkill(skill: Skill): this {
    return this.externalIf(have(skill), Macro.trySkill(skill));
  }

  static tryHaveSkill(skill: Skill): Macro {
    return new Macro().tryHaveSkill(skill);
  }

  tryHaveItem(item: Item): this {
    return this.externalIf(have(item), Macro.tryItem(item));
  }

  static tryHaveItem(item: Item): Macro {
    return new Macro().tryHaveItem(item);
  }

  redigitize(): this {
    return this.externalIf(
      shouldRedigitize(),
      Macro.if_(
        get("_sourceTerminalDigitizeMonster") ?? $monster.none,
        Macro.skill($skill`Digitize`)
      )
    );
  }

  static redigitize(): Macro {
    return new Macro().redigitize();
  }

  standardCombat(): this {
    return this.externalIf(
      canOpenRedPresent() && myFamiliar() === $familiar`Crimbo Shrub`,
      Macro.trySkill($skill`Open a Big Red Present`)
    )
      .externalIf(
        timeToMeatify() && myFamiliar() === $familiar`Grey Goose`,
        Macro.trySkill($skill`Meatify Matter`)
      )
      .externalIf(
        get("cosmicBowlingBallReturnCombats") < 1,
        Macro.trySkill($skill`Bowl Straight Up`)
      )
      .externalIf(
        haveEquipped($item`packet of mayfly bait`),
        Macro.trySkill($skill`Summon Mayfly Swarm`)
      )
      .tryHaveSkill($skill`Sing Along`)
      .tryHaveSkill($skill`Extract`)
      .tryHaveSkill($skill`Micrometeorite`)
      .tryHaveItem($item`Time-Spinner`)
      .tryHaveItem($item`Rain-Doh indigo cup`)
      .tryHaveItem($item`Rain-Doh blue balls`)
      .tryHaveItem($item`porquoise-handled sixgun`)
      .attack()
      .repeat();
  }

  static standardCombat(): Macro {
    return new Macro().standardCombat();
  }
}
