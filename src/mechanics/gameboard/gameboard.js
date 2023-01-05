import ShipFactory from '../ship';

const GameBoardFactory = function () {
	const shipArrayBoard = [];
	const missedShots = [];
	function placeShip(coordinates) {
		const shipObj = ShipFactory(coordinates);
		shipArrayBoard.push(shipObj);
	}
	function receiveAttack(hitCoords) {
		let hitFlag = 0;
		let repeatedMovedFlag = 0;

		shipArrayBoard.map((ship) => {
			const shipCoords = ship.coordinates;

			return shipCoords.map((shipCoord, index) => {		
					//for (let i = 0; i < shipCoord.length; ++i) {
						if (shipCoord === hitCoords && ship.shipArray[index] === 'hit') {
							// Cannot hit the same coordinate
							return repeatedMovedFlag = 1;
						} else if (shipCoord === hitCoords) {
							// We got a hit!
							ship.hit(hitCoords);
							return hitFlag = 1;
						}
					//}
			});
		});

		if (repeatedMovedFlag === 1) {
			// Cannot hit the same coordinate
			return 'Cannot Hit Same Coordinate';
		}

		if (hitFlag === 0) {
			// We missed
			missedShots.push(hitCoords);
		}
	}
	function reportSunkShips() {
		const shipStatusArray = [];
		shipArrayBoard.map((ship) => {
			shipStatusArray.push(ship.isSunk());
		});
		return shipStatusArray.every((shipStatus) => shipStatus === true);
	}
	function calculateShipPlacement(shipLength, shipCoordinate, rotateFlag) {
		const coord1 = shipCoordinate;
		const placementCoordinates = [];
		let coord = [];
		let coordChange;
		let coordSame;

		// if (rotateFlag) {
		// 	coordSame = coord2;
		// 	coordChange = coord1;
		// } else {
			coordSame = coord1;
			coordSame = Number(coordSame);
		// 	coordChange = coord2;
		// }

		for (let i = 0; i < shipLength; i++) {
			// if (rotateFlag) {
			// 	coord.push(coordChange);
			//	coord.push(coordSame);
			// } else {
			// 	coord.push(coordSame);
			// 	coord.push(coordChange);
			// }

			placementCoordinates.push(coordSame);
			//coord = [];
			coordSame += 1;
		}

		return placementCoordinates;
	}
	function checkShipSetUpPlacement(coord1, coord2, rotateFlag) {
		for (let i = 0; i < shipArrayBoard.length; i++) {
			const shipCoordinates = shipArrayBoard[i].coordinates;

			for (let j = 0; j < shipCoordinates.length; j++) {
				const coord1Check = shipCoordinates[j];
				//const coord2Check = shipCoordinates[j][1];
				//&& coord2Check === coord2
				if (coord1Check == coord1) {
					return true;
				}
			}
		}

		return false;
	}
	function checkValidPositions(coord1, shipLength, rotateFlag) {
		let spaceShipWillTakeOnGrid;
		let tempCoord1 = coord1;
		while (tempCoord1 < 50) {
			if ((tempCoord1 == 0) || (tempCoord1 == 1) || (tempCoord1 == 2) || (tempCoord1 == 3) || (tempCoord1 == 4) || (tempCoord1 == 5) || (tempCoord1 == 6)) {
				break;
			} else {
				tempCoord1 = tempCoord1 - 7;
			}
		}
		// if (rotateFlag) {
		 	spaceShipWillTakeOnGrid = Number(tempCoord1) + Number(shipLength);
		// } else {
		// 	spaceShipWillTakeOnGrid = coord2 + shipLength;
		// }

		const canShipBePlacedThere = checkShipSetUpPlacement(coord1, rotateFlag);
			if (spaceShipWillTakeOnGrid <= 7 && !canShipBePlacedThere) {
				return true;
			}
		return false;
	}
	return {
		placeShip,
		receiveAttack,
		reportSunkShips,
		shipArrayBoard,
		missedShots,
		calculateShipPlacement,
		checkValidPositions
	};
};

export default GameBoardFactory;