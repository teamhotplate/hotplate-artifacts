import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import AuthService from '../../utils/auth';
import {Collection, CollectionItem, Row} from "react-materialize";
import { Form, Button, Input } from "../../components/Form";
import moment from "moment";

class Post extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.state = {
            post: {},
            userId: null,
            comments: [],
            parentComments: [],
            childComments: [],
            newComment: {
                text: "",
                pageId: "",
                username: "",
                userId: ""
            }
        }
    };
        
    componentDidMount() {
        this.loadComments();
        this.getUserId();
    };
    getUserId = () => {
        if (this.Auth.loggedIn()){
            let UserData = this.Auth.getProfile();
            console.log(UserData)
            this.setState(
                { userId: UserData.user_id }
            )
        }
    }

    loadComments = () => {
        API.getCommentByPage(this.props.match.params.id)
            .then(res =>
                this.setState({ comments: res.data }, this.seperateComments(res.data))
            ).catch(err => console.log(err));
    };

    seperateComments = (comments) => {
        let parentComments = [];
        let childComments = [];
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            if (comment.ParentId !== null){
                childComments.push(comment)
            }
            else{
                parentComments.push(comment)
            }
        }
        this.setState({parentComments: parentComments});
        this.setState({childComments: childComments});

    }


    newComment = event => {
        event.preventDefault();
        API.createComment({          
                text: this.state.newComment.text,
                PageId: this.props.match.params.id,
                username: this.state.newComment.user,
                UserId: this.state.newComment.userId
        })
        .then(res => this.loadComments());
        // this.state.text=" ";
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
                userId: AuthService.getCurrentUser().user_id
            }
        });
    };

    findChildren = (pComment, cComment) => {
        const children = [];
        for (let i = 0; i < cComment.length; i++) {
            const comment = cComment[i];
            if (pComment.id === comment.ParentId){
                children.push(comment);
            }
        }
        return children;
    }

    render() {
        return (
            <div className="comment-page">
                <div className="post-title">
                    <h1>{this.props.post.name}</h1>
                </div>
                <div className="comments">
                {console.log(this.state)}
                    <Collection>
                        {this.state.parentComments.map(pComment => (
                            <CollectionItem className="comment" key={pComment.id}>
                            {pComment.text}
                            <p className="user">- {pComment.username}</p>
                            <p className="timestamp">- {moment(pComment.updatedAt).format("MMMM Do YYYY, h:mm a")}</p>
                            <Row>
                                <Button 
                                    type='delete'
                                    className='red'
                                    icon='remove'
                                    onClick={() => this.deleteComment(pComment.id)}
                                >Delete</Button>
                            </Row>
                            <Collection>
                                {this.findChildren(pComment, this.state.childComments).map(cComment => (
                                    <CollectionItem className="comment" key={cComment.id}>
                                        {cComment.text}
                                        <p className="user">- {cComment.username}</p>
                                        <p className="timestamp">- {moment(cComment.updatedAt).format("MMMM Do YYYY, h:mm a")}</p>
                                        <Row>
                                            <Button
                                                type='delete'
                                                className='red'
                                                icon='remove'
                                                onClick={() => this.deleteComment(cComment.id)}
                                            >Delete</Button>
                                        </Row>
                                    </CollectionItem>
                                    ))}
                            </Collection>
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
