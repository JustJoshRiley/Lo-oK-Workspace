import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'universal-cookie';

function AddWorkspaceModal(props) {
    const [workspaceName, setWorkspaceName] = useState()
    const [workspaceHashtag, setWorkspaceHashtag] = useState()

    

    return (
        <Modal
        {...props}
        centered
        >
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>
                    Create a Workspace
                </Modal.Title>
            </Modal.Header>
            <form>
                <Modal.Body>
                        <label for="workspace_name">Workspace Name:
                            <input onChange={e => setWorkspaceName(e.target.value)} value={workspaceName}  id="workspace_name" name="workspace_name" type="text" required aria_required="true"/>
                        </label>
                        <label for="workspace_hashtag">Workspace Hashtag:
                            <input onChange={e => setWorkspaceHashtag(e.target.value)}  value={workspaceHashtag}  id="workspace_hashtag" name="workspace_hashtag" type="text" required aria_required="true"/>
                        </label>
                </Modal.Body>
                <Modal.Footer>
                    <button
                    onClick={async (event) => {
                        event.preventDefault();

                        const cookies = new Cookies();
                        const username_from_cookies = cookies.get('username')
                        const user_id_from_cookies = cookies.get('user_id')
                        
                        const new_workspace = {
                            "name" : workspaceName, 
                            "hashtag" : workspaceHashtag, 
                            "username" : username_from_cookies, 
                            "user_id" : user_id_from_cookies};
                        const response = await fetch("/add_new_workspace", {
                            method : "POST",
                            headers: {
                                'Content-Type' : 'application/json'
                            },
                            redirect: 'manual',
                            body: JSON.stringify(new_workspace)
                        })
                        .then((response) => {
                            response.json()
                            .then(data => {
                                if (data["response"] === true) {
                                    console.log(data)
                                    alert("Already exists by that name")
                                } else {
                                    console.log(data)
                                    props.onHide()
                                }
                            })
                        })
                        .then(() => {
                            return props.getAllWorkspaces()
                        })
                        .catch((error) => {
                            alert(error)
                        });
                    }}>Submit!</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
export default AddWorkspaceModal;