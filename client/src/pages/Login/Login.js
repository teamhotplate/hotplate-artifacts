import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import AUTH from "../../utils/auth"
import { Form, Button, Input } from "../../components/Form";
import { Icon } from "react-materialize";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Front from "../Front";

class Login extends Component {
    state = {
        user: "",
        pass: ""
    };

    componentDidMount() {
        this.getUser();
    };

    submitUser = event => {
        event.preventDefault();
        API.register({
            username: this.state.user,
            password: this.state.pass
        }).then(function(data, err) {
            if (data.status === 200) {
                return <Front />
            } else {
            }
        });
    };

    logUser = event => {
        event.preventDefault();
        API.login({
            username: this.state.user,
            password: this.state.pass
        }).then(
            function (result) {
                if (result.data.token) {
                    // We got a token!! Login was successful.
                    // The JWT comes in with a prefix on it: "JWT ". That makes it easier to spot as a JWT.
                    // We strip that header so only the token remains.
                    var jwtEncoded = result.data.token.split(" ")[1];
                    // Store the user token in local storage
                    localStorage.setItem('userToken', jwtEncoded);
                    var currentUser = AUTH.getCurrentUser();
                    window.location.href = '/';
                } else {
                    console.log("Failed. Response: " + JSON.stringify(result));
                }
            });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    getUser = () => {
        let currentUser = (AUTH.getCurrentUser() ? AUTH.getCurrentUser() : "" );
        this.setState({
            user: currentUser.username
        })
    }

    render() {
        return (
            <div>
            <div className="row">
                <form>
                        <Input
                            value={this.state.user}
                            name="user"
                            placeholder="Username"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            name="pass"
                            value={this.state.pass}
                            placeholder="Password"
                            type="Password"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            name="Valid-Password"
                            type="Password"
                            placeholder="Confirm Password"
                        />
                        <Button onClick={this.logUser} value="Login">
                            <Icon small>Login</Icon>
                        </Button>
                        <Button 
                            disabled={!(this.state.user && this.state.pass)}
                            onClick={this.submitUser}
                            to="/" value="Register">
                            <Icon small>Sign Up</Icon>
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
