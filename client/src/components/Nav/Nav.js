import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from '../../utils/auth';

class Nav extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.handleLogout = this.handleLogout.bind(this);
        this.getUserId = this.getUserId.bind(this);
        this.userId = "";

    }

    componentWillMount = () => {
        this.getUserId();
    }

    getUserId = () => {
        if (this.Auth.loggedIn()){
            let UserData = this.Auth.getProfile()

            this.setState(
                {userId: UserData.user_id}
            )
        }
    }
    handleLogout = () => {
        this.setState(
            {userId: null}
        )
        this.Auth.logout();
    }

render() {
    return (
        <nav className="navbar navbar-inverse navbar-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="collapsed navbar-toggle">
                        <span className="icon-bar" />logo here <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    <ul id="nav-mobile" className="right">
                        <li>{!(this.Auth.loggedIn()) ? <a href="/login-page">Login</a> : <a href={"/profile/"+this.state.userId}>Profile</a>}</li>
                        <li><a onClick={this.handleLogout} href="/">Logout</a></li>
                    </ul>
                    <a href="/" className="navbar-brand">
                        Your Forum
                    </a>
                </div>
            </div>
        </nav>
    )}
}

export default Nav;
