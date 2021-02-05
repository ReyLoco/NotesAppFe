import React, { Component } from "react";
import axios from "axios";
import {URI_USERS} from '../global/Constants';

export class CreateUser extends Component {
    state = {
        users: [],
        username:""
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const res = await axios.get(URI_USERS);
        this.setState({
            users: res.data,
        });
    }

    onChangeUserName = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = async (e) =>{
        e.preventDefault();
        await axios.post(URI_USERS, {
            username: this.state.username
        })
        this.setState({username: ""});
        this.getUsers();
    }

    deleteUser =  async (id) => {
        await axios.delete(URI_USERS + id)
        this.getUsers();
    }

    render() {
        return (
            <div className="row">

                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.onChangeUserName} value={this.state.username}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                        
                    </div>
                </div>

                <div className="col-md-8">
                    <ul className="list-group">
                        {this.state.users.map((user) => (
                            <li key={user._id} className="list-group-item list-group-action" onDoubleClick={() => this.deleteUser(user._id)}>
                                {user.username}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default CreateUser;
