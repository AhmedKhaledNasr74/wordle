import React from "react";
import { Button, Modal } from "react-bootstrap";

const InterActiveAlert = ({ playAgain, isIWon, setIsIWon, solution }) => {
    return (
        <Modal
            show={isIWon}
            onHide={() => setIsIWon(false)}
            backdrop="static"
            keyboard={false}
            centered
            size="sm"
        >
            <Modal.Body className="text-center">
                <p className="fs-4 fw-bold">
                    {isIWon === 1 ? (
                        "You Won!"
                    ) : (
                        <p>
                            You lost, the word was
                            <span className="text-primary-emphasis text-uppercase d-block fw-bold fs-3">
                                {`[ ${solution} ]`}
                            </span>
                        </p>
                    )}
                </p>

                <Button variant="success" onClick={playAgain}>
                    Play Again
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default InterActiveAlert;
