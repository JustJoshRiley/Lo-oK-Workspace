import React from "react";
import {BsThreeDots} from 'react-icons/bs'
import EditWorkspaceModal from "../../Modals/EditWorkspaceModal/editWorkspaceModal";

import './workspaceCard.css';


function WorkspaceCard(props) {
    const { name, hashtag, workspaceId} = props
    const [EditWorkspaceModalShow, setEditWorkspaceModalShow] = React.useState(false);

    return (
        <>
            <EditWorkspaceModal activeWorkspaceId={workspaceId}  show={EditWorkspaceModalShow} onHide={() => setEditWorkspaceModalShow(false)} />
            <div id="WorkspaceCardContainer">
                <div id="WorkspaceCardContent" 
                    onClick={async (event) => {
                        event.preventDefault()
                        props.setActiveCategoryId(null)
                        props.setActiveWorkspaceId(workspaceId)
                        }} >
                    <h3 id="WorkspaceName">{name}</h3>
                    <h6 id="WorkspaceHashtag">#{hashtag}</h6>
                </div>
                <div id="WorkspaceEditButton">
                    <BsThreeDots onClick={() => setEditWorkspaceModalShow(true)}/>
                </div>
            </div>
        </>
    )
}

export default WorkspaceCard;