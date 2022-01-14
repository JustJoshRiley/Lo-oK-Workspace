import React, {useEffect, useState} from 'react';
import ChatMessage from '../../Cards/Chat/chat';
import './chatColumn.css';

function ChatColumn(props) {
    const [userMessage, setUserMessage] = useState();
    const [allChatMessages, setAllChatMessages] = useState();

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
                const {message} = chatMessage
                return (
                    <ChatMessage
                        message={message}
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
        <div id='chat'>
            <div id='chatHeader'>
                <p>CHAT</p>
            </div>
            <div id='chat-content-and-form'>

                <div id='chatContent'>
                    {allChatMessages}
                </div>

                <div id='chat-form-container'>

                    <form id='chat-form'>

                        <label for="message">
                            <input onChange={e => setUserMessage(e.target.value)} value={userMessage} id='chat-form-input' placeholder="What's on your Mind" name='message' type="text" />
                        </label>

                        <button
                        onClick={async (event) => {
                            event.preventDefault();
                            const newUserMessage = {
                                "message" : userMessage,
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