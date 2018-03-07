import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class Login extends Component {
    state = {
        user: "",
        pass: ""
    };

    render() {
        return (
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                            <input placeholder="Username" id="first_name" type="text" className="validate"></input>
                            <label for="username"></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" placeholder="Password" className="validate"></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" placeholder="Confirm Password" className="validate"></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" placeholder="Email" className="validate"></input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
