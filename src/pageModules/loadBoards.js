
import GameBoardFactory from "../mechanics/gameboard/gameboard";
import { PlayerFactory } from "../mechanics/player/player";
import { ComputerFactory } from "../mechanics/player/player";

    const player1 = PlayerFactory();
    const computer = ComputerFactory();
    const player1Board = GameBoardFactory();
    const computerBoard = GameBoardFactory();


const gridsContainer = document.getElementById('gridsContainer');
gridsContainer.classList.add("gridsContainer");

function createPlayerGrid() {

    const gridContainer = document.createElement("div");
    gridContainer.classList.add("indvGridContainer");
    gridContainer.id = "playerGrid";

    const playerGrid = document.createElement('div');
    playerGrid.classList.add("gridGame");

    for (let i = 0; i < 49; ++i) {
        const cellGrid = document.createElement("div");
        cellGrid.classList.add("gridCell");
        playerGrid.appendChild(cellGrid);
    }

    const titleGrid = document.createElement("div");
    titleGrid.classList.add("gridTitle");
    titleGrid.textContent = "Player 1"
    
    gridContainer.appendChild(playerGrid);
    gridContainer.appendChild(titleGrid);

    gridsContainer.appendChild(gridContainer);

    return gridsContainer;
}

function createComputerGrid() {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("indvGridContainer");
    gridContainer.id = "computerGrid";

    const computerGrid = document.createElement('div');
    computerGrid.classList.add("gridGame");

    for (let i = 0; i < 49; ++i) {
        const cellGrid = document.createElement("div");
        cellGrid.classList.add("computerCellGrid");
        cellGrid.addEventListener("click", () => {
            let position = i.toString();
            player1.sendAttack(computerBoard, position);
            let computerDecision = (Math.floor(Math.random() * 48)).toString();
            computer.sendAttack(player1Board, computerDecision);
            checkWinner();
        });
        computerGrid.appendChild(cellGrid);
    }

    const titleGrid = document.createElement("div");
    titleGrid.classList.add("gridTitle");
    titleGrid.textContent = "Computer";

    gridContainer.appendChild(computerGrid);
    gridContainer.appendChild(titleGrid);

    gridsContainer.appendChild(gridContainer);

    return gridsContainer;
}

function checkWinner() {
    if (computerBoard.reportSunkShips() || player1Board.reportSunkShips()) {
        console.log("game Over");
    }
}

function loadBoards() {
    createPlayerGrid();
    createComputerGrid();
}

export default loadBoards;