import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import {Collection, CollectionItem} from "react-materialize";
import { Form, Button, Input } from "../../components/Form";
import moment from "moment";

class Post extends Component {
    state = {
        post: {},
        comments: []
        };
        
    componentDidMount() {
        this.loadComments();
    };

    loadComments = () => {
        API.getCommentByPage(this.props.match.params.id)
            .then(res =>
                this.setState({ comments: res.data })
            ).catch(err => console.log(err));
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
            <div className="comment-page">
                <div className="post-title">
                    <h1>{this.props.location.state.post.name}</h1>
                </div>
                {console.log(this.props.location.state.post)}
                <div className="comments">
                    <Collection>
                        {this.state.comments.map(comment => (
                            <CollectionItem className="comment">
                            {comment.text}
                            <p className="user">- {comment.username}</p>
                            <p className="timestamp">- {moment(comment.updatedAt).format("MMMM Do YYYY, h:mm a")}</p>
                            </CollectionItem>
                            )
                        )}
                    </Collection>
                    <Button>Participate</Button>
                </div>
            </div>
        );
    }
}

export default Post;
