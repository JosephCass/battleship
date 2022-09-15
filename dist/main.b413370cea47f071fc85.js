/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gamedata": () => (/* binding */ gamedata)
/* harmony export */ });
/* harmony import */ var _modules_addUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/addUI */ "./src/modules/addUI.js");
/* harmony import */ var _modules_gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/gameBoard */ "./src/modules/gameBoard.js");
/* harmony import */ var _modules_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/player */ "./src/modules/player.js");




// let posit = getPlacementFromUI(5);
// console.log(posit);

(0,_modules_addUI__WEBPACK_IMPORTED_MODULE_0__.createBoard)();

let gamedata = new _modules_gameBoard__WEBPACK_IMPORTED_MODULE_1__.GameBoard();
gamedata.placeShip();



// Create Players
// Loop through playerPieces
// Place Piece and add it to players position


/***/ }),

/***/ "./src/modules/addUI.js":
/*!******************************!*\
  !*** ./src/modules/addUI.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBoard": () => (/* binding */ createBoard),
/* harmony export */   "getPlacementFromUI": () => (/* binding */ getPlacementFromUI)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _generatePlayerBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generatePlayerBoard */ "./src/modules/generatePlayerBoard.js");
/* harmony import */ var _generateComputerBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generateComputerBoard */ "./src/modules/generateComputerBoard.js");




const tempContainer = document.querySelector(".temp-container");
const tempPlayerPlacement = document.querySelector(".temp-gameboard");
const rotateBtn = document.querySelector(".temp-btn");

let vertical = false;
let positions = [];
let shipSizes = [5, 4, 3, 3, 2];
let currentPiece;

// Changes position of ships to either be horizontal or vertical when choosing the positions
rotateBtn.addEventListener("click", function (e) {
  vertical = !vertical;
});

// Creates Temporary Board for player to place ship positions
function createBoard(container) {
  let z = 0;
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let square = document.createElement("div");
      square.classList.add(
        `temp-square`,
        `square-indx-${z}`,
        `square-row${x}`,
        `square-column${y}`
      );
      tempPlayerPlacement.appendChild(square);
      z++;
    }
  }
}

// Handles the horizontal hovering functionality when moving mouse into a certain area
function handleHorizontal(e, size) {
  let hoveredClass = e.target.classList[1];
  let classIndex = parseInt(hoveredClass.slice(12));
  let baseText = hoveredClass.slice(0, 12);
  let currentRow = e.target.classList[2];

  for (let x = 0; x < size; x++) {
    let currClass = document.querySelector(`.${baseText}${classIndex + x}`);
    if (currClass && currClass.classList[2] === currentRow) {
      currClass.style.backgroundColor = "aqua";
      currClass.classList.add("hovered");
    }
  }
}

// Handles the horizontal hovering functionality when moving mouse out of a certain area
function handleHorizontalOut(e, size) {
  let hovered = document.querySelectorAll(".hovered");

  hovered.forEach(function (curr) {
    curr.classList.remove("hovered");
    if (curr.classList.contains("checked")) {
      curr.style.backgroundColor = "yellow";
    } else {
      curr.style.backgroundColor = "white";
    }
  });
}

// Handles the vertical hovering functionality when moving mouse into a certain area
function handleVertical(e, size) {
  let hoveredClass = e.target.classList[1];
  let classIndex = parseInt(hoveredClass.slice(12));
  let baseText = hoveredClass.slice(0, 12);
  let currentColumn = e.target.classList[3];

  for (let x = 0; x < size; x++) {
    let currClass = document.querySelector(
      `.${baseText}${classIndex + x * 10}`
    );
    if (currClass && currClass.classList[3] === currentColumn) {
      currClass.style.backgroundColor = "aqua";
      currClass.classList.toggle("hovered");
    }
  }
}

// Handles the vertical hovering functionality when moving mouse out of a certain area
function handleVerticalOut(e, size) {
  let hovered = document.querySelectorAll(".hovered");

  hovered.forEach(function (curr) {
    curr.classList.remove("hovered");
    if (curr.classList.contains("checked")) {
      curr.style.backgroundColor = "yellow";
    } else {
      curr.style.backgroundColor = "white";
    }
  });
}

// Checks columns when placing a piece
function checkColumn(e, size) {
  let hoveredClass = e.target.classList[1];
  let classIndex = parseInt(hoveredClass.slice(12));
  let allHovered = document.querySelectorAll(`.hovered`);
  let currentColumn = e.target.classList[3];
  let baseText = hoveredClass.slice(0, 12);

  // Checks if the current hovered squares in the row are valid before adding it as a position
  for (let curr of allHovered) {
    if (
      curr.classList.contains("checked") ||
      curr.classList[3] !== currentColumn ||
      allHovered.length !== size
    ) {
      return;
    }
  }

  // Checks if the current hovered squares in the row are valid before adding it as a position
  for (let x = 0; x < size; x++) {
    let currClass = document.querySelector(
      `.${baseText}${classIndex + x * 10}`
    );
    if (!currClass) {
      return;
    }
  }

  let shipPos = [];
  allHovered.forEach(function (curr) {
    curr.style.backgroundColor = "yellow";
    curr.classList.add("checked");
    shipPos.push(curr.classList[1]);
  });
  currentPiece++;
  _player__WEBPACK_IMPORTED_MODULE_0__.human.positions.push(shipPos);
}

//Checks rows when placing a piece
function checkRow(e, size) {
  let hoveredClass = e.target.classList[1];
  let allHovered = document.querySelectorAll(`.hovered`);
  let currentRow = e.target.classList[2];
  let baseText = hoveredClass.slice(0, 12);
  let classIndex = parseInt(hoveredClass.slice(12));

  // Checks if the current hovered squares in the row are valid before adding it as a position
  for (let curr of allHovered) {
    if (
      curr.classList.contains("checked") ||
      curr.classList[2] !== currentRow ||
      allHovered.length !== size
    ) {
      return;
    }
  }
  // Checks if the current hovered squares in the row are valid before adding it as a position
  for (let x = 0; x < size; x++) {
    let currClass = document.querySelector(`.${baseText}${classIndex + x}`);
    if (!currClass) {
      return;
    }
  }

  //Highlights the selected Positions pink and pushes those positions to an array
  let shipPos = [];
  allHovered.forEach(function (curr) {
    curr.style.backgroundColor = "yellow";
    curr.classList.add("checked");
    shipPos.push(curr.classList[1]);
  });
  currentPiece++;
  _player__WEBPACK_IMPORTED_MODULE_0__.human.positions.push(shipPos);
}

// Adds a ship position to the board
function addNewPosition(e, size) {
  if (vertical) {
    checkColumn(e, size);
  } else {
    checkRow(e, size);
  }
}

