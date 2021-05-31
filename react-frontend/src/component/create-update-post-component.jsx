import React, {Component} from 'react';
import PostService from "../service/post.service";
import AuthService from "../service/auth.service";

class CreateUpdatePostComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            id: this.props.match.params.id,
            title: '',
            description: '',
            fullText: ''
        }

        this.savePost = this.savePost.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeFullText = this.changeFullText.bind(this)
    }

    componentDidMount() {
        if (this.state.id === 'new') {
        } else {
            PostService.getPostById(this.state.id).then((res) => {
                let post = res.data;
                this.setState({
                    title: post.title,
                    description: post.description,
                    fullText: post.fullText
                })
            })
        }
    }

    savePost = (event) => {

        event.preventDefault();
        let post = {
            title: this.state.title,
            description: this.state.description,
            fullText: this.state.fullText
        }

        if (this.state.id === 'new') {
            PostService.createPost(this.state.currentUser.id, post).then(() => {
                this.props.history.push('/user/myposts')
                window.location.reload();
            })
        } else {
            PostService.updatePost(this.state.id, post).then(() => {
                this.props.history.push('/user/myposts')
                window.location.reload();
            })
        }
    }

    changeTitle = (event) => {
        this.setState({title: event.target.value})
    }

    changeDescription = (event) => {
        this.setState({description: event.target.value})
    }

    changeFullText = (event) => {
        this.setState({fullText: event.target.value})
    }

    render() {
        return (
            <div className="container">

                <form>
                    <div className="form-group">
                        <label className="form-label fw-bold">Title</label>
                        <input type="text" className="form-control"
                               placeholder="title" name="title"
                               value={this.state.title}
                               onChange={this.changeTitle}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label fw-bold">Description</label>
                        <input type="text" className="form-control"
                               placeholder="description" name="description"
                               value={this.state.description}
                               onChange={this.changeDescription}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label fw-bold">Full text</label>
                        <textarea className="form-control" rows="3"
                                  placeholder="input your full text"
                                  name="fullText"
                                  value={this.state.fullText}
                                  onChange={this.changeFullText}/>
                    </div>

                    <div className="form-group">
                        <label className="form-label fw-bold">Image</label>
                        <input type="file" className="form-control-file"/>
                    </div>

                    <button type="submit" className="btn btn-primary mb-2"
                            style={{marginTop: "10px"}} onClick={this.savePost}>Save
                    </button>
                </form>
            </div>
        );
    }
}

export default CreateUpdatePostComponent;