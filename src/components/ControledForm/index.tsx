import React, { useContext } from 'react';
import { LogedContext } from '../../App';


import useInput from '../../hooks/useInput';

import {
    useHistory,
    useLocation
  } from "react-router-dom";

import './ControledForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faLock,
} from '@fortawesome/free-solid-svg-icons';

import { logIn, signUp } from '../../helpers';

import {
    NavLink
} from "react-router-dom";


export type ControledFromProps = {
    title: string,
    type: string,

}

const ControledFrom = ({ title, type }: ControledFromProps) => {

    const [userName, setUserName ] = useInput();
    const [password, setPassword] = useInput();

    


    let history = useHistory();

    let location = useLocation();
    let { from }:any = location.state || { from: { pathname: "/" } };



    const {  setUser, setLogged } = useContext(LogedContext);


    let formCopy = '';
    let formCopyValue = '';
    let formLink = '';
    let callback;
    switch (type) {
        case 'Log in':
            formCopy = 'Do not have an account?';
            formCopyValue = 'Sign up';
            formLink = 'signUp';
            callback = logIn;
            break;
        case 'Sign up':
            formCopy = 'Already have an account?';
            formCopyValue = 'Login';
            formLink = 'login';
            callback = signUp;
            break;
        default:
            break;
    }


    const handleSubmit = (e:React.MouseEvent) => {
        e.preventDefault();
        const [result, log] = callback(userName, password);

        console.log(result, log);
        

        if(result){
            setUser(userName);
            setLogged(true);
            history.replace(from);

        } else {
            console.log(log);
        }
    }
    return (

        <div className="ControledForm">
            <form className="login">
                <header>{title}</header>
                <div className="field"><FontAwesomeIcon icon={faUser} /><input type="text" placeholder="User Name" value={userName} onChange={setUserName} /></div>
                <div className="field"><FontAwesomeIcon icon={faLock} /><input type="password" placeholder="Password" value={password} onChange={setPassword} /></div>
                <input type="submit" className="submit" value={type} onClick={handleSubmit} />
                <span className="login-form-copy">{formCopy}<NavLink exact={true} to={`/${formLink}`}>  {formCopyValue}</NavLink>  </span>
            </form>
        </div>

    )
}

export default ControledFrom;
