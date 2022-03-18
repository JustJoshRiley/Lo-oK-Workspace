import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ChatColumn from "../Home/chatColumn/chatColumn";
import './ChatMobile.css'

function ChatMobile() {

    let location = useLocation();
    console.log(location);
    let activeWorkspaceId = location.state
    console.log(activeWorkspaceId)
    return (
        <div id="ChatColumnContainer">
            <NavLink
            to="/Home"
            >
                <button id="ChatBackButton">Back</button>
            </NavLink>
            <ChatColumn activeWorkspaceId={activeWorkspaceId} />
        </div>
    )
}

export default ChatMobile