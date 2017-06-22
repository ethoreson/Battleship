# _Battleship_

#### _{Brief description of application}, {Date of current version}_

#### By _**Joe Kramer, Esvethlynna Pangelinan, Emilie Thoreson, Anna Timofeeva**_

## Description

_Battleship is a two-player game.  Each player places 5 ships on the board and takes turns guessing the location of their opponent's ship. The first player who sinks their opponent's ship wins the game._

## Setup/Installation Requirements

* _Launch the index.html in the browser._

## Specifications

|Behavior |Input|Output|
|---|---|---|
|During setup, each player can place their ship on the grid by selecting the starting row, column, and orientation (horizontal/vertical).|Carrier - 5: row = A, column = 1, horizontal|5 squares on row A, column 1, appear horizontally on the grid in green.|
|After a ship is placed successfully on the grid, their ship is removed from view.|Carrier - 5: row = A, column = 1, horizontal|The Carrier ship and its corresponding options are removed.|
|If the player chooses to place a ship that cannot fit in the selected space, an alert box appears informing them that there is not enough space.|Carrier - 5: row = A, column = 1, horizontal, Battleship-4: row = A, column = 1, horizontal|Alert message: "Not enough room."|
|Upon starting the game, Player 1 gets the first turn.|Each player sets up their ships, then click Play button.|Highlight is shown on Player 1's side.|
|If a Player clicks on a cell on the grid, the cell turns to red if it is a hit or blue if it is a miss.|Player clicks on a cell the grid.|The cell changes to red or blue.|
|If a Player clicks on a cell on the grid that was already selected, a message appears.|Player clicks on a blue or red cell.|Alert message: "Space is already selected."|
|After a player hits all the cells occupied by their opponent's ship, the status of their opponent's ship is updated from "Safe" to "Sunk".|Player 1: select all the cells corresponding to Player 2's Carrier ship.|Player 2's Carrier ship status:  "Sunk"|
|After a player sinks their opponent's ship, a message is shown and the game is over.|Player 1: select all the cells corresponding to all of Player 2's ships.|The grid is replaced with a message announcing that Player 1 has won.|
|After completing the game, you can play another game.|Play a game until there is a winner. Click the Play Again button.|The screen is updated to display the first screen, prompting the first player to set up their ships.|




## Known Bugs

_If a player clicks on a space that was already selected (i.e. hit or miss), they lose their turn because the game automatically switches to the other player._

## Support and contact details

_If you have any questions or suggestion, please contact Joe, Emilie, Anna, or Lynn.

## Technologies Used

_HTML, CSS, JQuery and JavaScript._

### License

*This software is licensed under the MIT license.*

Copyright (c) 2017 **_Joe Kramer, Esvethlynna Pangelinan, Emilie Thoreson, Anna Timofeeva_**
