import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Form, Button, Input } from "../../components/Form";
import { Icon } from "react-materialize";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Front from "../Front";

class Login extends Component {
    state = {
        user: "",
        pass: ""
    };

    submitUser = event => {
        event.preventDefault();
        API.register({
            username: this.state.user,
            password: this.state.pass
        }).then(function(data, err) {
            if (data.status === 200) {
                return <Front />
                console.log(data);
            } else {
                console.log(err);
            }
        });
    };

    logUser = event => {
        event.preventDefault();
        API.login({
            username: this.state.user,
            password: this.state.pass
        }).then(function(data, err) {
            if (data.status === 200) {
                <Link to="/" />
                return <Front />
                console.log(data);
            } else {
                console.log(err);
            }
        });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
        console.log(this.state)
      };

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
                            onClick={this.submitUser} value="Register">
                            <Icon small>Sign Up</Icon>
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
