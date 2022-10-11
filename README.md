<img src="https://user-images.githubusercontent.com/8014761/195185013-bbf800ee-e1ee-4ceb-8428-38e0f394769b.png" alt="chrono logo" style="width: 50%;">

**Chrono Collector** (also known as "chrono" is a script meant to help [Kingdom of Loathing](https://www.kingdomofloathing.com/) players efficiently farm Chroners within the Time Twitching Tower. 

To install, run the following command on an up-to-date [KolMafia](https://github.com/kolmafia/kolmafia) version:

> `git checkout loathers/chrono-collector release`

To update, run `git update` or check the "Update installed Git projects on login" box within Mafia preferences.

## Running Chrono

To run chrono, run the following command in the mafia GCLI:

> `chrono`

You can specify the number of turns to run (use negative numbers for the number of turns remaining) with the turns argument. The following example will use 10 turns.

> `chrono turns=10`
