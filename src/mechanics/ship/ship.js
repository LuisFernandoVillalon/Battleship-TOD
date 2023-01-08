const shipFactory = function (coordinates) {
    const shipArray = [];

    //adds the location of the ship into an array
    coordinates.map((coordinate) => {
        return shipArray.push(coordinate);
    });

    //updates the array with ships, when hit
    function hit(hitIndex) {
        for (let i = 0; i < shipArray.length; ++i) {
            if (shipArray[i] === hitIndex) {
                shipArray[i] = 'hit';
            }
        }
    }

    //notifies when all the ships have sunk
    function isSunk() {
    const ans =  shipArray.every((shipPart) => 
            shipPart == 'hit'
        );
        return ans;
    }

    return {
        hit,
        isSunk,
        coordinates,
        shipArray
    };
}

export default shipFactory;