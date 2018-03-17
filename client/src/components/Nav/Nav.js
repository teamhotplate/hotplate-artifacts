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
        <nav>
            <div class="nav-wrapper">
                <img src="{~{=it.LogoImageUrl}~}}" alt="{~{=it.CompanyName}~}}" className="logo-img" />
                <a href="/" class="brand-logo">{~{=it.CompanyName}~}</a>
                <ul id="nav-mobile" className="right">
                    <li>{!(this.Auth.loggedIn()) ? <a href="/login-page">Login</a> : <a href={"/profile/" + (this.Auth.getProfile()).user_id}>Profile</a>}
                    </li>
                    <li><a onClick={this.handleLogout} href="/">Logout</a></li>
                </ul>
            </div>
        </nav> 
    )}
}

export default Nav;
