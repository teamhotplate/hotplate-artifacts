import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './app.css';
import Main from "./public-components/main";

const App = () =>
  <Router>
    <div>
      <Route path="/" component={Main} />
    </div>
  </Router>;

export default App;