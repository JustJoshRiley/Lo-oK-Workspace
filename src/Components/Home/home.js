import React, { useState } from "react";
import NavBar from "../Navbar/navbar";
import './home.css'
import WorkspaceColumn from "./workspaceColumn/workspaceColumn";
import CategoryColumn from "./categoryColumn/categoryColumn";
import Cookies from "universal-cookie";
import LinkColumn from "./linkColumn/linkColumn";
import ChatColumn from "./chatColumn/chatColumn";
import { NavLink } from 'react-router-dom';



function Home() {
    const cookies = new Cookies();
    // make a state variable to hold an active workspace id
    const [activeWorkspaceId, setActiveWorkspaceId] = useState();
    const [activeCategoryId, setActiveCategoryId] = useState();

    console.log(activeWorkspaceId)
    console.log(activeCategoryId)

    return (
        <>
        <NavBar />
        
        <div id="Parent-Container">
            <div id="Welcome-Container">
                <h1>Welcome <a id="Welcome-Container-Username">{cookies.get("username")}</a> 🥳</h1>
            </div>
            
            <div id="Home-Container">
                <div id="Workspace-Column">
                    <WorkspaceColumn setActiveCategoryId={setActiveCategoryId} setActiveWorkspaceId={setActiveWorkspaceId}/>
                </div>
                
                <div id="Content-Container">

                    {/* pass that active workspace id variable as a prop to Category Column */}
                    <CategoryColumn setActiveCategoryId={setActiveCategoryId} activeWorkspaceId={activeWorkspaceId}/>

                    <LinkColumn activeCategoryId={activeCategoryId} />
                    
                    <div id="Mobile-Chat-Container">
                        <NavLink  
                        to="/ChatMobile"
                        state={activeWorkspaceId}
                        >
                            <button id="Mobile-Chat-Button">CHAT</button>
                        </NavLink>
                        
                    </div>
                    
                    <ChatColumn id="Chat-Id-Column" activeWorkspaceId={activeWorkspaceId} />

                </div>
            </div>
        </div>
        </>
    )
}

export default Home;