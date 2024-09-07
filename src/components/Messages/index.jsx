import React, { useRef } from "react";
import { Modal, Toast } from "react-bootstrap";
const Message = ({ message, setMessage }) => {
    return (
        <Toast
            onClose={() => setMessage(false)}
            show={message}
            delay={1000}
            autohide
            className="message"
        >
            <Toast.Body>Too Short</Toast.Body>
        </Toast>
    );
};

export default Message;
