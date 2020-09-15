import React, { useEffect, useState } from 'react';

import NavBar from '../../components/Navbar';
import {
    useLocation
  } from "react-router-dom";






import ControledForm from '../../components/ControledForm';

const Login = () => {

    let location = useLocation();
    let { from }:any = location.state || { from: { pathname: "/" } };


    const alert = from.pathname === '/favourites';
    
    const [notification, setNotification] = useState('show');


    useEffect(() => {
        if(notification==='show'){
            setTimeout(() => {
                setNotification('hide');
                setTimeout(() => {
                    setNotification('');
                }, 600);
            }, 2000);
        }
    }, []);
    

    return (

        <div className="Login Has-NavBar-container">
            <NavBar showSearch={false} />
            <ControledForm type="Log in" title="Enter your account"/>
            {alert && <div className="notification-container" id="notification-container">
                <div className={`notification notification-danger ${notification}`}>
                    <strong>Error : </strong> You must LOG IN to view {from.pathname}.
	            </div>
            </div>}
        </div>
    )
}

export default Login
