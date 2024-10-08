import React from "react";

const Line = ({ guess, solution, isFinal, isGameOver, index }) => {
    const WORD_LENGTH = 5;
    const tiles = [];
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = guess ? guess[i] : null;
        let tileClass = "char text-uppercase shadow-sm";
        console.log(guess);
        if (isFinal && guess?.length === 5) {
            if (solution[i] === tile)
                tileClass += " bg-success updatedChar putChar";
            else if (solution.includes(tile))
                tileClass += " bg-warning updatedChar putChar";
            else tileClass += " bg-dark-subtle updatedChar putChar";
        } else {
            if (tile?.length > 0) tileClass += " putChar";
        }

        tiles.push(
            <div className={tileClass} key={i}>
                {tile}
            </div>
        );
    }

    return (
        <>
            <div className="guess d-flex justify-content-center">{tiles}</div>
        </>
    );
};

export default Line;
