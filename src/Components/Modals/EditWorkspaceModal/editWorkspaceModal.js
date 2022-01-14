import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {BsTrash} from 'react-icons/bs'

import '../../Modals/Modal.css';

function EditWorkspaceModal(props) {
    const [invitedEmail, setInvitedEmail] = useState();

    return (
        <>
            <Modal
            {...props}
            centered
            dialogClassName="modal"
            >
                <Modal.Header className='modal-header' closeButton closeVariant='white'>
                    <Modal.Title>
                        Edit Workspace
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body dialogClassName="modal-body">
                    <form className='form'>
                        <h6>Invite Users Via Email</h6>
                        <label className='label' for="UserInviteEmail">Email :</label>
                        <input onChange={e => setInvitedEmail(e.target.value)} value={invitedEmail} name='UserInviteEmail' type="email" className='input'/>
                        <button className='button'
                            onClick={async (event) => {
                                event.preventDefault();
                                const new_user_invite = {"email" : invitedEmail, "workspace_id" : props.activeWorkspaceId}
                                // console.log(new_user_invite["workspace_id"])
                                const response = await fetch('/invite_user_to_workspace', {
                                    method : "POST",
                                    headers: {
                                        'Content-Type' : 'application/json'
                                    },
                                    redirect: 'manual',
                                    body: JSON.stringify(new_user_invite)
                                })
                                .then((response) => {
                                    response.json()
                                    .then(data => {
                                        if(data["response"] === false) {
                                            alert("user has not created an account")
                                        }
                                    })
                                })
                            }}
                        >Send!</button>
                    </form>
                </Modal.Body>
                <Modal.Footer dialogClassName="modal-footer">
                    <BsTrash
                        onClick={async (event) => {
                            event.preventDefault();
                            const workspaceId = props.activeWorkspaceId
                            const response = await fetch('/delete_workspace_by_id', {
                                method : "POST",
                                headers: {
                                    'Content-Type' : 'application/json'
                                },
                                redirect: 'manual',
                                body: JSON.stringify(workspaceId)
                            })
                            .then((response => {
                                response.json()
                                props.onHide()
                            }))
                        }}/>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default EditWorkspaceModal;