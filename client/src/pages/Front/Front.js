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
    constructor() {
        super();
        this.Auth = new AuthService();
        this.state = {
            posts : [],
            userId : null,
            isOpen: false
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

    createPost = () => {
        console.log(this.state)
        this.setState({
            isOpen: this.state.isOpen
          });
    };

    render() {
        return (
            <div className="main">
                <div className="posts">
                    <h1 id="main-title">Welcome to hotplate, home of the hotplate</h1>
                    <Button 
                        type='delete'
                        className='red'
                        icon='remove'
                        onClick={() => this.createPost()}
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
