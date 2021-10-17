import React from "react";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { Link } from "react-router-dom";
import "./style/Navbar.css";

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <Link to="/" className="navbar__brand">PEBBLETOR</Link>
                <ul className="navbar__nav">
                    <li className="navbar__item"><ThemeSwitch /></li>
                    <li className="navbar__item">
                        <Link to="/" className="navbar__link">Hill Charts</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/create" className="navbar__link create">Create</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
