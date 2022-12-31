import { canAdventure, Location, Monster, retrieveItem, runChoice, toUrl, visitUrl } from "kolmafia";
import { $item, $location, CrystalBall, have } from "libram";
import { printd, printh } from "./lib";

let currentPonder = CrystalBall.ponder();
let ponderIsValid = true;


function updatePonder(): void {
    currentPonder = CrystalBall.ponder();
    ponderIsValid = true;
}
export function ponder(): Map<Location, Monster> {
    if (!ponderIsValid) updatePonder();
    return currentPonder;
}

export function invalidate(): void {
    ponderIsValid = false;
}

export function toasterGaze(): void {
    const shore = $location`The Shore, Inc. Travel Agency`;
    const pass = $item`Desert Bus pass`;
    if (!canAdventure(shore) && !have(pass)) {
      retrieveItem(pass);
    }
    try {
      const store = visitUrl(toUrl(shore));
      if (!store.includes("Check out the gift shop")) {
        printh("Unable to stare longingly at toast");
      }
      runChoice(4);
    } catch (e) {
      printd(`We ran into an issue when gazing at toast: ${e}.`);
    } finally {
      visitUrl("main.php");
    }
  }
