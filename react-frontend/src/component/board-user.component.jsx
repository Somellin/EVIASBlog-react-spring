import React, {Component} from "react";

import UserService from "../service/user.service";
import PostService from "../service/post.service";
import {
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
} from "reactstrap";
import AuthService from "../service/auth.service";
import {Route, Switch} from "react-router-dom";
import CreateUpdatePostComponent from "./create-update-post-component";
import PostViewComponent from "./post-view-component";


export default class BoardUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            currentUser: AuthService.getCurrentUser(),
            posts: []
        };

        this.viewMyPosts = this.viewMyPosts.bind(this);
        this.createPost = this.createPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.viewPost = this.viewPost.bind(this)
    }

    componentDidMount() {

        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });

            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );

        PostService.getPostsByCurrentUser(this.state.currentUser.id).then(res => {
            this.setState({
                posts: res.data
            })
        })

    }

    viewMyPosts() {
        this.props.history.push(`/user/myposts`);
    }

    viewPost(id) {
        this.props.history.push(`/user/myposts/${id}`)
    }

    createPost() {
        this.props.history.push(`/user/create/new`);
        window.location.reload();
    }

    updatePost(id) {
        this.props.history.push(`/user/create/${id}`);
    }

    deletePost(id) {
        PostService.deletePost(id).then(res => {
            this.setState({
                posts: this.state.posts.filter(post => post.id !== id)
            })
        })
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <hr/>
                    <div className="container text-center">
                        <button className="btn btn-primary button_in_u" style={{marginRight: "15px"}}
                                onClick={this.viewMyPosts}>
                            My posts
                        </button>
                        <button className="btn btn-primary button_in_u"
                                onClick={this.createPost}>
                            Create post
                        </button>
                    </div>
                    <hr/>
                </header>

                <Switch>
                    <Route path="/user/create/:id" component={CreateUpdatePostComponent}/>
                    <Route path="/user/myposts/:id" component={PostViewComponent}/>
                    <Route path="/user/myposts">
                        {
                            this.state.posts.map(
                                posts =>
                                    <Card key={posts.id}>
                                        <CardBody>
                                            <CardTitle tag="h5">{posts.title}</CardTitle>
                                            <CardSubtitle tag="h6"
                                                          className="mb-2 text-muted">{posts.description}</CardSubtitle>
                                            <CardText>{posts.fullText}</CardText>
                                            <button className="btn btn-primary"
                                                    onClick={() => this.viewPost(posts.id)}>Learn More
                                            </button>
                                            <button className="btn btn-warning m-lg-3"
                                                    onClick={() => this.updatePost(posts.id)}>Update
                                            </button>
                                            <button className="btn btn-danger"
                                                    onClick={() => this.deletePost(posts.id)}>Delete
                                            </button>
                                            <br/><br/>
                                            <span>{posts.date} by :
                                        <div className="container-3" style={{display: "inline"}}>
                                            <a href="/#" style={{marginLeft: "10px"}}>{posts.userName}</a>
                                        </div>
                                    </span>
                                        </CardBody>
                                    </Card>
                            )
                        }
                    </Route>

                </Switch>
            </div>
        );
    }
}