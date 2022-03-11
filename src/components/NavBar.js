import React, {Component} from 'react';
import logo from '../images/logo.svg'
import {FaAlignRight, FaTelegramPlane, FaEnvelope} from "react-icons/all";
import {Link} from 'react-router-dom'

class NavBar extends Component {
    state = {
        isOpen: false
    }
    handleToggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return (
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to="/">
                            <img src={logo} alt="Тележная House"/>
                        </Link>
                        <button type="button" className="nav-btn" onClick={this.handleToggle}>
                            <FaAlignRight className="nav-icon"/>
                        </button>
                    </div>
                    <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
                        <li>
                            <Link to="/">Главная</Link>
                        </li>
                        <li>
                            <a href="tel:+79110202097">+7 (911) 020-20-97</a>
                        </li>
                        <li>
                            <Link to="/rooms">Номера</Link>
                        </li>
                        <li>
                            <a href="https://telegram.me/Telezhnaya_house">
                                <FaTelegramPlane/>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:user@domain.com?Subject=Hello%20User">
                                <FaEnvelope/>
                            </a>
                        </li>

                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;
