import React, {Component} from "react";

import UserService from "../service/user.service";

export default class BoardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            users: [],
        };
    }

    componentDidMount() {
        UserService.getAdminBoard().then(
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

        UserService.getUsers().then((res) => {
            this.setState({users: res.data})
        })
    }

    deleteUser(id) {
        UserService.deleteUser(id).then(res => {
            this.setState({
                users: this.state.users.filter(users => users.id !== id)
            })
        })
    }

    render() {
        const {content} = this.state;
        return (
            <div>
                {
                    content ? (<h1>{content}</h1>) : (
                        <div>
                            <h2 className="text-center mb-3">Users List</h2>

                            <div className="row">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Username</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email Id</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.users.map(
                                            users =>
                                                <tr key={users.id}>
                                                    <td>{users.id}</td>
                                                    <td>{users.username}</td>
                                                    <td>{users.firstname}</td>
                                                    <td>{users.lastname}</td>
                                                    <td>{users.email}</td>

                                                    <td>
                                                        <button className="btn btn-danger"
                                                                style={{marginLeft: "10px"}}
                                                                onClick={() => this.deleteUser(users.id)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}