import GameBoardFactory from "../mechanics/gameboard/gameboard";
import { ComputerFactory, PlayerFactory } from "../mechanics/player/player";
import { grids } from "./setBoats"



function setUpGame(computerGameboard, playerGameboard) {
    const startGameDescrpt = document.querySelector(".btnDescription");
    const startBtn = document.querySelector(".playBtn");
    startBtn.classList.add("hide");
    startGameDescrpt.classList.add("hide");
    
    const computerGrid = document.getElementById("computerGrid");
    computerGrid.classList.remove("hide");

    const gridsContainer = document.getElementById("gridsContainer");
    gridsContainer.classList.add("rowFlex");

    computerGridEvents(computerGameboard, playerGameboard);
}

const humanPlayer = PlayerFactory();
const computerPlayer = ComputerFactory();

function updateUIGrid(gridType) { 
    let shipStatus = '';
    const currentGrid = grids[gridType];
    const gridLength = currentGrid.length;
    for (let i = 0; i < gridLength; ++i) {
        let cell = "";
        if (gridType === "pcGrid") {
             cell = document.getElementById("com"+i);
        } else {
             cell = document.getElementById(i);
        }
        if (currentGrid[i] === 2) {
            shipStatus = 'shipAttacked';
            cell.classList.remove("shipPlaced");
            cell.classList.add('shipAttacked');
            cell.classList.add('noClick');
        } else if (currentGrid[i] === 1 && gridType === 'playerGrid') {
            shipStatus = 'shipPlaced';
            cell.classList.add('shipPlaced');
        } else if (currentGrid[i] === 3) {
            shipStatus = 'shipMissed';
            cell.classList.add('shipMissed');
            cell.classList.add('noClick');
        }
    }
}
function updateGrid(gameboard, gridType, coord1) {
    gameboard.shipArrayBoard.map((ship) => {
        ship.shipArray.map((shipCoordinate) => { 
                if (shipCoordinate === 'hit') {
                    grids[gridType][coord1] = 2;
                }
        });
    });
    gameboard.missedShots.map((missedCoordinate) => {
        grids[gridType][missedCoordinate] = 3;
    });
}
function setWinner(winner) {
   const popUpBackground = document.createElement("div");
   popUpBackground.classList.add("popup-container");
    const popupContent = document.createElement("div");
    popupContent.classList.add('popup');

    const winnerText = document.createElement("p");
    winnerText.innerHTML = "The Winner is: " + winner;
    winnerText.style.cssText = 'font-size: 4rem; font-weight: bold;'
    popupContent.appendChild(winnerText);

    const playAgainBtn = document.createElement("button");
    playAgainBtn.classList.add("playBtn");
    playAgainBtn.innerHTML = "Play again?";
    playAgainBtn.addEventListener("click", () => {
        location.reload();
    });
    popupContent.appendChild(playAgainBtn);

    popUpBackground.appendChild(popupContent);
    document.body.appendChild(popUpBackground);

}
function checkWinner(computerGameboard, playerGameboard) {
     if (computerGameboard.reportSunkShips()) {
        const playerName = document.getElementById("playerName");
        setWinner(playerName.value);
     } else if (playerGameboard.reportSunkShips()) {
        setWinner('Computer');
     } 
}
function computerMove(playerGameboard) {
    let computerDecision = Number(Math.floor(Math.random() * 48));
    computerPlayer.sendAttack(playerGameboard, computerDecision);
    updateGrid(playerGameboard, 'playerGrid', computerDecision);
	updateUIGrid('playerGrid');

}
function computerGridEvents(computerGameboard, playerGameboard) {

    updateUIGrid('pcGrid');

	const gameCellArray = Array.from(document.querySelectorAll('.computerCellSetBoat'));

	for (let i = 0; i < gameCellArray.length; i++) {
		const cell = gameCellArray[i];
		cell.addEventListener('click', function (event) {
			event.stopImmediatePropagation();
                let cellID = cell.id;
                cellID = cellID.replace('com', '');
				const coord1 = Number(cellID);
				humanPlayer.sendAttack(computerGameboard, coord1);
				updateGrid(computerGameboard, 'pcGrid', coord1);
				updateUIGrid('pcGrid');
                computerMove(playerGameboard);
				checkWinner(computerGameboard, playerGameboard);
		});
	}

}

function playGame(computerGameboard, playerGameboard) {
    setUpGame(computerGameboard, playerGameboard);
}
export default playGame;