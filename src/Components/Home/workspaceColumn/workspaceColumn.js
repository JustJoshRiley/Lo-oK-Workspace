import React, {useEffect, useState} from "react";
import { BiBookAdd } from "react-icons/bi";
import './workspaceColumn.css';
import AddWorkspaceModal from "../../Modals/AddWorkspaceModal/addWorkspaceModal";
import WorkspaceCard from "../../Cards/WorkspaceCard/workspaceCard";
import Cookies from "universal-cookie";

function WorkspaceColumn(props) {
    const [workspceModalShow, setWorkspaceModalShow] = useState(false);

    const [allWorkspaces, setAllWorkspaces] = useState();
    
    const cookies = new Cookies();
    const user_id_from_cookies = cookies.get('user_id')


    const getAllWorkspaces = async () => {
        const allWorkspacesResponse = await fetch("/get_all_workspaces_for_user", {
            method : "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            redirect: 'manual',
            body: JSON.stringify(user_id_from_cookies)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            return data.map((workspace) => {
                const {_id, name, hashtag} = workspace
                return (
                    // pass setActiveWsId as a prop here
                    <WorkspaceCard 
                        name={name} 
                        hashtag={hashtag}
                        workspaceId={_id}
                        setActiveWorkspaceId={props.setActiveWorkspaceId}
                        setActiveCategoryId={props.setActiveCategoryId}
                    />
                )
            })
        }).then((mappedData) => {
            setAllWorkspaces(mappedData)
        })
    }
    useEffect(() => {
        if (!allWorkspaces) {
            getAllWorkspaces();
        }
        //set up timer
        const getWorkspacesTimer = setInterval(getAllWorkspaces, 1000)

        // return a function that cleans up your timer
        return () => {
            clearInterval(getWorkspacesTimer)
        }
    }, []);



    return (
        <div id="Workspace">
            <AddWorkspaceModal getAllWorkspaces={() => getAllWorkspaces()} show={workspceModalShow} onHide={() => setWorkspaceModalShow(false)} />
            <div id="Workspace-Header">
                <div id="Workspace-Header-Content">
                    Workspaces
                    <BiBookAdd id="add" className="add_workspace_button" onClick={() => setWorkspaceModalShow(true)} />
                </div>
            </div>
            <div id="Workspace-Container">
                {allWorkspaces}
            </div>
        </div>
    )
}
export default WorkspaceColumn;