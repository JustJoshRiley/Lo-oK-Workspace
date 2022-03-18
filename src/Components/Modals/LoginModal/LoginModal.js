import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import '../../Modals/Modal.css';

import { sha512 } from 'js-sha512';

function LoginUserModal(props) {
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
                <Modal.Header className='modal-header' closeButton closeVariant='black'>
                    <Modal.Title>
                        Sign In
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body dialogClassName="modal-body">
                    <form className='form'>
                        <label className='label' for="email">Email:</label>
                        <input onChange={e => setEmail(e.target.value)} value={email} className='input' id="email" name="email" type="email" required aria_required="true"/>

                        <label className='label' for="password">Password:</label>
                        <input onChange={e => setPassword(e.target.value)} value={password} className='input' id="password" name="password" type="password" required aria_required="true"/>

                        <button className='button' 
                        onClick={async (event) => {
                            event.preventDefault();
                            var hash = sha512.create();
                            hash.update(password);
                            const returning_user = { "email" : email, "password" : hash.hex()};
                            console.log(returning_user);
                            const front_end_response = await fetch("/login_user", {
                                method : "POST",
                                headers : {
                                    'Content-Type' : 'application/json'
                                },
                                redirect: 'manual',
                                body: JSON.stringify(returning_user)
                            })
                            .then((response) => {
                                response.json()
                                .then(data => {
                                    if (data["response"] === false) {
                                        alert("User email does not exist")
                                    } else {
                                        console.log(data)
                                        const cookies = new Cookies();
                                        cookies.set('username', data["username"], {path : '/'})
                                        cookies.set('email', data["email"], {path : '/'})
                                        cookies.set('user_id', data["_id"], {path : '/'})
                                        setRedirectUser(true)
                                        console.log(data)
                                        props.onHide()
                                    }
                                })
                            })
                            .catch((error) => {
                                alert(error)
                            });
                        }}>Sign In</button>
                    </form>
                </Modal.Body>
                <Modal.Footer dialogClassName="modal-footer">
                    <div className='footer-content'>
                        <p>Don't Have An Account? <a className='button' onClick={props.hideLoginAndShowSignup} >Sign Up</a>  </p>
                        
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default LoginUserModal;