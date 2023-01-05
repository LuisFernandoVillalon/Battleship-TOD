import GameBoardFactory from "../gameboard/gameboard";

const PlayerFactory = function () {
	function sendAttack(gameboard, hitCoords) {
		gameboard.receiveAttack(hitCoords);
	}

	return { sendAttack };
};

const ComputerFactory = function () {
	return Object.assign(PlayerFactory(), {});
};

export { PlayerFactory, ComputerFactory };