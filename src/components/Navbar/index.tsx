import React, { useContext } from 'react';
import { LogedContext } from '../../App';


import useToggle from '../../hooks/useToggle';
import useInput from '../../hooks/useInput';

import {logOut} from '../../helpers'

import {
    NavLink
} from "react-router-dom";

import {
    useHistory
  } from "react-router-dom";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilm,
    faBars,
    faSearch,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

import './Navbar.scss'

export type NavBarProps = {
    search?: any,
    lengthSearch?: number,
    showSearch?: boolean,

}

const NavBar = ({ search, lengthSearch = 0, showSearch = true }: NavBarProps) => {


    const { logged, setLogged } = useContext(LogedContext);

    const [showLinks, toggleShowLinks] = useToggle();

    const [title, setInputTitle, handleEnterTitle] = useInput('', search);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e);
        if (e.target.value.length >= lengthSearch) {
            search(e.target.value);
        }
    }

    const handleClickSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        search(title);
    }

    const handleLogOut = () => {

        logOut();
        setLogged(false);

        
        history.replace('/');
    }

    let history = useHistory();

    return (
        <nav className="Navbar menu-parent">
            <div className="Navbar-container">
                <NavLink className="home-button" to="/" exact={true}>
                    <FontAwesomeIcon icon={faFilm} />
                </NavLink>


                {showSearch && <form className="form">
                    <input type="search" autoFocus placeholder="Search..." aria-label="Search" value={title} onChange={handleChangeInput} onKeyDown={handleEnterTitle} />
                    <button className="search" type="submit" onClick={handleClickSubmit}><FontAwesomeIcon icon={faSearch} /></button>
                </form>}


                <button className="menu-button" type="button" onClick={toggleShowLinks}>
                    {showLinks ? <FontAwesomeIcon icon={faTimes} /> :
                        < FontAwesomeIcon icon={faBars} />}
                </button>
                <ul className={`menu ${showLinks ? 'toggled' : ''}`}>
                    <li className="link">
                        <NavLink exact={true} activeClassName="is-active" to="/">Home</NavLink>
                    </li>
                    <li className="link">
                        <NavLink exact={true} activeClassName="is-active" to="/favourites">Favourites</NavLink>
                    </li>
                    {!logged && <li className="link">
                        <NavLink exact={true} activeClassName="is-active-no-display" to="/SignUp">Sign up</NavLink>
                    </li>}
                    {!logged ? <li className="link">
                        <NavLink exact={true} activeClassName="is-active-no-display" to="/login">Login</NavLink>
                    </li>
                        :
                        <li className="link">
                            <button type={"button"} className="button button-logOut" onClick={handleLogOut}>Log Out</button>
                        </li>}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar

