import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Collection} from "react-materialize";
import API from "../../utils/API";
import CollectionItem from "react-materialize/lib/CollectionItem";

class Front extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        this.loadPages();   
    };

    loadPages = () => {
        API.getPages()
            .then(res =>
                this.setState({ posts: res.data })
            ).catch(err => console.log(err))
    };

    render() {
        return (
            <div className="posts">
                <h1 id="main-title">Welcome to hotplate, home of the hotplate</h1>
                <Collection>
                    {this.state.posts.map(post => (
                        <CollectionItem href={"/post-page/" + post.id}>
                            <strong>
                                {post.name}
                            </strong>
                            <br></br>
                            <p>
                                {post.description}
                            </p>
                        </CollectionItem>
                        )
                    )}
                </Collection>
            </div>
        );
    }
}

export default Front;
