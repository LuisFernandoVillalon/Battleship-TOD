const shipFactory = function (coordinates) {
    const shipArray = [];

    coordinates.map((coordinate) => {
        return shipArray.push(coordinate);
    });

    function hit(hitIndex) {
        for (let i = 0; i < shipArray.length; ++i) {
            if (shipArray[i] === hitIndex) {
                shipArray[i] = 'hit';
            }
        }
    }

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