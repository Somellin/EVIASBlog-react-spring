import React, {Component} from "react";
import {Card, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';
import UserService from "../service/user.service";
import PostService from "../service/post.service";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            posts: [],

        };

        this.viewPost = this.viewPost.bind(this);
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );

        PostService.getPosts().then((res) => {
            this.setState({
                posts: res.data
            })
        })
    }

    viewPost(id) {
        this.props.history.push(`/home/${id}`)
    }

    render() {
        return (
            <div className="container col-md-8">
                {
                    this.state.posts.map(
                        (posts) =>
                            <Card key={posts.id}>
                                <CardBody>
                                    <CardTitle tag="h5">{posts.title}</CardTitle>
                                    <CardSubtitle tag="h6"
                                                  className="mb-2 text-muted">{posts.description}</CardSubtitle>
                                    <CardText>{posts.fullText}</CardText>
                                    <button className="btn btn-primary" onClick={() => this.viewPost(posts.id)}>Learn
                                        More
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
            </div>

        );
    }
}