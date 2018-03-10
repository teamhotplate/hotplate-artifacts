import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import AUTH from "../../utils/auth";
import {Collection, CollectionItem, Row} from "react-materialize";
import { Form, Button, Input } from "../../components/Form";
import moment from "moment";

class Post extends Component {
    state = {
        post: {},
        comments: [],
        newComment: {
            text: "",
            pageId: "",
            user: ""
        }
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

    newComment = event => {
        // event.preventDefault()
        API.createComment({
           
                text: this.state.newComment.text,
                PageId: this.props.match.params.id,
                user: AUTH.getCurrentUser
                // username: this.state.comment
            
        })
        .then(res => this.loadComments());
        // .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            newComment:{
                [name]: value,
                PageId: this.props.match.params.id,
                user: this.props.match.params.user
            }
        });
        console.log(this.state)
    };

    render() {
        return (
            <div className="comment-page">
                <div className="post-title">
                    <h1>{this.props.location.state.post.name}</h1>
                </div>
                {console.log(this.state)}
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
                    <Row>
                        <Input 
                        type='textarea'
                        name="text" 
                        value={this.state.text}
                        onChange={this.handleInputChange}
                        />
                    </Row>
                    <Button onClick={this.newComment}>
                        Participate
                    </Button>
                    {console.log(this.state)}
                </div>
            </div>
        );
    }
}

export default Post;