// Function that handles player choosing positions for game (hovering blue squares & selected pink squares)
function getPlacementFromUI() {
  currentPiece = 0;

  tempPlayerPlacement.addEventListener("mouseover", function (event) {
    if (vertical) {
      handleVertical(event, shipSizes[currentPiece]);
    } else {
      handleHorizontal(event, shipSizes[currentPiece]);
    }
  });

  tempPlayerPlacement.addEventListener("mouseout", function (event) {
    if (vertical) {
      handleVerticalOut(event, shipSizes[currentPiece]);
    } else {
      handleHorizontalOut(event, shipSizes[currentPiece]);
    }
  });

  tempPlayerPlacement.addEventListener("mouseup", function (event) {
    addNewPosition(event, shipSizes[currentPiece]);
    if (currentPiece === 5) {
      tempContainer.classList.add("hidden");
      (0,_generatePlayerBoard__WEBPACK_IMPORTED_MODULE_1__.createPlayerBoard)();
      (0,_generateComputerBoard__WEBPACK_IMPORTED_MODULE_2__.createComputerBoard)();
      (0,_generateComputerBoard__WEBPACK_IMPORTED_MODULE_2__.generateComputerPositions)();
      (0,_generateComputerBoard__WEBPACK_IMPORTED_MODULE_2__.addComputerBoardFunctionality)();
      //remove display
      //render gameboard
    }
  });
}



// Reorganize Code to be more dry
// Figure out how to return the checked positions and loop to the next ship in the creation
// Create a reset button if player messes up


/***/ }),

/***/ "./src/modules/gameBoard.js":
/*!**********************************!*\
  !*** ./src/modules/gameBoard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameBoard": () => (/* binding */ GameBoard)
/* harmony export */ });
/* harmony import */ var _addUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addUI */ "./src/modules/addUI.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* harmony import */ var _generateComputerBoard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./generateComputerBoard */ "./src/modules/generateComputerBoard.js");





let shipLengths = [5, 4, 3, 3, 2];

function placePlayerShipPositions() {
  (0,_addUI__WEBPACK_IMPORTED_MODULE_0__.getPlacementFromUI)();
}

function creatAndPushShips() {
  for (let length of shipLengths) {
    let humanShip = new _ship__WEBPACK_IMPORTED_MODULE_2__.Ship(length);
    let computerShip = new _ship__WEBPACK_IMPORTED_MODULE_2__.Ship(length);
    _player__WEBPACK_IMPORTED_MODULE_1__.human.ships.push(humanShip);
    _player__WEBPACK_IMPORTED_MODULE_1__.computer.ships.push(computerShip);
  }
}

class GameBoard {
  placeShip() {
    //Stores information of where ships are
    creatAndPushShips();
    placePlayerShipPositions();
  }

  receiveAttack(e) {
    let clickedClassList = e.target.classList;
    if (clickedClassList.contains("computer-spot")) {
      if (clickedClassList.contains("hit")) {
        return;
      } else {
        let hitAudio = new Audio("../assets/hitSound.mp3");
        hitAudio.play();
        clickedClassList.add("hit");
        e.target.style.backgroundColor = "red";
        //gets the index of which ship was hit
        let shipThatWasHit = e.target.classList[5].slice(14);

        // Adds the index of the part of the ship that was hit
        let coords = e.target.classList[1].slice(15);
        let ship = _player__WEBPACK_IMPORTED_MODULE_1__.computer.ships[shipThatWasHit];
        ship.hitShip(coords);

        //check if ship has been sunken
        console.log(ship);
        if (ship.isSunk()) {
          console.log("here human");
          let computerShipPositions = document.querySelectorAll(
            `.${e.target.classList[5]}`
          );
          console.log(computerShipPositions);
          computerShipPositions.forEach(function (curr) {
            curr.style.backgroundColor = "purple";
          });
        }
        //checks if the player won
        this.#checkWinner(_player__WEBPACK_IMPORTED_MODULE_1__.computer);

        (0,_generateComputerBoard__WEBPACK_IMPORTED_MODULE_3__.generateComputerAttack)();

        //checks if the computer won
        this.#checkWinner(_player__WEBPACK_IMPORTED_MODULE_1__.human);
      }
    } else {
      if (clickedClassList.contains("missed")) {
        return;
      }
      let hitAudio = new Audio("../assets/missSound.mp3");
      hitAudio.play();
      clickedClassList.add("missed");
      e.target.style.backgroundColor = "grey";

      if ((0,_generateComputerBoard__WEBPACK_IMPORTED_MODULE_3__.generateComputerAttack)()) {
        //displayShipSunk
      }
      //run computers move
      //check if computer won
    }
  }

  #checkWinner(player) {
    let winner = true;
    player.ships.forEach(function (curr) {
      if (!curr.sunken) {
        winner = false;
      }
    });
    let gameDisplay = document.querySelector(".main-display");
    let winnerDisplay = document.querySelector(".winner-display");
    let winnerDisplayText = document.querySelector(".winner-display-text");
    let headerInfo = document.querySelector(".game-header");
    if (winner === true) {
      gameDisplay.classList.add("hidden");
      winnerDisplay.classList.remove("hidden");
      headerInfo.classList.add("hidden");
      if (player === _player__WEBPACK_IMPORTED_MODULE_1__.computer) {
        winnerDisplayText.textContent = `You Won The Game Human!!!👤`;
      } else if (player === _player__WEBPACK_IMPORTED_MODULE_1__.human) {
        winnerDisplayText.textContent = `You Lost The Game Computer Wins!!!🤖`;
      }
    }
  }
}




/***/ }),

/***/ "./src/modules/generateComputerBoard.js":
/*!**********************************************!*\
  !*** ./src/modules/generateComputerBoard.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addComputerBoardFunctionality": () => (/* binding */ addComputerBoardFunctionality),
/* harmony export */   "createComputerBoard": () => (/* binding */ createComputerBoard),
/* harmony export */   "generateComputerAttack": () => (/* binding */ generateComputerAttack),
/* harmony export */   "generateComputerPositions": () => (/* binding */ generateComputerPositions)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app */ "./src/app.js");



let gameContainer = document.querySelector(".main-display");

let shipSizes = [5, 4, 3, 3, 2];

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkIfRowInvalid(size, row, column) {
  let invalid = false;
  for (let x = 0; x < size; x++) {
    let index = row * 10 + column + x;
    let indexAsClass = document.querySelector(`.computer-index-${index}`);
    if (indexAsClass.classList.contains("computer-spot")) {
      invalid = true;
    }
  }
  return invalid;
}

function checkIfColumnValid(size, row, column) {
  let invalid = false;
  for (let x = 0; x < size; x++) {
    let index = row * 10 + column + x * 10;
    let indexAsClass = document.querySelector(`.computer-index-${index}`);
    if (indexAsClass.classList.contains("computer-spot")) {
      invalid = true;
    }
  }
  return invalid;
}

function generateComputerPositions() {
  for (let [indx, size] of shipSizes.entries()) {
    let loopAgain = true;

    //Look for a random place to put a ship until you find one
    do {
      let direction = randomIntFromInterval(1, 2);
      if (direction === 1) {
        let row = randomIntFromInterval(0, 9);
        let column = randomIntFromInterval(0, 5);
        let ship = [];

        if (checkIfRowInvalid(size, row, column)) {
          loopAgain = true;
        } else {
          loopAgain = false;
          for (let x = 0; x < size; x++) {
            let index = row * 10 + column + x;
            let indexAsClass = document.querySelector(
              `.computer-index-${index}`
            );
            // indexAsClass.style.backgroundColor = "yellow";
            indexAsClass.classList.add(
              `computer-spot`,
              `computer-ship-${indx}`
            );
            ship.push(index);
            if (x === size - 1) {
              _player__WEBPACK_IMPORTED_MODULE_0__.computer.positions.push(ship);
            }
          }
        }
      } else if (direction === 2) {
        let column = randomIntFromInterval(0, 9);
        let row = randomIntFromInterval(0, 5);
        let ship = [];

        if (checkIfColumnValid(size, row, column)) {
          loopAgain = true;
        } else {
          loopAgain = false;
          for (let x = 0; x < size; x++) {
            let index = row * 10 + column + x * 10;
            let indexAsClass = document.querySelector(
              `.computer-index-${index}`
            );
            // indexAsClass.style.backgroundColor = "yellow";
            indexAsClass.classList.add(
              `computer-spot`,
              `computer-ship-${indx}`
            );
            ship.push(index);
            if (x === size - 1) {
              _player__WEBPACK_IMPORTED_MODULE_0__.computer.positions.push(ship);
            }
          }
        }
      }
    } while (loopAgain);
  }
}

