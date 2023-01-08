const PlayerFactory = function () {
	//sends an attack to the appropriate gameboard with coordinates of the array
	function sendAttack(gameboard, hitCoords) {
		gameboard.receiveAttack(hitCoords);
	}

	return { sendAttack };
};

const ComputerFactory = function () {
	// calls PlayerFactory
	return Object.assign(PlayerFactory(), {});
};

export { PlayerFactory, ComputerFactory };