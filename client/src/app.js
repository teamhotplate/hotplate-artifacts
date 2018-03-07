
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Front from "./pages/Front";
import Post from "./pages/Post";
import Nav from "./components/Nav";
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import NoMatch from "./pages/NoMatch"


const App = () =>
    <Router>
        <div>
            <Nav />
            <Switch>
                <Route exact path="/" component={Front} />
                <Route exact path="/post-page/:id" component={Post} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="login-page" component={Login} />
                <Route component={NoMatch} />
            </Switch>
        </div>
    </Router>;

export default App;
