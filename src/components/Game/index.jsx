import React, { useEffect, useState } from "react";
import Line from "../Line";
import data from "./words.json";
import Message from "../Messages/index.jsx";
import Win from "../Messages/WinModal/index.jsx";
import InterActiveAlert from "../Messages/WinModal/index.jsx";

let solution = data[Math.floor(Math.random() * data.length)].toLowerCase();
const Game = () => {
    const [guesses, setGuesses] = useState(Array(6).fill(""));
    const [currentGuess, setCurrentGuess] = useState("");
    const [isFinal, setIsFinal] = useState(false);
    const [isIWon, setIsIWon] = useState(0); // -1 lose 0 playing 1 win
    const [message, setMessage] = useState(false);

    const playAgain = () => {
        setGuesses(Array(6).fill(""));
        setCurrentGuess("");
        setIsFinal(false);
        setIsIWon(0);
        setMessage(false);
        solution = data[Math.floor(Math.random() * data.length)].toLowerCase();
    };

    const checkGameStatus = () => {
        for (let i = 0; i < 6; i++) {
            if (guesses[i] === solution) {
                setIsIWon(1); //won
                return;
            }
            if (guesses[i] === "") {
                setIsIWon(0); //playing
                return;
            }
        }
        setIsIWon(-1); //lost
    };

    useEffect(() => {
        checkGameStatus();
    }, [guesses]);

    useEffect(() => {
        // console.log(solution);
        const handleType = (event) => {
            // if (isIWon === 1) return; no need for it now because of our modal

            if (event.key === "Backspace") {
                //to handle backspace
                setCurrentGuess(currentGuess?.slice(0, -1));
                return;
            }

            if (currentGuess?.length === 5 && event.key !== "Enter") return;

            if (event.key === "Enter") {
                if (currentGuess?.length === 5) {
                    //deep copy
                    let newGuesses = [...guesses];
                    //edit
                    newGuesses[guesses.findIndex((value) => value === "")] =
                        currentGuess;
                    //set
                    setGuesses(newGuesses);
                    setIsFinal(true);
                    setCurrentGuess("");
                } else setMessage(true);
                return;
            }
            if (!event.key.match(/^[a-zA-Z]{1}$/)) return; // to enter characters only {After Enter}
            setCurrentGuess(currentGuess + event.key.toLowerCase());
            setIsFinal(false);
        };

        window.addEventListener("keydown", handleType);
        return () => {
            window.removeEventListener("keydown", handleType);
        };
    }, [currentGuess, guesses, isIWon]);

    return (
        <div className="container vh-100 d-flex justify-content-center ">
            <div className="board mt-5 pt-5 heightFitContnet position-relative">
                {guesses.map((guess, i) => {
                    const currentIndex = guesses.findIndex(
                        (value) => value === ""
                    );
                    return i === currentIndex ? (
                        <Line
                            guess={currentGuess}
                            solution={solution}
                            isFinal={isFinal}
                            key={i}
                            index={i}
                            isGameOver={isIWon}
                        />
                    ) : (
                        <Line
                            guess={guess}
                            solution={solution}
                            isFinal={true}
                            key={i}
                            index={i}
                            isGameOver={isIWon}
                        />
                    );
                })}
                {message && (
                    <Message message={message} setMessage={setMessage} />
                )}
                {isIWon !== 0 && (
                    <InterActiveAlert
                        playAgain={playAgain}
                        isIWon={isIWon}
                        setIsIWon={setIsIWon}
                        solution={solution}
                    />
                )}
            </div>
        </div>
    );
};

export default Game;
