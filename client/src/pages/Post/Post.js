import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
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
        this.state.text=" ";
    };

    deleteComment = id => {
        API.deleteComment(id)
          .then(res => this.loadComments());
    };

    editComment = id => {
        API.editComment()
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
    };

    render() {
        return (
            <div className="comment-page">
                <div className="post-title">
                    <h1>{this.props.location.state.post.name}</h1>
                </div>
                <div className="comments">
                    <Collection>
                        {this.state.comments.map(comment => (
                            <CollectionItem className="comment" key={comment.id}>
                            {comment.text}
                            <p className="user">- {comment.username}</p>
                            <p className="timestamp">- {moment(comment.updatedAt).format("MMMM Do YYYY, h:mm a")}</p>
                            <Row>
                                <Button 
                                    type='delete'
                                    className='red'
                                    icon='remove'
                                    onClick={() => this.deleteComment(comment.id)}
                                >Delete</Button>
                            </Row>
                            </CollectionItem>
                            )
                        )}
                    </Collection>
                    <Row>
                        <Input 
                        className="input"
                        type='textarea'
                        name="text" 
                        value={this.state.text}
                        onChange={this.handleInputChange}
                        />
                    </Row>
                    <Button onClick={this.newComment}>
                        Participate
                    </Button>
                </div>
            </div>
        );
    }
}

export default Post;
