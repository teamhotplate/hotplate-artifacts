import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import {Collection, CollectionItem} from "react-materialize";

class Post extends Component {
    state = {
        post: {},
        comments: []
        };

    componentDidMount() {
        this.loadComments();
    };

    loadComments = () => {
        API.getCommentByPage()
            .then(res =>
                this.setState({ comments: res.data})
            ).catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <Collection>
                    {this.state.comments.map(comment => (
                        <CollectionItem>{comment.text}</CollectionItem>
                        )
                    )}
                </Collection>
            </div>
        );
    }
}

export default Post;
