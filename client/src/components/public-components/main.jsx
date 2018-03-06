import React from "react";
import Button from "./button";
import InfoCard from "./infoCard";
import NavBar from "./navbar";
import Comment from "./comment";
import Api from "../utils/api";

class Main extends Component {

    state = {
        title: "",
        description: "",
        foreignKey = ""
    };

    getPost = (name, description, foreignKey) => {
            
    }

    render() {
        (
            <div className="main-container">
                <div className="nav-bar">
                    <h1>{this.NavBar}</h1>
                </div>
            </div>
        );
    }
}