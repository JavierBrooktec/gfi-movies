import React from 'react'
import NavBar from '../../components/Navbar';



import ControledForm from '../../components/ControledForm';

const SignUp = () => {
    return (
        <div className="SignUp Has-NavBar-container">
            <NavBar showSearch={false} />
            <ControledForm type="Sign up" title="Create account"/>
        </div>
    )
}

export default SignUp
