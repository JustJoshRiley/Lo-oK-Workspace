import React from "react";
import './chat.css';

function ChatMessage(props) {
    const { message } = props

    return (
        <div id="ChatContainerCard">
            <h6>{message}</h6>
        </div>
    )
}
export default ChatMessage;