function createComputerBoard() {
  gameContainer.classList.remove("hidden");
  let computerGameContainer = document.createElement("div");
  computerGameContainer.classList.add("computer-game");
  gameContainer.append(computerGameContainer);
  let z = 0;
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let square = document.createElement("div");
      square.classList.add(
        `computer-square`,
        `computer-index-${z}`,
        `computer-row${x}`,
        `computer-column${y}`
      );
      computerGameContainer.appendChild(square);
      z++;
    }
  }
}

function addComputerBoardFunctionality() {
  let computerBoard = document.querySelector(".computer-game");
  computerBoard.addEventListener("click", function (e) {
    _app__WEBPACK_IMPORTED_MODULE_1__.gamedata.receiveAttack(e);
  });
}

function generateComputerAttack() {
  let keepTrying = true;
  let guess;
  let guessedElement;
  do {
    guess = randomIntFromInterval(0, 99);
    guessedElement = document.querySelector(`.player-index-${guess}`);
    if (
      !(
        guessedElement.classList.contains("hit") ||
        guessedElement.classList.contains("miss")
      )
    ) {
      keepTrying = false;
    }
  } while (keepTrying);

  let playerShip;

  if (guessedElement.classList.contains("player-spot")) {
    playerShip = guessedElement.classList[4].slice(12);
    guessedElement.style.backgroundColor = "red";
    guessedElement.classList.add("hit");
    let shipIndex = guessedElement.classList[1].slice(13);
    _player__WEBPACK_IMPORTED_MODULE_0__.human.ships[playerShip].hitShip(shipIndex);
  } else {
    guessedElement.style.backgroundColor = "grey";
    guessedElement.classList.add("miss");
    return;
  }
  if (_player__WEBPACK_IMPORTED_MODULE_0__.human.ships[playerShip].isSunk()) {
    console.log("here computer");
    let computerShipPos = document.querySelectorAll(
      `.${guessedElement.classList[4]}`
    );
    computerShipPos.forEach(function (curr) {
      curr.style.backgroundColor = "purple";
    });
  }
}




/***/ }),

/***/ "./src/modules/generatePlayerBoard.js":
/*!********************************************!*\
  !*** ./src/modules/generatePlayerBoard.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPlayerBoard": () => (/* binding */ createPlayerBoard)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");


let gameContainer = document.querySelector(".main-display");

function createPlayerBoard() {
  gameContainer.classList.remove("hidden");
  let playerGameContainer = document.createElement("div");
  playerGameContainer.classList.add("player-game");
  gameContainer.append(playerGameContainer);
  let z = 0;
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let square = document.createElement("div");
      square.classList.add(
        `player-square`,
        `player-index-${z}`,
        `player-row${x}`,
        `player-column${y}`
      );
      playerGameContainer.appendChild(square);
      z++;
    }
  }
  placeShips();
}

function placeShips() {
  for (let [num, ship] of _player__WEBPACK_IMPORTED_MODULE_0__.human.positions.entries()) {
    for (let [indx, curr] of ship.entries()) {
      let index = curr.slice(12);
      let currSquare = document.querySelector(`.player-index-${index}`);
      currSquare.classList.add(`player-ship-${num}`, `player-spot`);
      currSquare.style.backgroundColor = "yellow";
    }
  }
}




/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player),
/* harmony export */   "computer": () => (/* binding */ computer),
/* harmony export */   "human": () => (/* binding */ human)
/* harmony export */ });
class Player {
  ships = [];
  positions = [];
}

//Repeat functionality for vertical computer ships
//Create a function to add an event listener to the computers board
//When player clicks check if spot is already clicked before, add a class called clicked-already
//Check if spot is a ship or not
// If not turn spot gray
// If it is turn the spot red

let human = new Player();
let computer = new Player();




