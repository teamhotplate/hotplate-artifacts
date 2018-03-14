import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Collection} from "react-materialize";
import API from "../../utils/API";
import CollectionItem from "react-materialize/lib/CollectionItem";
import { Form, Button, Input } from "../../components/Form";
import moment from "moment";

class Front extends Component {
    state = {
        posts: [],
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
            <div className="main">
                <div className="posts">
                    <h1 id="main-title">Welcome to hotplate, home of the hotplate</h1>
                    <Collection>
                        {this.state.posts.map(post => (
                            <Link to={{
                                pathname: "/post-page/" + post.id,
                                state: {post: post}
                            }}>
                            <CollectionItem href=" " className="post-link">
                                <strong>
                                    {post.name}
                                </strong>
                                <br></br>
                                <p>
                                    {post.description}
                                </p>
                                <p className="timestamp">
                                {moment(post.updatedAt).format("MMMM Do YYYY, h:mm a")}
                                </p>
                            </CollectionItem>
                            </Link>
                            )
                        )}
                    </Collection>
                </div>
            </div>
        );
    }
}

export default Front;
