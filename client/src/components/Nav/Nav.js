import React from "react";

const Nav = () =>
    <nav className="navbar navbar-inverse navbar-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="collapsed navbar-toggle">
                    <span className="icon-bar" />logo here <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="">Profile</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Home</a></li>
                </ul>
                <a href="/" className="navbar-brand">
                    hotplate
                </a>
            </div>
        </div>
    </nav>;

export default Nav;