/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  sunken = false;
  hitArea = [];

  constructor(length) {
    this.length = length;
  }

  hitShip(coords) {
    this.hitArea.push(coords);
  }

  isSunk() {
    this.sunken = this.hitArea.length === this.length;
    return this.sunken;
  }
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSwwQkFBMEIsNERBQXVCO0FBQ2pEO0FBQ0E7QUFDQSwrREFBK0QsTUFBTTtBQUNyRSw4Q0FBOEMsSUFBSTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFNkI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFbUM7Ozs7Ozs7Ozs7Ozs7OztBQ2ZuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVnQjs7Ozs7OztVQ2xCaEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvYWRkVUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2VuZXJhdGVDb21wdXRlckJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nZW5lcmF0ZVBsYXllckJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVCb2FyZCB9IGZyb20gXCIuL21vZHVsZXMvYWRkVUlcIjtcbmltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuL21vZHVsZXMvZ2FtZUJvYXJkXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9tb2R1bGVzL3BsYXllclwiO1xuXG4vLyBsZXQgcG9zaXQgPSBnZXRQbGFjZW1lbnRGcm9tVUkoNSk7XG4vLyBjb25zb2xlLmxvZyhwb3NpdCk7XG5cbmNyZWF0ZUJvYXJkKCk7XG5cbmxldCBnYW1lZGF0YSA9IG5ldyBHYW1lQm9hcmQoKTtcbmdhbWVkYXRhLnBsYWNlU2hpcCgpO1xuXG5leHBvcnQgeyBnYW1lZGF0YSB9O1xuXG4vLyBDcmVhdGUgUGxheWVyc1xuLy8gTG9vcCB0aHJvdWdoIHBsYXllclBpZWNlc1xuLy8gUGxhY2UgUGllY2UgYW5kIGFkZCBpdCB0byBwbGF5ZXJzIHBvc2l0aW9uXG4iLCJpbXBvcnQgeyBodW1hbiB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyQm9hcmQgfSBmcm9tIFwiLi9nZW5lcmF0ZVBsYXllckJvYXJkXCI7XG5pbXBvcnQge1xuICBjcmVhdGVDb21wdXRlckJvYXJkLFxuICBnZW5lcmF0ZUNvbXB1dGVyUG9zaXRpb25zLFxuICBhZGRDb21wdXRlckJvYXJkRnVuY3Rpb25hbGl0eSxcbn0gZnJvbSBcIi4vZ2VuZXJhdGVDb21wdXRlckJvYXJkXCI7XG5cbmNvbnN0IHRlbXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXAtY29udGFpbmVyXCIpO1xuY29uc3QgdGVtcFBsYXllclBsYWNlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcC1nYW1lYm9hcmRcIik7XG5jb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXAtYnRuXCIpO1xuXG5sZXQgdmVydGljYWwgPSBmYWxzZTtcbmxldCBwb3NpdGlvbnMgPSBbXTtcbmxldCBzaGlwU2l6ZXMgPSBbNSwgNCwgMywgMywgMl07XG5sZXQgY3VycmVudFBpZWNlO1xuXG4vLyBDaGFuZ2VzIHBvc2l0aW9uIG9mIHNoaXBzIHRvIGVpdGhlciBiZSBob3Jpem9udGFsIG9yIHZlcnRpY2FsIHdoZW4gY2hvb3NpbmcgdGhlIHBvc2l0aW9uc1xucm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICB2ZXJ0aWNhbCA9ICF2ZXJ0aWNhbDtcbn0pO1xuXG4vLyBDcmVhdGVzIFRlbXBvcmFyeSBCb2FyZCBmb3IgcGxheWVyIHRvIHBsYWNlIHNoaXAgcG9zaXRpb25zXG5mdW5jdGlvbiBjcmVhdGVCb2FyZChjb250YWluZXIpIHtcbiAgbGV0IHogPSAwO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcbiAgICAgIGxldCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgIGB0ZW1wLXNxdWFyZWAsXG4gICAgICAgIGBzcXVhcmUtaW5keC0ke3p9YCxcbiAgICAgICAgYHNxdWFyZS1yb3cke3h9YCxcbiAgICAgICAgYHNxdWFyZS1jb2x1bW4ke3l9YFxuICAgICAgKTtcbiAgICAgIHRlbXBQbGF5ZXJQbGFjZW1lbnQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgIHorKztcbiAgICB9XG4gIH1cbn1cblxuLy8gSGFuZGxlcyB0aGUgaG9yaXpvbnRhbCBob3ZlcmluZyBmdW5jdGlvbmFsaXR5IHdoZW4gbW92aW5nIG1vdXNlIGludG8gYSBjZXJ0YWluIGFyZWFcbmZ1bmN0aW9uIGhhbmRsZUhvcml6b250YWwoZSwgc2l6ZSkge1xuICBsZXQgaG92ZXJlZENsYXNzID0gZS50YXJnZXQuY2xhc3NMaXN0WzFdO1xuICBsZXQgY2xhc3NJbmRleCA9IHBhcnNlSW50KGhvdmVyZWRDbGFzcy5zbGljZSgxMikpO1xuICBsZXQgYmFzZVRleHQgPSBob3ZlcmVkQ2xhc3Muc2xpY2UoMCwgMTIpO1xuICBsZXQgY3VycmVudFJvdyA9IGUudGFyZ2V0LmNsYXNzTGlzdFsyXTtcblxuICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpemU7IHgrKykge1xuICAgIGxldCBjdXJyQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtiYXNlVGV4dH0ke2NsYXNzSW5kZXggKyB4fWApO1xuICAgIGlmIChjdXJyQ2xhc3MgJiYgY3VyckNsYXNzLmNsYXNzTGlzdFsyXSA9PT0gY3VycmVudFJvdykge1xuICAgICAgY3VyckNsYXNzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiYXF1YVwiO1xuICAgICAgY3VyckNsYXNzLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBIYW5kbGVzIHRoZSBob3Jpem9udGFsIGhvdmVyaW5nIGZ1bmN0aW9uYWxpdHkgd2hlbiBtb3ZpbmcgbW91c2Ugb3V0IG9mIGEgY2VydGFpbiBhcmVhXG5mdW5jdGlvbiBoYW5kbGVIb3Jpem9udGFsT3V0KGUsIHNpemUpIHtcbiAgbGV0IGhvdmVyZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvdmVyZWRcIik7XG5cbiAgaG92ZXJlZC5mb3JFYWNoKGZ1bmN0aW9uIChjdXJyKSB7XG4gICAgY3Vyci5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKTtcbiAgICBpZiAoY3Vyci5jbGFzc0xpc3QuY29udGFpbnMoXCJjaGVja2VkXCIpKSB7XG4gICAgICBjdXJyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwieWVsbG93XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIEhhbmRsZXMgdGhlIHZlcnRpY2FsIGhvdmVyaW5nIGZ1bmN0aW9uYWxpdHkgd2hlbiBtb3ZpbmcgbW91c2UgaW50byBhIGNlcnRhaW4gYXJlYVxuZnVuY3Rpb24gaGFuZGxlVmVydGljYWwoZSwgc2l6ZSkge1xuICBsZXQgaG92ZXJlZENsYXNzID0gZS50YXJnZXQuY2xhc3NMaXN0WzFdO1xuICBsZXQgY2xhc3NJbmRleCA9IHBhcnNlSW50KGhvdmVyZWRDbGFzcy5zbGljZSgxMikpO1xuICBsZXQgYmFzZVRleHQgPSBob3ZlcmVkQ2xhc3Muc2xpY2UoMCwgMTIpO1xuICBsZXQgY3VycmVudENvbHVtbiA9IGUudGFyZ2V0LmNsYXNzTGlzdFszXTtcblxuICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpemU7IHgrKykge1xuICAgIGxldCBjdXJyQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke2Jhc2VUZXh0fSR7Y2xhc3NJbmRleCArIHggKiAxMH1gXG4gICAgKTtcbiAgICBpZiAoY3VyckNsYXNzICYmIGN1cnJDbGFzcy5jbGFzc0xpc3RbM10gPT09IGN1cnJlbnRDb2x1bW4pIHtcbiAgICAgIGN1cnJDbGFzcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImFxdWFcIjtcbiAgICAgIGN1cnJDbGFzcy5jbGFzc0xpc3QudG9nZ2xlKFwiaG92ZXJlZFwiKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gSGFuZGxlcyB0aGUgdmVydGljYWwgaG92ZXJpbmcgZnVuY3Rpb25hbGl0eSB3aGVuIG1vdmluZyBtb3VzZSBvdXQgb2YgYSBjZXJ0YWluIGFyZWFcbmZ1bmN0aW9uIGhhbmRsZVZlcnRpY2FsT3V0KGUsIHNpemUpIHtcbiAgbGV0IGhvdmVyZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvdmVyZWRcIik7XG5cbiAgaG92ZXJlZC5mb3JFYWNoKGZ1bmN0aW9uIChjdXJyKSB7XG4gICAgY3Vyci5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKTtcbiAgICBpZiAoY3Vyci5jbGFzc0xpc3QuY29udGFpbnMoXCJjaGVja2VkXCIpKSB7XG4gICAgICBjdXJyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwieWVsbG93XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIENoZWNrcyBjb2x1bW5zIHdoZW4gcGxhY2luZyBhIHBpZWNlXG5mdW5jdGlvbiBjaGVja0NvbHVtbihlLCBzaXplKSB7XG4gIGxldCBob3ZlcmVkQ2xhc3MgPSBlLnRhcmdldC5jbGFzc0xpc3RbMV07XG4gIGxldCBjbGFzc0luZGV4ID0gcGFyc2VJbnQoaG92ZXJlZENsYXNzLnNsaWNlKDEyKSk7XG4gIGxldCBhbGxIb3ZlcmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmhvdmVyZWRgKTtcbiAgbGV0IGN1cnJlbnRDb2x1bW4gPSBlLnRhcmdldC5jbGFzc0xpc3RbM107XG4gIGxldCBiYXNlVGV4dCA9IGhvdmVyZWRDbGFzcy5zbGljZSgwLCAxMik7XG5cbiAgLy8gQ2hlY2tzIGlmIHRoZSBjdXJyZW50IGhvdmVyZWQgc3F1YXJlcyBpbiB0aGUgcm93IGFyZSB2YWxpZCBiZWZvcmUgYWRkaW5nIGl0IGFzIGEgcG9zaXRpb25cbiAgZm9yIChsZXQgY3VyciBvZiBhbGxIb3ZlcmVkKSB7XG4gICAgaWYgKFxuICAgICAgY3Vyci5jbGFzc0xpc3QuY29udGFpbnMoXCJjaGVja2VkXCIpIHx8XG4gICAgICBjdXJyLmNsYXNzTGlzdFszXSAhPT0gY3VycmVudENvbHVtbiB8fFxuICAgICAgYWxsSG92ZXJlZC5sZW5ndGggIT09IHNpemVcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvLyBDaGVja3MgaWYgdGhlIGN1cnJlbnQgaG92ZXJlZCBzcXVhcmVzIGluIHRoZSByb3cgYXJlIHZhbGlkIGJlZm9yZSBhZGRpbmcgaXQgYXMgYSBwb3NpdGlvblxuICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpemU7IHgrKykge1xuICAgIGxldCBjdXJyQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke2Jhc2VUZXh0fSR7Y2xhc3NJbmRleCArIHggKiAxMH1gXG4gICAgKTtcbiAgICBpZiAoIWN1cnJDbGFzcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGxldCBzaGlwUG9zID0gW107XG4gIGFsbEhvdmVyZWQuZm9yRWFjaChmdW5jdGlvbiAoY3Vycikge1xuICAgIGN1cnIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ5ZWxsb3dcIjtcbiAgICBjdXJyLmNsYXNzTGlzdC5hZGQoXCJjaGVja2VkXCIpO1xuICAgIHNoaXBQb3MucHVzaChjdXJyLmNsYXNzTGlzdFsxXSk7XG4gIH0pO1xuICBjdXJyZW50UGllY2UrKztcbiAgaHVtYW4ucG9zaXRpb25zLnB1c2goc2hpcFBvcyk7XG59XG5cbi8vQ2hlY2tzIHJvd3Mgd2hlbiBwbGFjaW5nIGEgcGllY2VcbmZ1bmN0aW9uIGNoZWNrUm93KGUsIHNpemUpIHtcbiAgbGV0IGhvdmVyZWRDbGFzcyA9IGUudGFyZ2V0LmNsYXNzTGlzdFsxXTtcbiAgbGV0IGFsbEhvdmVyZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuaG92ZXJlZGApO1xuICBsZXQgY3VycmVudFJvdyA9IGUudGFyZ2V0LmNsYXNzTGlzdFsyXTtcbiAgbGV0IGJhc2VUZXh0ID0gaG92ZXJlZENsYXNzLnNsaWNlKDAsIDEyKTtcbiAgbGV0IGNsYXNzSW5kZXggPSBwYXJzZUludChob3ZlcmVkQ2xhc3Muc2xpY2UoMTIpKTtcblxuICAvLyBDaGVja3MgaWYgdGhlIGN1cnJlbnQgaG92ZXJlZCBzcXVhcmVzIGluIHRoZSByb3cgYXJlIHZhbGlkIGJlZm9yZSBhZGRpbmcgaXQgYXMgYSBwb3NpdGlvblxuICBmb3IgKGxldCBjdXJyIG9mIGFsbEhvdmVyZWQpIHtcbiAgICBpZiAoXG4gICAgICBjdXJyLmNsYXNzTGlzdC5jb250YWlucyhcImNoZWNrZWRcIikgfHxcbiAgICAgIGN1cnIuY2xhc3NMaXN0WzJdICE9PSBjdXJyZW50Um93IHx8XG4gICAgICBhbGxIb3ZlcmVkLmxlbmd0aCAhPT0gc2l6ZVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICAvLyBDaGVja3MgaWYgdGhlIGN1cnJlbnQgaG92ZXJlZCBzcXVhcmVzIGluIHRoZSByb3cgYXJlIHZhbGlkIGJlZm9yZSBhZGRpbmcgaXQgYXMgYSBwb3NpdGlvblxuICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpemU7IHgrKykge1xuICAgIGxldCBjdXJyQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtiYXNlVGV4dH0ke2NsYXNzSW5kZXggKyB4fWApO1xuICAgIGlmICghY3VyckNsYXNzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLy9IaWdobGlnaHRzIHRoZSBzZWxlY3RlZCBQb3NpdGlvbnMgcGluayBhbmQgcHVzaGVzIHRob3NlIHBvc2l0aW9ucyB0byBhbiBhcnJheVxuICBsZXQgc2hpcFBvcyA9IFtdO1xuICBhbGxIb3ZlcmVkLmZvckVhY2goZnVuY3Rpb24gKGN1cnIpIHtcbiAgICBjdXJyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwieWVsbG93XCI7XG4gICAgY3Vyci5jbGFzc0xpc3QuYWRkKFwiY2hlY2tlZFwiKTtcbiAgICBzaGlwUG9zLnB1c2goY3Vyci5jbGFzc0xpc3RbMV0pO1xuICB9KTtcbiAgY3VycmVudFBpZWNlKys7XG4gIGh1bWFuLnBvc2l0aW9ucy5wdXNoKHNoaXBQb3MpO1xufVxuXG4vLyBBZGRzIGEgc2hpcCBwb3NpdGlvbiB0byB0aGUgYm9hcmRcbmZ1bmN0aW9uIGFkZE5ld1Bvc2l0aW9uKGUsIHNpemUpIHtcbiAgaWYgKHZlcnRpY2FsKSB7XG4gICAgY2hlY2tDb2x1bW4oZSwgc2l6ZSk7XG4gIH0gZWxzZSB7XG4gICAgY2hlY2tSb3coZSwgc2l6ZSk7XG4gIH1cbn1cblxuLy8gRnVuY3Rpb24gdGhhdCBoYW5kbGVzIHBsYXllciBjaG9vc2luZyBwb3NpdGlvbnMgZm9yIGdhbWUgKGhvdmVyaW5nIGJsdWUgc3F1YXJlcyAmIHNlbGVjdGVkIHBpbmsgc3F1YXJlcylcbmZ1bmN0aW9uIGdldFBsYWNlbWVudEZyb21VSSgpIHtcbiAgY3VycmVudFBpZWNlID0gMDtcblxuICB0ZW1wUGxheWVyUGxhY2VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBoYW5kbGVWZXJ0aWNhbChldmVudCwgc2hpcFNpemVzW2N1cnJlbnRQaWVjZV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVIb3Jpem9udGFsKGV2ZW50LCBzaGlwU2l6ZXNbY3VycmVudFBpZWNlXSk7XG4gICAgfVxuICB9KTtcblxuICB0ZW1wUGxheWVyUGxhY2VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIGhhbmRsZVZlcnRpY2FsT3V0KGV2ZW50LCBzaGlwU2l6ZXNbY3VycmVudFBpZWNlXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZUhvcml6b250YWxPdXQoZXZlbnQsIHNoaXBTaXplc1tjdXJyZW50UGllY2VdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHRlbXBQbGF5ZXJQbGFjZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgYWRkTmV3UG9zaXRpb24oZXZlbnQsIHNoaXBTaXplc1tjdXJyZW50UGllY2VdKTtcbiAgICBpZiAoY3VycmVudFBpZWNlID09PSA1KSB7XG4gICAgICB0ZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBjcmVhdGVQbGF5ZXJCb2FyZCgpO1xuICAgICAgY3JlYXRlQ29tcHV0ZXJCb2FyZCgpO1xuICAgICAgZ2VuZXJhdGVDb21wdXRlclBvc2l0aW9ucygpO1xuICAgICAgYWRkQ29tcHV0ZXJCb2FyZEZ1bmN0aW9uYWxpdHkoKTtcbiAgICAgIC8vcmVtb3ZlIGRpc3BsYXlcbiAgICAgIC8vcmVuZGVyIGdhbWVib2FyZFxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZUJvYXJkLCBnZXRQbGFjZW1lbnRGcm9tVUkgfTtcblxuLy8gUmVvcmdhbml6ZSBDb2RlIHRvIGJlIG1vcmUgZHJ5XG4vLyBGaWd1cmUgb3V0IGhvdyB0byByZXR1cm4gdGhlIGNoZWNrZWQgcG9zaXRpb25zIGFuZCBsb29wIHRvIHRoZSBuZXh0IHNoaXAgaW4gdGhlIGNyZWF0aW9uXG4vLyBDcmVhdGUgYSByZXNldCBidXR0b24gaWYgcGxheWVyIG1lc3NlcyB1cFxuIiwiaW1wb3J0IHsgZ2V0UGxhY2VtZW50RnJvbVVJIH0gZnJvbSBcIi4vYWRkVUlcIjtcbmltcG9ydCB7IGh1bWFuLCBjb21wdXRlciwgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgZ2VuZXJhdGVDb21wdXRlckF0dGFjayB9IGZyb20gXCIuL2dlbmVyYXRlQ29tcHV0ZXJCb2FyZFwiO1xuXG5sZXQgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG5cbmZ1bmN0aW9uIHBsYWNlUGxheWVyU2hpcFBvc2l0aW9ucygpIHtcbiAgZ2V0UGxhY2VtZW50RnJvbVVJKCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0QW5kUHVzaFNoaXBzKCkge1xuICBmb3IgKGxldCBsZW5ndGggb2Ygc2hpcExlbmd0aHMpIHtcbiAgICBsZXQgaHVtYW5TaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgICBsZXQgY29tcHV0ZXJTaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgICBodW1hbi5zaGlwcy5wdXNoKGh1bWFuU2hpcCk7XG4gICAgY29tcHV0ZXIuc2hpcHMucHVzaChjb21wdXRlclNoaXApO1xuICB9XG59XG5cbmNsYXNzIEdhbWVCb2FyZCB7XG4gIHBsYWNlU2hpcCgpIHtcbiAgICAvL1N0b3JlcyBpbmZvcm1hdGlvbiBvZiB3aGVyZSBzaGlwcyBhcmVcbiAgICBjcmVhdEFuZFB1c2hTaGlwcygpO1xuICAgIHBsYWNlUGxheWVyU2hpcFBvc2l0aW9ucygpO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhlKSB7XG4gICAgbGV0IGNsaWNrZWRDbGFzc0xpc3QgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XG4gICAgaWYgKGNsaWNrZWRDbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlci1zcG90XCIpKSB7XG4gICAgICBpZiAoY2xpY2tlZENsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaGl0QXVkaW8gPSBuZXcgQXVkaW8oXCIuLi9hc3NldHMvaGl0U291bmQubXAzXCIpO1xuICAgICAgICBoaXRBdWRpby5wbGF5KCk7XG4gICAgICAgIGNsaWNrZWRDbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICAgICAgICAvL2dldHMgdGhlIGluZGV4IG9mIHdoaWNoIHNoaXAgd2FzIGhpdFxuICAgICAgICBsZXQgc2hpcFRoYXRXYXNIaXQgPSBlLnRhcmdldC5jbGFzc0xpc3RbNV0uc2xpY2UoMTQpO1xuXG4gICAgICAgIC8vIEFkZHMgdGhlIGluZGV4IG9mIHRoZSBwYXJ0IG9mIHRoZSBzaGlwIHRoYXQgd2FzIGhpdFxuICAgICAgICBsZXQgY29vcmRzID0gZS50YXJnZXQuY2xhc3NMaXN0WzFdLnNsaWNlKDE1KTtcbiAgICAgICAgbGV0IHNoaXAgPSBjb21wdXRlci5zaGlwc1tzaGlwVGhhdFdhc0hpdF07XG4gICAgICAgIHNoaXAuaGl0U2hpcChjb29yZHMpO1xuXG4gICAgICAgIC8vY2hlY2sgaWYgc2hpcCBoYXMgYmVlbiBzdW5rZW5cbiAgICAgICAgY29uc29sZS5sb2coc2hpcCk7XG4gICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJoZXJlIGh1bWFuXCIpO1xuICAgICAgICAgIGxldCBjb21wdXRlclNoaXBQb3NpdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICAgYC4ke2UudGFyZ2V0LmNsYXNzTGlzdFs1XX1gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhjb21wdXRlclNoaXBQb3NpdGlvbnMpO1xuICAgICAgICAgIGNvbXB1dGVyU2hpcFBvc2l0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChjdXJyKSB7XG4gICAgICAgICAgICBjdXJyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicHVycGxlXCI7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jaGVja3MgaWYgdGhlIHBsYXllciB3b25cbiAgICAgICAgdGhpcy4jY2hlY2tXaW5uZXIoY29tcHV0ZXIpO1xuXG4gICAgICAgIGdlbmVyYXRlQ29tcHV0ZXJBdHRhY2soKTtcblxuICAgICAgICAvL2NoZWNrcyBpZiB0aGUgY29tcHV0ZXIgd29uXG4gICAgICAgIHRoaXMuI2NoZWNrV2lubmVyKGh1bWFuKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNsaWNrZWRDbGFzc0xpc3QuY29udGFpbnMoXCJtaXNzZWRcIikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbGV0IGhpdEF1ZGlvID0gbmV3IEF1ZGlvKFwiLi4vYXNzZXRzL21pc3NTb3VuZC5tcDNcIik7XG4gICAgICBoaXRBdWRpby5wbGF5KCk7XG4gICAgICBjbGlja2VkQ2xhc3NMaXN0LmFkZChcIm1pc3NlZFwiKTtcbiAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiO1xuXG4gICAgICBpZiAoZ2VuZXJhdGVDb21wdXRlckF0dGFjaygpKSB7XG4gICAgICAgIC8vZGlzcGxheVNoaXBTdW5rXG4gICAgICB9XG4gICAgICAvL3J1biBjb21wdXRlcnMgbW92ZVxuICAgICAgLy9jaGVjayBpZiBjb21wdXRlciB3b25cbiAgICB9XG4gIH1cblxuICAjY2hlY2tXaW5uZXIocGxheWVyKSB7XG4gICAgbGV0IHdpbm5lciA9IHRydWU7XG4gICAgcGxheWVyLnNoaXBzLmZvckVhY2goZnVuY3Rpb24gKGN1cnIpIHtcbiAgICAgIGlmICghY3Vyci5zdW5rZW4pIHtcbiAgICAgICAgd2lubmVyID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGV0IGdhbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWRpc3BsYXlcIik7XG4gICAgbGV0IHdpbm5lckRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lci1kaXNwbGF5XCIpO1xuICAgIGxldCB3aW5uZXJEaXNwbGF5VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyLWRpc3BsYXktdGV4dFwiKTtcbiAgICBsZXQgaGVhZGVySW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1oZWFkZXJcIik7XG4gICAgaWYgKHdpbm5lciA9PT0gdHJ1ZSkge1xuICAgICAgZ2FtZURpc3BsYXkuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIHdpbm5lckRpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGhlYWRlckluZm8uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChwbGF5ZXIgPT09IGNvbXB1dGVyKSB7XG4gICAgICAgIHdpbm5lckRpc3BsYXlUZXh0LnRleHRDb250ZW50ID0gYFlvdSBXb24gVGhlIEdhbWUgSHVtYW4hISHwn5GkYDtcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyID09PSBodW1hbikge1xuICAgICAgICB3aW5uZXJEaXNwbGF5VGV4dC50ZXh0Q29udGVudCA9IGBZb3UgTG9zdCBUaGUgR2FtZSBDb21wdXRlciBXaW5zISEh8J+klmA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgaHVtYW4sIGNvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBnYW1lZGF0YSB9IGZyb20gXCIuLi9hcHBcIjtcblxubGV0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tZGlzcGxheVwiKTtcblxubGV0IHNoaXBTaXplcyA9IFs1LCA0LCAzLCAzLCAyXTtcblxuZnVuY3Rpb24gcmFuZG9tSW50RnJvbUludGVydmFsKG1pbiwgbWF4KSB7XG4gIC8vIG1pbiBhbmQgbWF4IGluY2x1ZGVkXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xufVxuXG5mdW5jdGlvbiBjaGVja0lmUm93SW52YWxpZChzaXplLCByb3csIGNvbHVtbikge1xuICBsZXQgaW52YWxpZCA9IGZhbHNlO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpemU7IHgrKykge1xuICAgIGxldCBpbmRleCA9IHJvdyAqIDEwICsgY29sdW1uICsgeDtcbiAgICBsZXQgaW5kZXhBc0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNvbXB1dGVyLWluZGV4LSR7aW5kZXh9YCk7XG4gICAgaWYgKGluZGV4QXNDbGFzcy5jbGFzc0xpc3QuY29udGFpbnMoXCJjb21wdXRlci1zcG90XCIpKSB7XG4gICAgICBpbnZhbGlkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGludmFsaWQ7XG59XG5cbmZ1bmN0aW9uIGNoZWNrSWZDb2x1bW5WYWxpZChzaXplLCByb3csIGNvbHVtbikge1xuICBsZXQgaW52YWxpZCA9IGZhbHNlO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpemU7IHgrKykge1xuICAgIGxldCBpbmRleCA9IHJvdyAqIDEwICsgY29sdW1uICsgeCAqIDEwO1xuICAgIGxldCBpbmRleEFzQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29tcHV0ZXItaW5kZXgtJHtpbmRleH1gKTtcbiAgICBpZiAoaW5kZXhBc0NsYXNzLmNsYXNzTGlzdC5jb250YWlucyhcImNvbXB1dGVyLXNwb3RcIikpIHtcbiAgICAgIGludmFsaWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW52YWxpZDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVDb21wdXRlclBvc2l0aW9ucygpIHtcbiAgZm9yIChsZXQgW2luZHgsIHNpemVdIG9mIHNoaXBTaXplcy5lbnRyaWVzKCkpIHtcbiAgICBsZXQgbG9vcEFnYWluID0gdHJ1ZTtcblxuICAgIC8vTG9vayBmb3IgYSByYW5kb20gcGxhY2UgdG8gcHV0IGEgc2hpcCB1bnRpbCB5b3UgZmluZCBvbmVcbiAgICBkbyB7XG4gICAgICBsZXQgZGlyZWN0aW9uID0gcmFuZG9tSW50RnJvbUludGVydmFsKDEsIDIpO1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICBsZXQgcm93ID0gcmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgICAgICBsZXQgY29sdW1uID0gcmFuZG9tSW50RnJvbUludGVydmFsKDAsIDUpO1xuICAgICAgICBsZXQgc2hpcCA9IFtdO1xuXG4gICAgICAgIGlmIChjaGVja0lmUm93SW52YWxpZChzaXplLCByb3csIGNvbHVtbikpIHtcbiAgICAgICAgICBsb29wQWdhaW4gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvb3BBZ2FpbiA9IGZhbHNlO1xuICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2l6ZTsgeCsrKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSByb3cgKiAxMCArIGNvbHVtbiArIHg7XG4gICAgICAgICAgICBsZXQgaW5kZXhBc0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgYC5jb21wdXRlci1pbmRleC0ke2luZGV4fWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvLyBpbmRleEFzQ2xhc3Muc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgICAgIGluZGV4QXNDbGFzcy5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgICBgY29tcHV0ZXItc3BvdGAsXG4gICAgICAgICAgICAgIGBjb21wdXRlci1zaGlwLSR7aW5keH1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc2hpcC5wdXNoKGluZGV4KTtcbiAgICAgICAgICAgIGlmICh4ID09PSBzaXplIC0gMSkge1xuICAgICAgICAgICAgICBjb21wdXRlci5wb3NpdGlvbnMucHVzaChzaGlwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAyKSB7XG4gICAgICAgIGxldCBjb2x1bW4gPSByYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG4gICAgICAgIGxldCByb3cgPSByYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgNSk7XG4gICAgICAgIGxldCBzaGlwID0gW107XG5cbiAgICAgICAgaWYgKGNoZWNrSWZDb2x1bW5WYWxpZChzaXplLCByb3csIGNvbHVtbikpIHtcbiAgICAgICAgICBsb29wQWdhaW4gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvb3BBZ2FpbiA9IGZhbHNlO1xuICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2l6ZTsgeCsrKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSByb3cgKiAxMCArIGNvbHVtbiArIHggKiAxMDtcbiAgICAgICAgICAgIGxldCBpbmRleEFzQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICBgLmNvbXB1dGVyLWluZGV4LSR7aW5kZXh9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIC8vIGluZGV4QXNDbGFzcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInllbGxvd1wiO1xuICAgICAgICAgICAgaW5kZXhBc0NsYXNzLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAgIGBjb21wdXRlci1zcG90YCxcbiAgICAgICAgICAgICAgYGNvbXB1dGVyLXNoaXAtJHtpbmR4fWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzaGlwLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgaWYgKHggPT09IHNpemUgLSAxKSB7XG4gICAgICAgICAgICAgIGNvbXB1dGVyLnBvc2l0aW9ucy5wdXNoKHNoaXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gd2hpbGUgKGxvb3BBZ2Fpbik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZXJCb2FyZCgpIHtcbiAgZ2FtZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICBsZXQgY29tcHV0ZXJHYW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29tcHV0ZXJHYW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1nYW1lXCIpO1xuICBnYW1lQ29udGFpbmVyLmFwcGVuZChjb21wdXRlckdhbWVDb250YWluZXIpO1xuICBsZXQgeiA9IDA7XG4gIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xuICAgICAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgYGNvbXB1dGVyLXNxdWFyZWAsXG4gICAgICAgIGBjb21wdXRlci1pbmRleC0ke3p9YCxcbiAgICAgICAgYGNvbXB1dGVyLXJvdyR7eH1gLFxuICAgICAgICBgY29tcHV0ZXItY29sdW1uJHt5fWBcbiAgICAgICk7XG4gICAgICBjb21wdXRlckdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgIHorKztcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkQ29tcHV0ZXJCb2FyZEZ1bmN0aW9uYWxpdHkoKSB7XG4gIGxldCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlci1nYW1lXCIpO1xuICBjb21wdXRlckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgIGdhbWVkYXRhLnJlY2VpdmVBdHRhY2soZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUNvbXB1dGVyQXR0YWNrKCkge1xuICBsZXQga2VlcFRyeWluZyA9IHRydWU7XG4gIGxldCBndWVzcztcbiAgbGV0IGd1ZXNzZWRFbGVtZW50O1xuICBkbyB7XG4gICAgZ3Vlc3MgPSByYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOTkpO1xuICAgIGd1ZXNzZWRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllci1pbmRleC0ke2d1ZXNzfWApO1xuICAgIGlmIChcbiAgICAgICEoXG4gICAgICAgIGd1ZXNzZWRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSB8fFxuICAgICAgICBndWVzc2VkRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtaXNzXCIpXG4gICAgICApXG4gICAgKSB7XG4gICAgICBrZWVwVHJ5aW5nID0gZmFsc2U7XG4gICAgfVxuICB9IHdoaWxlIChrZWVwVHJ5aW5nKTtcblxuICBsZXQgcGxheWVyU2hpcDtcblxuICBpZiAoZ3Vlc3NlZEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxheWVyLXNwb3RcIikpIHtcbiAgICBwbGF5ZXJTaGlwID0gZ3Vlc3NlZEVsZW1lbnQuY2xhc3NMaXN0WzRdLnNsaWNlKDEyKTtcbiAgICBndWVzc2VkRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICAgIGd1ZXNzZWRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgbGV0IHNoaXBJbmRleCA9IGd1ZXNzZWRFbGVtZW50LmNsYXNzTGlzdFsxXS5zbGljZSgxMyk7XG4gICAgaHVtYW4uc2hpcHNbcGxheWVyU2hpcF0uaGl0U2hpcChzaGlwSW5kZXgpO1xuICB9IGVsc2Uge1xuICAgIGd1ZXNzZWRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiO1xuICAgIGd1ZXNzZWRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaHVtYW4uc2hpcHNbcGxheWVyU2hpcF0uaXNTdW5rKCkpIHtcbiAgICBjb25zb2xlLmxvZyhcImhlcmUgY29tcHV0ZXJcIik7XG4gICAgbGV0IGNvbXB1dGVyU2hpcFBvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBgLiR7Z3Vlc3NlZEVsZW1lbnQuY2xhc3NMaXN0WzRdfWBcbiAgICApO1xuICAgIGNvbXB1dGVyU2hpcFBvcy5mb3JFYWNoKGZ1bmN0aW9uIChjdXJyKSB7XG4gICAgICBjdXJyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicHVycGxlXCI7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgY3JlYXRlQ29tcHV0ZXJCb2FyZCxcbiAgZ2VuZXJhdGVDb21wdXRlclBvc2l0aW9ucyxcbiAgYWRkQ29tcHV0ZXJCb2FyZEZ1bmN0aW9uYWxpdHksXG4gIGdlbmVyYXRlQ29tcHV0ZXJBdHRhY2ssXG59O1xuIiwiaW1wb3J0IHsgaHVtYW4gfSBmcm9tIFwiLi9wbGF5ZXJcIjtcblxubGV0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tZGlzcGxheVwiKTtcblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyQm9hcmQoKSB7XG4gIGdhbWVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgbGV0IHBsYXllckdhbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwbGF5ZXJHYW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItZ2FtZVwiKTtcbiAgZ2FtZUNvbnRhaW5lci5hcHBlbmQocGxheWVyR2FtZUNvbnRhaW5lcik7XG4gIGxldCB6ID0gMDtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFxuICAgICAgICBgcGxheWVyLXNxdWFyZWAsXG4gICAgICAgIGBwbGF5ZXItaW5kZXgtJHt6fWAsXG4gICAgICAgIGBwbGF5ZXItcm93JHt4fWAsXG4gICAgICAgIGBwbGF5ZXItY29sdW1uJHt5fWBcbiAgICAgICk7XG4gICAgICBwbGF5ZXJHYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICB6Kys7XG4gICAgfVxuICB9XG4gIHBsYWNlU2hpcHMoKTtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwcygpIHtcbiAgZm9yIChsZXQgW251bSwgc2hpcF0gb2YgaHVtYW4ucG9zaXRpb25zLmVudHJpZXMoKSkge1xuICAgIGZvciAobGV0IFtpbmR4LCBjdXJyXSBvZiBzaGlwLmVudHJpZXMoKSkge1xuICAgICAgbGV0IGluZGV4ID0gY3Vyci5zbGljZSgxMik7XG4gICAgICBsZXQgY3VyclNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXItaW5kZXgtJHtpbmRleH1gKTtcbiAgICAgIGN1cnJTcXVhcmUuY2xhc3NMaXN0LmFkZChgcGxheWVyLXNoaXAtJHtudW19YCwgYHBsYXllci1zcG90YCk7XG4gICAgICBjdXJyU3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwieWVsbG93XCI7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVBsYXllckJvYXJkIH07XG4iLCJjbGFzcyBQbGF5ZXIge1xuICBzaGlwcyA9IFtdO1xuICBwb3NpdGlvbnMgPSBbXTtcbn1cblxuLy9SZXBlYXQgZnVuY3Rpb25hbGl0eSBmb3IgdmVydGljYWwgY29tcHV0ZXIgc2hpcHNcbi8vQ3JlYXRlIGEgZnVuY3Rpb24gdG8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wdXRlcnMgYm9hcmRcbi8vV2hlbiBwbGF5ZXIgY2xpY2tzIGNoZWNrIGlmIHNwb3QgaXMgYWxyZWFkeSBjbGlja2VkIGJlZm9yZSwgYWRkIGEgY2xhc3MgY2FsbGVkIGNsaWNrZWQtYWxyZWFkeVxuLy9DaGVjayBpZiBzcG90IGlzIGEgc2hpcCBvciBub3Rcbi8vIElmIG5vdCB0dXJuIHNwb3QgZ3JheVxuLy8gSWYgaXQgaXMgdHVybiB0aGUgc3BvdCByZWRcblxubGV0IGh1bWFuID0gbmV3IFBsYXllcigpO1xubGV0IGNvbXB1dGVyID0gbmV3IFBsYXllcigpO1xuXG5leHBvcnQgeyBQbGF5ZXIsIGh1bWFuLCBjb21wdXRlciB9O1xuIiwiY2xhc3MgU2hpcCB7XG4gIHN1bmtlbiA9IGZhbHNlO1xuICBoaXRBcmVhID0gW107XG5cbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gIH1cblxuICBoaXRTaGlwKGNvb3Jkcykge1xuICAgIHRoaXMuaGl0QXJlYS5wdXNoKGNvb3Jkcyk7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgdGhpcy5zdW5rZW4gPSB0aGlzLmhpdEFyZWEubGVuZ3RoID09PSB0aGlzLmxlbmd0aDtcbiAgICByZXR1cm4gdGhpcy5zdW5rZW47XG4gIH1cbn1cblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAuanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=