import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import AuthService from '../../utils/auth';
import {Collection, CollectionItem, Row} from "react-materialize";
import { Form, Button, Input } from "../../components/Form";
import moment from "moment";
import Modal from "../../components/Modal";

class Post extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            userId: null,
            post: {},
            comments: [],
            parentComments: [],
            childComments: [],
            newComment: {
                text: "",
                pageId: "",
                username: "",
                userId: null,
                parentId: null
            }
        }
    };
        
    componentDidMount() {
        this.loadPage();
        this.loadComments();
        this.getUserId();
    };
    getUserId = () => {
        if (this.Auth.loggedIn()){
            let UserData = this.Auth.getProfile();
            this.setState(
                { userId: UserData.user_id }
            )
        }
    }

    loadPage = () => {
        API.getPage(this.props.match.params.id)
            .then(res =>
                this.setState({ post: res.data })
            ).catch(err => console.log(err))
    };

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
<<<<<<< HEAD
        event.preventDefault();
        if(this.state.userId === null){
            this.props.history.replace('/login-page');
        } else {
=======
        // event.preventDefault();
>>>>>>> 1e4655d01b04619599b79b6f62b912d221decd2e
        API.createComment({          
                text: this.state.newComment.text,
                PageId: this.props.match.params.id,
                username: this.state.newComment.user,
                UserId: this.state.userId,
                ParentId: this.state.parentId
        })
        .then(res => this.loadComments());
<<<<<<< HEAD
        // this.state.text=" ";
        }
=======
>>>>>>> 1e4655d01b04619599b79b6f62b912d221decd2e
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
<<<<<<< HEAD
                userId: this.state.user_id
=======
                userId: this.state.userId
>>>>>>> 1e4655d01b04619599b79b6f62b912d221decd2e
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
    };

    toggleModal = () => {
        console.log(this.state);
        this.setState({
          isOpen: !this.state.isOpen
        });
        this.newComment();
      };

    render() {
        return (
            <div className="comment-page">
                <Modal 
                    show={this.state.isOpen}
                    onClose={this.toggleModal}>

                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea 
                                            id="textarea1" 
                                            className="materialize-textarea"
                                            name="text"
                                            onChange={this.handleInputChange}
                                            placeholder="Comment"
                                            >
                                        </textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                
                    <Button onClick={this.toggleModal}>
                        Submit Post
                    </Button>
                </Modal>
                <div className="post-title">
                    <h1>{ this.state.post.name }</h1>
                    <h4>{this.state.post.description}</h4>
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

                                            <Button 
                                                onClick={this.toggleModal}>
                                                Reply
                                            </Button>
                                        </Row>
                                    </CollectionItem>
                                    ))}
                            </Collection>
                            </CollectionItem>
                            )
                        )}
                    </Collection>
                    <Button onClick={this.toggleModal}>
                        Participate
                    </Button>
                </div>
            </div>
        );
    }
}

export default Post;
