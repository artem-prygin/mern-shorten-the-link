import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <nav>
            <div className="nav-wrapper blue darken-1 nav-bar">
                <span className="brand-logo">Links Shortener</span>
                <ul id="nav-mobile"
                    className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create link</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/"
                           onClick={logoutHandler}>Log out</a></li>
                </ul>
            </div>
        </nav>
    );
};
