import "./navbar.scss";
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBook } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const [navClick, setNavClick] = useState(true);
    const handleClick = () => { setNavClick(!navClick) }
    const handleLink = () => {
        if (!navClick) {
            handleClick();
        }
    }
    return (
        <div className="navbar-container">
            <div className="header">
                <div >
                    <Link className="navLogo" to="/">Soefia</Link>
                </div>
               
                    <ul className={navClick ? 'navBar' : 'navBar active'}>
                        <div className="navLeft">
                            <li>
                                <Link to="/" onClick={handleLink}><FontAwesomeIcon icon={faHome} /></Link>
                            </li>
                            <li>
                                <Link to="/class" onClick={handleLink}><FontAwesomeIcon icon={faUsers} /></Link>
                            </li>
                            <li>
                                <Link to="/notebook" onClick={handleLink}><FontAwesomeIcon icon={faBook} /></Link>
                            </li>
                        </div>
                        <div className="navRight">
                            <li>
                                <Link to="/notebook" onClick={handleLink}>Help</Link>
                            </li>
                            <li>
                                <div className="search">
                                    <input type="text" placeholder="Search" />
                                </div>
                            </li>
                            <li>
                                <Link to="/notebook" onClick={handleLink}>Support</Link>
                            </li>
                            <li>
                                <Link to="/notebook" onClick={handleLink}>Sales</Link>
                            </li>
                        </div>
                    </ul>
            
                <div className="hamburger" onClick={handleClick}>
                    {navClick ? (
                        <FaBars size={20} style={{ color: "#fff" }} />
                        // <p>Ham</p>
                    ) : (
                        <FaTimes size={20} style={{ color: "#fff" }} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;
