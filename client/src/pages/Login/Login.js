import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import AuthService from '../../utils/auth';


import { Form, Button, Input } from "../../components/Form";
import { Icon } from "react-materialize";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Front from "../Front";

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
        this.submitUser = this.submitUser.bind(this);
    };
    componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    submitUser(e) {
        e.preventDefault();
        API.register({
            username: this.state.username,
            password: this.state.password
        }).then(res => {
                this.props.history.replace('/');
        })
        .catch(err =>{
            alert("That username is unavailable");
        })
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit(e) {
        e.preventDefault();

        this.Auth.login(this.state.username, this.state.password)
            .then(res => {
                this.props.history.replace('/');
            })
            .catch(err => {
                alert(err);
            })
    }

    render(){
        return(
            <div className = "center" >
                    <h1>Login</h1>
                    <form>
                        <Input
                            name="username"
                            className = "form-item"
                            placeholder="Username"
                            onChange={this.handleChange}
                            type="text"
                        />
                        <Input
                            className="form-item"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <Button onClick= {this.handleFormSubmit} className="form-submit" value="Login" type="submit">
                            <Icon small>Login</Icon>
                        </Button>
                        <Button 
                            onClick={this.submitUser}
                            to="/" value="Register">
                            <Icon small>Sign Up</Icon>
                        </Button>
                    </form>
                </div>
        );
    }
};
export default Login;

