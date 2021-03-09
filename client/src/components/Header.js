import React from "react";
import { NavLink } from "react-router-dom";
import '../style/Header.scss';
function Header() {
    return (
        <header>
            <h1>
                <span className="pageTitle">Kevin St.Onge</span>
                <span className="pageSubtitle">Full-Stack Web Developer</span>
            </h1>
            <nav>
                <NavLink exact to="/" activeClassName="selected">Projects</NavLink>
                <NavLink to="/about" activeClassName="selected">About Me</NavLink>
                <NavLink to="/contact" activeClassName="selected">Contact</NavLink>
            </nav>
        </header>
    );
}

export default Header;