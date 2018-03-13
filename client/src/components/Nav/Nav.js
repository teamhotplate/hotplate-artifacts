import React from "react";
import { Link } from "react-router-dom";

const Nav = () =>
    <nav className="navbar navbar-inverse navbar-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <img src="hotplate-logo-circle.png"></img>
                <span className="icon-bar" />
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="">Profile</a></li>
                    <li><a href="">About</a></li>
                    <li><Link to={{
                            pathname: "/"
                        }}>Home</Link></li>
                </ul>
                <a href="/" className="navbar-brand">
                    hotplate
                </a>
            </div>
        </div>
    </nav>;

export default Nav;
