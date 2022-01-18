import React from "react";
import './navbar.css';
import { MdOutlineAccountCircle } from 'react-icons/md';

import { NavLink } from 'react-router-dom';

import SignUpOrLogInModal from "../Modals/SignupOrLoginModal/SignupOrLoginModal";

function NavBar() {
    const [SignUpOrLogInModalShow, setSignUpOrLogInModalShow] = React.useState(false);

    return (
        <div id="Navbar-Container">
            <SignUpOrLogInModal show={SignUpOrLogInModalShow} onHide={() => setSignUpOrLogInModalShow(false)}/>

            <div id="NAVColumn1" className="Navbar-Brand">
            <NavLink className="Link" to="/">
                <h1>( Lo-oK )</h1>
            </NavLink>
            </div>

            <div id="NAVColumn2">
                <form className="Form-Container-Nav">
                    <input placeholder="Search" type="text"/>
                    <button type="submit">Search</button>
                </form>
            </div>

            <div id="NAVColumn3" className="Home">
                {/* <NavLink className="Link" to="/Home"> */}
                <button onClick={() => setSignUpOrLogInModalShow(true)}>
                    <MdOutlineAccountCircle  className="button" />
                </button>
                {/* </NavLink> */}
            </div>

        </div>

    )
}

export default NavBar;