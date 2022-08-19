import { createBoard, getPlacementFromUI } from "./modules/addUI";

class Ship {
  sunken = false;

  constructor(length) {
    length;
  }

  hit(coords) {
    //marks which part of ship is hit
  }

  isSunk(hitAreas) {
    // Will check if ship is sunken
  }
}

let shipsSizes = [5, 4, 3, 3, 2];

async function placePlayerShips(shipSizes) {
  for (let size of shipSizes) {
    let pShip = new Ship(size);

    //Return an array of the positions of a ship
    let position = getPlacementFromUI(curr);
    human.ships.push(pShip);
    human.positions.push(position);
  }
}

function placeComputerShips() {}

class GameBoard {
  human = new Player();
  computer = new Player();

  placeShip() {
    //Stores information of where ships are
    // placePlayerShips(shipsSizes);
  }

  receiveAttack() {
    // determine if hit or miss and keep log of what has been hit
  }

  checkWinner() {
    //Checks winner and triggers function to change display
  }
}

class Player {
  ships = [];
  positions = [];
}

function getPlayersPositions() {}

// 5 4 3 3 2
createBoard();
let posit = getPlacementFromUI(5);
console.log(posit);
function playGame() {}

// Create Players
// Loop through playerPieces
// Place Piece and add it to players position
