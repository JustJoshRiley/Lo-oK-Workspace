import React from "react";
import './chat.css';

function ChatMessage(props) {
    let { message, username, sent } = props
    let header = {justifyContent: 'flex-end'}
    let container = {}
    if (sent === true) {
        header = {
            justifyContent: 'flex-end',
            color : "#c9639b",
            fontWeight : "bold",
        }
        container = {
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px"
        }
    } else {
        header = {
            justifyContent: 'flex-start',
            fontWeight : "lighter",
        }
        container = {
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0"
        }
    }

    return (
        <div id="ChatContainerCard" style={container}>
            <h6 id="username" style={header}>{username}</h6>
            <h5 id="message" >{message}</h5>
        </div>
    )
}
export default ChatMessage;