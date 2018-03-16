import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import AuthService from "../../utils/auth";


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
            <div>
                <p>{JSON.stringify(this.state.comments)}</p>
                <p>{JSON.stringify(this.state.posts)}</p>
            </div>
        );
    }
}
export default Profile;
