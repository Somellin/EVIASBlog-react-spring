import React, {Component} from 'react';
import AuthService from "../service/auth.service";
import PostService from "../service/post.service";

export default class PostViewComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            id: this.props.match.params.id,
            username: '',
            date: '',
            title: '',
            description: '',
            fullText: '',
            comments:[],
            comment:''
        }

        this.changeComment = this.changeComment.bind(this)
        this.createComment = this.createComment.bind(this)
    }

    componentDidMount() {
        PostService.getPostById(this.state.id).then((res) => {
            let post = res.data;
            this.setState({
                title: post.title,
                description: post.description,
                fullText: post.fullText,
                username: post.userName,
                date: post.date
            })
        })

        PostService.getCommentsByPost(this.state.id).then((res) => {
            this.setState({
                comments: res.data
            })
        })
    }


    changeComment = (event) => {
        this.setState({comment: event.target.value})
    }

    createComment = (e) =>{
        e.preventDefault();
        let comment = {
            text: this.state.comment,
        }
        PostService.createComment(this.state.currentUser.id, this.state.id, comment).then(() => {
            window.location.reload();
        })
    }

    render() {
        return (
            <div className="container">
                <div className="card mb-3">
                    {/*<img src="..." className="card-img-top" alt="..."/>*/}
                    <div className="card-body">
                        <h2 className="card-title">{this.state.title}</h2>
                        <h4 className="card-text">{this.state.description}</h4>
                        <p className="card-text">{this.state.fullText}</p>
                        <p className="card-text"><small className="text-muted">{this.state.date} by
                            : {this.state.username}</small></p>
                    </div>
                </div>
                <hr/>

                <div className="container w-75">
                    {
                        this.state.comments.map(
                            com =>
                                <div className="media">
                                    {/*<img src="..." className="mr-3" alt="..."/>*/}
                                    <div className="media-body">
                                        <h5 className="mt-0">{com.userName}</h5>
                                        <p>{com.text}</p>
                                    </div>
                                </div>
                        )
                    }
                </div>
                <hr/>

                {
                    this.state.currentUser ?
                        <div className="container w-75 mb-5">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">Add comment</label>
                                    <input type="text" className="form-control"
                                           value={this.state.comment}
                                           onChange={this.changeComment}
                                    />
                                    <button type="button" className="btn btn-warning mt-3"
                                            onClick={this.createComment}>Send</button>
                                </div>
                            </form>
                        </div> :
                        <div className="container w-75 mb-5">
                            <span>login to leave a comment</span>
                        </div>

                }

            </div>
        );
    }
}