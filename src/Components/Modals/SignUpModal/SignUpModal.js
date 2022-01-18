import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import '../../Modals/Modal.css';

function SignUpModal(props) {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [redirectUser, setRedirectUser] = useState();


    if (redirectUser) {
        const cookies = new Cookies();
        console.log(cookies.get('username'))
        return <Navigate to='/Home'/>;
    }

    return (
        <>
            <Modal
            {...props}
            centered
            dialogClassName="modal"

            >
                <Modal.Header dialogClassName="modal-header"  closeButton closeVariant='white'>
                    <Modal.Title>
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body dialogClassName="modal-body">
                    <div className='form-container'>
                        <form className='form'>
                            <label className='label' for="username">Username:</label>
                            <input onChange={e => setUsername(e.target.value)} value={username} className='input' id="username" name="username" type="text" required aria_required="true"/>
                            
                            <label className='label' for="email">Email:</label>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='input' id="email" name="email" type="email" required aria_required="true"/>
                            
                            <label className='label' for="password">Password:</label>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='input' id="password" name="password" type="password" required aria_required="true"/>
                            
                            <button className='button'
                                onClick={async (event) => {
                                    event.preventDefault();
                                    const new_user = { "username" : username, "email" : email, "password" : password };
                                    const response = await fetch("/signup_user", {
                                        method : "POST",
                                        headers: {
                                            'Content-Type' : 'application/json'
                                        },
                                        redirect: 'manual',
                                        body: JSON.stringify(new_user)
                                    })
                                    .then((response) => {
                                        response.json()
                                        .then(data => {
                                            if (data["response"] === "True") {
                                                props.hideSignupShowLogin()
                                            } else {
                                                // set username to cookie, remember to also send the user id
                                                const cookies = new Cookies();
                                                cookies.set('username', data["username"], {path : '/'})
                                                cookies.set("email", data["email"], {path: '/'})
                                                cookies.set('user_id', data["_id"], {path : '/'})
                                                // route to homepage
                                                setRedirectUser(true)
                                                console.log("lmao2")
                                                props.onHide()
                                            }
                                        })
                                    })
                                    .catch((error) => {
                                        alert(error)
                                    });
                                }}>Sign Up</button>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer dialogClassName="modal-footer">
                    <div className='footer-content'>
                        <p>Have An Account? <a className='button' onClick={props.hideSignupShowLogin}>Sign In</a> </p>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default SignUpModal;