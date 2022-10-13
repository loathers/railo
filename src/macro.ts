import { Item, myFamiliar, Skill } from "kolmafia";
import {
  $familiar,
  $item,
  $items,
  $monster,
  $skill,
  get,
  have,
  SongBoom,
  StrictMacro,
} from "libram";

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

  doItems(): this {
    const steps = new Macro();
    const items =
      $items`Rain-Doh blue balls, Time-Spinner, Rain-Doh indigo cup, HOA citation pad, porquoise-handled sixgun`.filter(
        (i) => have(i)
      );
    if (items.length) {
      if (!have($skill`Ambidextrous Funkslinging`)) {
        for (const item of items) steps.tryItem(item);
      } else {
        for (let i = 0; i <= items.length; i += 2) {
          const chunk = items.slice(i, i + 1);
          if (chunk.length === 2) steps.tryItem(chunk as [Item, Item]);
          else steps.tryItem(...chunk);
        }
      }
    } else {
      steps.tryHaveItem($item`seal tooth`);
    }
    return this.step(steps);
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
      .tryHaveSkill($skill`Summon Mayfly Swarm`)
      .externalIf(
        SongBoom.song() === "Total Eclipse of Your Meat",
        Macro.tryHaveSkill($skill`Sing Along`)
      )
      .tryHaveSkill($skill`Extract`)
      .tryHaveSkill($skill`Micrometeorite`)
      .doItems()
      .attack()
      .repeat();
  }

  static standardCombat(): Macro {
    return new Macro().standardCombat();
  }
}
