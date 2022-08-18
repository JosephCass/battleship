const tempPlayerPlacement = document.querySelector(".temp-gameboard");
const rotateBtn = document.querySelector(".temp-btn");

let vertical = false;

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
      currClass.style.backgroundColor = "blue";
      currClass.classList.add("hovered");
    }
  }
}

// Handles the horizontal hovering functionality when moving mouse out of a certain area
function handleHorizontalOut(e, size) {
  let hoveredClass = e.target.classList[1];
  let classIndex = parseInt(hoveredClass.slice(12));
  let baseText = hoveredClass.slice(0, 12);
  for (let x = 0; x < size; x++) {
    let currClass = document.querySelector(`.${baseText}${classIndex + x}`);
    if (currClass) {
      currClass.classList.remove("hovered");

      if (currClass.classList.contains("checked")) {
        currClass.style.backgroundColor = "pink";
      } else if (currClass) {
        currClass.style.backgroundColor = "green";
      }
    }
  }
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
      currClass.style.backgroundColor = "blue";
      currClass.classList.toggle("hovered");
    }
  }
}

// Handles the vertical hovering functionality when moving mouse out of a certain area
function handleVerticalOut(e, size) {
  let hoveredClass = e.target.classList[1];
  let classIndex = parseInt(hoveredClass.slice(12));
  let baseText = hoveredClass.slice(0, 12);
  for (let x = 0; x < size; x++) {
    let currClass = document.querySelector(
      `.${baseText}${classIndex + x * 10}`
    );
    if (currClass) {
      currClass.classList.toggle("hovered");

      if (currClass.classList.contains("checked")) {
        currClass.style.backgroundColor = "pink";
      } else if (currClass) {
        currClass.style.backgroundColor = "green";
      }
    }
  }
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
    curr.style.backgroundColor = "pink";
    curr.classList.add("checked");
    shipPos.push(curr.classList[1]);
  });
  return shipPos;
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
    curr.style.backgroundColor = "pink";
    curr.classList.add("checked");
    shipPos.push(curr.classList[1]);
  });
  return shipPos;
}

// Adds a ship position to the board
function addNewPosition(e, size) {
  if (vertical) {
    return checkColumn(e, size);
  } else {
    return checkRow(e, size);
  }
}

// Function that handles player choosing positions for game (hovering blue squares & selected pink squares)
function getPlacementFromUI(size) {
  let position;
  tempPlayerPlacement.addEventListener("mouseover", function (e) {
    if (vertical) {
      handleVertical(e, size);
    } else {
      handleHorizontal(e, size);
    }
  });

  tempPlayerPlacement.addEventListener("mouseout", function (e) {
    if (vertical) {
      handleVerticalOut(e, size);
    } else {
      handleHorizontalOut(e, size);
    }
  });

  tempPlayerPlacement.addEventListener("mouseup", function (e) {
    position = addNewPosition(e, size);
  });

  return position;
}

export { createBoard, getPlacementFromUI };

// Reorganize Code to be more dry
// Figure out how to return the checked positions and loop to the next ship in the creation
// Create a reset button if player messes up
