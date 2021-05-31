import React, {Component} from "react";
import AuthService from "../service/auth.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const {currentUser} = this.state;

        return (
            <div className="container col-10 profile">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card float-start"
                    style={{marginRight: "30px"}}
                />
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong>
                    </h3>
                </header>
                <p>
                    {currentUser.firstname}{" "}{currentUser.lastname}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {currentUser.email}
                </p>
                <hr/>
            </div>

        );
    }
}