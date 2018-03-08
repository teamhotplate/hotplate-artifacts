import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Form, Button, Input } from "../../components/Form";

class Login extends Component {
    state = {
        user: "",
        pass: ""
    };

    submitUser = () => {
        // event.preventDefault();
        API.register({
            user: this.state.user,
            pass: this.state.pass
        });
    };

    logUser = () => {
        // event.preventDefault();
        API.login({
            user: this.state.user,
            pass: this.state.pass
        });
    };

    render() {
        return (
            <div>
            <div className="row">
                <form>
                        <Input
                            name="Username"
                            placeholder="Username"
                            onChangeText={(text) => this.state.user}
                        />
                        <Input
                            name="Password"
                            placeholder="Password"
                            type="Password"
                            onChangeText={(text) => this.state.pass}
                        />
                        <Input
                            name="Valid-Password"
                            type="Password"
                            placeholder="Confirm Password"
                        />
                        <Button onClick={() => this.submitUser()} value="Register" />
                        <Button onClick={() => this.logUser()} value="Login" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
