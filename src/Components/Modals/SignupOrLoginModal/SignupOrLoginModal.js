import React from "react";
import LoginUserModal from '../LoginModal/LoginModal';
import SignUpModal from '../SignUpModal/SignUpModal';



function SignUpOrLogInModal(props){

    const [LoginModalShow, setLoginModalShow] = React.useState(false);

    const [SignUpModalShow, setSignUpModalShow] = React.useState(false);

    const LoginUserModelOnHide = () => {
        props.onHide()
        setLoginModalShow(false)
    }

    const SignUpUserModalOnHide = () => {
        props.onHide()
        setSignUpModalShow(false)
    }

    const HideLoginAndShowSignup = () => {
        setLoginModalShow(false)
        setSignUpModalShow(true)
    }

    const HideSignupShowLogin = () => {
        setLoginModalShow(true)
        setSignUpModalShow(false)
    }

    if (props.show){
        if (LoginModalShow === false && SignUpModalShow === false) {
            setLoginModalShow(true)
        }
    return(
        <>
        <LoginUserModal show={LoginModalShow} onHide={LoginUserModelOnHide} click={() => setSignUpModalShow(true)} hideLoginAndShowSignup={HideLoginAndShowSignup}/>

        <SignUpModal show={SignUpModalShow} onHide={SignUpUserModalOnHide} click={() => setLoginModalShow(true)} hideSignupShowLogin={HideSignupShowLogin}/>
        </>
    )
    }else{
        return <></>
    }
}
export default SignUpOrLogInModal;