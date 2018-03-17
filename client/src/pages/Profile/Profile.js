import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import AuthService from "../../utils/auth";

import { Form, Button, Input } from "../../components/Form";
import { Collection, CollectionItem, Row } from "react-materialize";
import moment from "moment";


class Profile extends Component{
    constructor() {
        super();
        this.Auth = new AuthService();
        this.state = {
            posts: [],
            comments: [],
            userId: null
        }
        this.getUserId = this.getUserId.bind(this);
        this.loadPages = this.loadPages.bind(this);
        this.loadComments = this.loadComments.bind(this);
    };

    componentDidMount() {
        this.getUserId();
        this.loadPages();
        this.loadComments();
    };

    getUserId = () => {
        if (this.Auth.loggedIn()) {
            let UserData = this.Auth.getProfile();
            console.log(UserData)
            this.setState(
                { userId: UserData.user_id }
            )
        } else {
            this.props.history.replace('/login-page');
        }
    }

    loadPages = () => {
        API.getPageByUser(this.props.match.params.id)
            .then(res =>
                this.setState({ posts: res.data })
            ).catch(err => console.log(err))
    };

    loadComments = () => {
        API.getCommentByUser(this.props.match.params.id)
            .then(res =>{
                let comments = res.data
                this.setState({comments: res.data})
            }
            ).catch(err => console.log(err))
    }

    render() {
        return (
            <div className="main">
                <div className="posts">
                    <h1 id="main-title">Posts</h1>
                        <Collection>
                            {this.state.posts.map(post => (
                                <Link to={{
                                    pathname: "/post-page/" + post.id,
                                    state: { post: post }
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
                    <div className="posts">
                    <h1 id="main-title">Comments</h1>
                    <Collection>
                        {this.state.comments.map(comment => (
                            <Link to={{
                                pathname: "/post-page/" + comment.PageId,
                            }}>
                                <CollectionItem href=" " className="post-link">
                                    <p>
                                        {comment.text}
                                    </p>
                                    <p className="timestamp">
                                        {moment(comment.updatedAt).format("MMMM Do YYYY, h:mm a")}
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
export default Profile;
