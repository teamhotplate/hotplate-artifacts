import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Collection} from "react-materialize";
import API from "../../utils/API";
import AuthService from '../../utils/auth';
import Modal from "../../components/Modal";
import CollectionItem from "react-materialize/lib/CollectionItem";
import { Form, Button, Input } from "../../components/Form";
import moment from "moment";

class Front extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            posts : [],
            userId : null,
            isOpen: false,
            postTitle: "",
            postDescription: ""
        }
        this.getUserId = this.getUserId.bind(this);
        this.loadPages = this.loadPages.bind(this);
    };

    componentDidMount() {
        this.loadPages();  
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

    loadPages = () => {
        API.getPages()
            .then(res =>
                this.setState({ posts: res.data })
            ).catch(err => console.log(err))
    };

    createPost = event => {
        // event.preventDefault();
        console.log(this.state);
        API.createPage({
            name: this.state.postTitle,
            description: this.state.postDescription,
            UserId: this.state.userId
        }).then(res => this.loadPages())
    };

    toggleModal = () => {
        console.log(this.state);
        this.setState({
          isOpen: !this.state.isOpen
        });
        this.createPost();
      };

      handleInputChange = event => {
        const { name, value } = event.target;
        console.log(name, value);
        this.setState({
                [name]: value
        });
    };

    render() {
        return (
            <div className="main">
            <Modal 
                show={this.state.isOpen}
                onClose={this.toggleModal}>
                <Input 
                name="postTitle"
                className="form-item"
                placeholder="Post Title"
                onChange={this.handleInputChange}
                type="text"
                />

                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea 
                                    id="textarea1" 
                                    className="materialize-textarea"
                                    name="postDescription"
                                    onChange={this.handleInputChange}
                                    placeholder="Post Description"
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
                <div className="posts">
                    <h1 id="main-title">Welcome to hotplate, home of the hotplate</h1>
                    <Button 
                        onClick={this.toggleModal}
                        >New Post
                    </Button>
                    <Collection>
                        {this.state.posts.map(post => (
                            <Link to={{
                                pathname: "/post-page/" + post.id,
                                state: {post: post }
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
