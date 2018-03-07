import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class Front extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        this.loadPages();
        
    }
    loadPages = () => {
        API.getPages()
            .then(res =>
                this.setState({ posts: res.data })
            )
            .catch(err => console.log(err))
    };

    render() {
        return (
            <div>
                <ul>
                    {this.state.posts.map(post => (
                        <h1>{post.name}</h1>
                    )
                    )}
                </ul>
            </div>
        );
    }
}

export default Front;
