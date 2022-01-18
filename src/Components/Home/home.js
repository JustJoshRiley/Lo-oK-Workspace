import React, { useState } from "react";
import NavBar from "../Navbar/navbar";
import './home.css'
import WorkspaceColumn from "./workspaceColumn/workspaceColumn";
import CategoryColumn from "./categoryColumn/categoryColumn";
import Cookies from "universal-cookie";
import LinkColumn from "./linkColumn/linkColumn";
import ChatColumn from "./chatColumn/chatColumn";



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
            <div id="WelcomeContainer">
                <h1>Welcome {cookies.get("username")} 🥳</h1>
            </div>
            
            <div id="Home-Container">
                <div id="WorkspaceColumn">
                    <WorkspaceColumn setActiveCategoryId={setActiveCategoryId} setActiveWorkspaceId={setActiveWorkspaceId}/>
                </div>
                
                <div id="ContentContainer">

                    {/* pass that active workspace id variable as a prop to Category Column */}
                    <CategoryColumn setActiveCategoryId={setActiveCategoryId} activeWorkspaceId={activeWorkspaceId}/>

                    <LinkColumn activeCategoryId={activeCategoryId} />
                    
                    <ChatColumn activeWorkspaceId={activeWorkspaceId} />

                </div>

            </div>
        </div>
        </>
    )
}

export default Home;