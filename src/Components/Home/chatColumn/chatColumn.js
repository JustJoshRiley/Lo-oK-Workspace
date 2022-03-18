import React, {useEffect, useState} from 'react';
import ChatMessage from '../../Cards/Chat/chat';
import './chatColumn.css';
import Cookies from "universal-cookie";


function ChatColumn(props) {
    const [userMessage, setUserMessage] = useState();
    const [allChatMessages, setAllChatMessages] = useState();

    const cookies = new Cookies();
    const user_id_from_cookies = cookies.get('user_id')
    const username_from_cookies = cookies.get("username")
    
    const getAllChatMessagesFromWorkspace = async () => {
        const allChatsResponse = await fetch('/get_all_messages_for_workspace', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            redirect: 'manual',
            body : JSON.stringify(props.activeWorkspaceId)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            return data.map((chatMessage) => {
                let sent = false
                let {message, username} = chatMessage
                if (username === username_from_cookies) {
                    sent = true
                }
                return (
                    <ChatMessage
                        message={message}
                        username={username}
                        sent={sent}
                    />
                )
            })
        }).then((mappedData) => {
            setAllChatMessages(mappedData)
        })
    }
    useEffect(() => {
        getAllChatMessagesFromWorkspace();

        const getChatMessagesTimer = setInterval(getAllChatMessagesFromWorkspace, 1000)

        return () => {
            clearInterval(getChatMessagesTimer)
        }
    }, [props]);

    return (
        <div id='Chat'>
            <div id='Chat-Header'>
                <p>Chat</p>
            </div>
            <div id='Chat-Content-And-Form'>
                <div id='Chat-Content'>
                    {allChatMessages}
                </div>
                <div id='Chat-Form-Container'>
                    <form id='chat-form'>
                        <label for="message">
                            <input onChange={e => setUserMessage(e.target.value)} value={userMessage} id='chat-form-input' placeholder="What's on your Mind" name='message' type="text" />
                        </label>
                        <button
                        onClick={async (event) => {
                            event.preventDefault();
                            const newUserMessage = {
                                "message" : userMessage,
                                "user_id": user_id_from_cookies,
                                "workspace_id" : props.activeWorkspaceId
                            };
                            console.log(newUserMessage)
                            const response = await fetch('/add_new_message', {
                                method : "POST",
                                headers : {
                                    'Content-Type' : 'application/json'
                                },
                                redirect: 'manual',
                                body: JSON.stringify(newUserMessage)
                            })
                            .then(() => {
                                return getAllChatMessagesFromWorkspace()
                            })
                            .catch((error) => {
                                alert(error)
                            })
                        }}
                        >Send!</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ChatColumn;