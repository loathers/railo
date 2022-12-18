<img src="https://user-images.githubusercontent.com/1320480/208032167-6df358c2-c08b-4017-8b5c-2b412fdeb843.png" alt="railo logo" style="width: 25%;">

**Glupp Shitto's amtrac nasdaq festivus scripto** (also known as "railo") is a script meant to help [Kingdom of Loathing](https://www.kingdomofloathing.com/) players efficiently collect Elf Stuff from the Train Crimbo in KOL.

To install, run the following command on an up-to-date [KolMafia](https://github.com/kolmafia/kolmafia) version:

```
git checkout loathers/railo release
```

To update, run `git update` or check the "Update installed Git projects on login" box within Mafia preferences.

## Running Railo

To run railo, run the following command in the mafia GCLI:

`railo`

You can specify the number of turns to run (use negative numbers for the number of turns remaining) with the turns argument. The following example will use 10 turns.

`railo turns=10`

You can specify which car to adventure in, default is caboose.

`railo car=caboose`
`railo car=passenger`

You can specify a priority which affects choice adventures and equipment.

`railo priority=elves`
`railo priority=parts`
`railo priority=pingpong`
