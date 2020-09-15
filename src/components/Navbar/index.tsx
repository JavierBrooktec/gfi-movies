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

export type NavBarProps = {
    search?: any,
    lengthSearch?: number,
    showSearch?: boolean,

}

const NavBar = ({search, lengthSearch = 0, showSearch = true }: NavBarProps) => {



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
                    <li className="link">
                        <NavLink exact={true} activeClassName="is-active" to="/Sign In">Sign In</NavLink>
                    </li>
                    <li className="link">
                        <NavLink exact={true} activeClassName="is-active" to="/login">Login</NavLink>
                    </li>
                    <li className="link">
                        <NavLink activeClassName="is-active" to="/Log out">Log Out</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar

