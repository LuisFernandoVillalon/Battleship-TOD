import GameBoardFactory from "../mechanics/gameboard/gameboard";
import playGame from "./playGame";
import loadBoards from "./loadBoards";

const gridsContainer = document.getElementById('gridsContainer');
gridsContainer.classList.add("gridsContainer");

const grids = {
    playerUIGrid: '',
    playerGrid: '',
    pcUIGrid: '',
    pcGrid: ''
};
const shipsList = {
    ship1: [5, 1],
    ship2: [4, 1],
    ship3: [3, 1],
    ship4: [2, 1],
    ship5: [1, 1],
};
function createGrid(gridType) {
    const rows = [];
    for (let i = 0; i < 49; ++i) {
        rows.push(0);
    }
    grids[gridType] = rows;
}
function createUIGrid(gridType) {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("indvGridContainer");

    const playerGrid = document.createElement('div');
    playerGrid.classList.add("gridGame");
    let rows = [];
    for (let i = 0; i < 49; ++i) {
        const cellGrid = document.createElement("div");
        if (gridType === "playerUIGrid") {
            cellGrid.id =  i;
            cellGrid.classList.add("gridCellSetBoat");
        } else {
            cellGrid.classList.add("computerCellSetBoat")
            cellGrid.id = "com" + i;
        }
        playerGrid.appendChild(cellGrid);
        rows.push(0);
    }

    gridContainer.appendChild(playerGrid);
    grids[gridType] = rows;
    const titleGrid = document.createElement("div");
    titleGrid.classList.add("gridTitle");
    if (gridType === "playerUIGrid") {
        const playerName = document.getElementById("playerName");
        titleGrid.textContent = playerName.value;
        gridContainer.appendChild(titleGrid);
        gridContainer.id = "playerGrid";
        titleGrid.id = "playerName";
    } else {
        titleGrid.textContent = "Computer";
        gridContainer.id = "computerGrid";
        gridContainer.classList.add("hide");
    }
    gridContainer.appendChild(titleGrid);
    gridsContainer.appendChild(gridContainer);
    return gridsContainer;
}
function setUpPlayerGrid() {
    createGrid('playerGrid');
    createUIGrid('playerUIGrid');
}
function setUpComputerGrid() {
    createGrid('pcGrid');
    createUIGrid('pcUIGrid');
    computerGameboard.placeShip([
		2, 3, 4, 5, 6
	]);
	computerGameboard.placeShip([
		21, 22, 23, 24
	]);
	computerGameboard.placeShip([
		45, 46, 47
	]);
	computerGameboard.placeShip([
		17, 18
	]);
	computerGameboard.placeShip([
	    37
	]);
}
function updateUIGrid(gridType) {
    //const result = grids[gridType].map(() => {  
        let arrayLength = (playerGameboard.shipArrayBoard).length - 1;
        let cellArr = (playerGameboard.shipArrayBoard[arrayLength].coordinates);
        for (let i = 0; i < cellArr.length; ++i) {
            const cell = document.getElementById(cellArr[i]);
                cell.classList.remove("hoverEffect");
                cell.classList.add("shipPlaced");
        }
    //});
    //grids[gridType] = result;    
}
function setShips(shipName, shipAvailibility) {
    shipsList[shipName][1] = shipAvailibility;
}
function nextShipToUse() {
    const shipEntries = Object.entries(shipsList);
    for (let i = 0; i < 5; ++i) {
        const shipObj = shipEntries[i];
		const name = shipObj[0];
		const shipLength = shipObj[1][0];
		const shipAvailability = shipObj[1][1];

        if (name === 'ship1' && shipAvailability) {
            setShips(name, 0);
            //setShipName('battleship');
            return shipLength;
        }
        if (name === 'ship2' && shipAvailability) {
            setShips(name, 0);
            //setShipName('cruiser');
            return shipLength;
        }
        if (name === 'ship3' && shipAvailability) {
            setShips(name, 0);
            //setShipName('submarine');
            return shipLength;
        }
        if (name === 'ship4' && shipAvailability) {
            setShips(name, 0);
            //setShipName('destroyer');
            return shipLength;
        }
        if (name === 'ship5' && shipAvailability) {
            setShips(name, 0);
            return shipLength;
        }        

    }
}
function shipFactory(ship) {
    if (ship == "ship1") {
        return shipsList.ship1;
    } else if (ship == "ship2") {
        return shipsList.ship2;
    } else if (ship == "ship3") {
        return shipsList.ship3;
    } else if (ship == "ship4") {
        return shipsList.ship4;
    } else if (ship == "ship5") {
        return shipsList.ship5;
    }
}
function setUpGridWithBoats(shipsArray, gridType) {
    shipsArray.map((boat) => {
        boat.coordinates.map((coord) => {
            if (gridType === 'playerGrid') {
                grids.playerGrid[coord] = 1;
            } else {
                grids.pcGrid[coord] = 1;
            }
        });
    });
    if (gridType === 'playerGrid') {
        updateUIGrid('playerGrid');
    } else {
        updateUIGrid('pcGrid');
    }
}
let playerGameboard = GameBoardFactory();
let computerGameboard = GameBoardFactory();

function setUpEventListeners() {
    const gameCellArray = Array.from(document.querySelectorAll('.gridCellSetBoat'));
    const shipArray = ['ship1', 'ship2', 'ship3', 'ship4', 'ship5'];
    for (let i = 0; i < gameCellArray.length; ++i) {
        const cell = gameCellArray[i];

        cell.addEventListener("click", function eventHandler(event) {
            event.stopImmediatePropagation();
            for (let i = 0; i < shipArray.length; ++i) {
                let currentShip = shipFactory(shipArray[i]);
                let currentShipLength = currentShip[0];
                const coord = cell.id;
                if (playerGameboard.checkValidPositions(coord, currentShipLength)) {
                    const shipLength = nextShipToUse();
                    const placementCoordinates = playerGameboard.calculateShipPlacement(shipLength, coord);
                    playerGameboard.placeShip(placementCoordinates);
                    setUpGridWithBoats(playerGameboard.shipArrayBoard, 'playerGrid');
                    shipArray.splice(0, 1);
                }
                break; 
            }
            if (shipArray.length == 0) {
                for (let i = 0; i < gameCellArray.length; ++i) {
                    const cell = gameCellArray[i];
                    cell.classList.add('noClick');
                }
                const page = document.getElementById("gridsContainer");
                const startInfo = document.createElement("div");
                const btnDescription = document.createElement("p");
                btnDescription.innerHTML = "Ships have been set! Begin battle!";
                btnDescription.classList.add("btnDescription");
                const btn = document.createElement("button");
                btn.innerHTML = "GO TIME";
                btn.classList.add("playBtn");
                startInfo.appendChild(btnDescription);
                startInfo.appendChild(btn);
                page.appendChild(startInfo);
                startInfo.classList.add("beginBattle");
                btn.addEventListener("click", (event) => {
                    event.stopImmediatePropagation();
                    setUpGridWithBoats(computerGameboard.shipArrayBoard, 'pcGrid');
                    playGame(computerGameboard, playerGameboard);
                });
            }
        });
        cell.addEventListener("mouseover", function (event) {
            event.stopImmediatePropagation();
            for (let i = 0; i < shipArray.length; ++i) {
                let currentShip = shipFactory(shipArray[i]);
                let currentShipLength = currentShip[0];
                const coord = cell.id;
                const placementCoordinates = playerGameboard.calculateShipPlacement(currentShipLength, coord);
                for (let j = 0; j < placementCoordinates.length; j++) {
                   const cellShip = document.getElementById(placementCoordinates[j]);
                    let tempCoord1 = coord;
                    while (tempCoord1 < 50) {
                        if ((tempCoord1 == 0) || (tempCoord1 == 1) || (tempCoord1 == 2) || (tempCoord1 == 3) || (tempCoord1 == 4) || (tempCoord1 == 5) || (tempCoord1 == 6)) {
                            break;
                        } else {
                            tempCoord1 = tempCoord1 - 7;
                        }
                    }
                     let spaceShipWillTakeOnGrid = Number(tempCoord1) + Number(currentShipLength);
                     if (spaceShipWillTakeOnGrid <= 7) {
                        cellShip.classList.remove("notAllowed");
                        cellShip.classList.add("hoverEffect");
                    } else {
                        cellShip.classList.add("notAllowed");
                    }
                }
                break;
            }
        });
        cell.addEventListener("mouseleave", function (event) {
            event.stopImmediatePropagation();
            for (let i = 0; i < shipArray.length; ++i) {
                let currentShip = shipFactory(shipArray[i]);
                let currentShipLength = currentShip[0];
                const coord = cell.id;
                const placementCoordinates = playerGameboard.calculateShipPlacement(currentShipLength, coord);
                for (let j = 0; j < placementCoordinates.length; j++) {
                    const cellShip = document.getElementById(placementCoordinates[j]);
                        cellShip.classList.remove("hoverEffect");
                }
                break;
            }
        });
    }
}
function setBoats() {
    setUpPlayerGrid();
	setUpComputerGrid();
    setUpEventListeners();
}

export { setBoats, grids };