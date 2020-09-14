import React from 'react'

import useToggle from '../../hooks/useToggle';
import useInput from '../../hooks/useInput';

import {
    NavLink
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

const NavBar = (props) => {

    const [showLinks, toggleShowLinks] = useToggle();

    const [title, setInputTitle, handleEnterTitle] = useInput('', props.search);

    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e);
        if(e.target.value.length > 2){
            props.search(e.target.value);
        }
    }

    const handleClickSubmit = (e: React.MouseEvent) => {        
        e.preventDefault();
        props.search(title);
    }


    return (
        <nav className="Navbar menu-parent">
            <div className="Navbar-container">
                <NavLink className="home-button" to="/" exact={true}>
                    <FontAwesomeIcon icon={faFilm} />
                </NavLink>

                <form className="form">
                    <input type="search" autoFocus placeholder="Search..." aria-label="Search" value={title} onChange={handleChangeInput} onKeyDown={handleEnterTitle} />
                    <button className="search" type="submit" onClick={handleClickSubmit}><FontAwesomeIcon icon={faSearch} /></button>
                </form>


                <button className="menu-button" type="button" onClick={toggleShowLinks}>
                    {showLinks ? <FontAwesomeIcon icon={faTimes} /> :
                        < FontAwesomeIcon icon={faBars} />}
                </button>
                <ul className={`menu ${showLinks ? 'toggled' : ''}`}>
                    <li className="link">
                        <NavLink activeClassName="is-active" to="/login">Login</NavLink>
                    </li>
                    <li className="link">
                        <NavLink activeClassName="is-active" to="/favourites">Favourites</NavLink>
                    </li>
                    <li className="link">
                        <NavLink  activeClassName="is-active" to="/favourites">Sign In</NavLink>
                    </li>
                    <li className="link">
                        <NavLink activeClassName="is-active" to="/favourites">Log Out</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar

