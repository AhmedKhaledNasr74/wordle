import React from "react";

const Line = ({ guess, solution, isFinal, isGameOver, index }) => {
    const WORD_LENGTH = 5;
    const tiles = [];
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = guess ? guess[i] : "";
        let tileClass = "char text-uppercase shadow-sm";

        if (isFinal && guess?.length === 5) {
            if (solution[i] === tile) tileClass += " bg-success updatedChar";
            else if (solution.includes(tile))
                tileClass += " bg-warning updatedChar";
            else tileClass += " bg-dark-subtle updatedChar";
        }

        tiles.push(
            <input
                type="text"
                className={tileClass}
                key={i}
                defaultValue={tile}
                maxLength={1}
            />
        );
    }

    return (
        <>
            <div className="guess d-flex justify-content-center">{tiles}</div>
        </>
    );
};

export default Line;
