import React, { Component } from 'react'
import {URI_NOTES, URI_USERS} from '../global/Constants';
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export class CreateNote extends Component {

    state = {
        users: [],
        userSelected: "",
        title: "",
        content: "",
        date: new Date(),
        editing: false,
        _id: ""
    };

    async componentDidMount(){

        const res = await axios.get(URI_USERS);
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
        })
        if(this.props.match.params.id){
            const res = await axios.get(URI_NOTES + this.props.match.params.id)
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                editing: true,
                _id:this.props.match.params.id
            })
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.userSelected,
            date: this.state.date
         }
        if (this.state.editing){
            await axios.put(URI_NOTES + this.state._id, newNote);
        }else{
            await axios.post(URI_NOTES, newNote);
        }

        window.location.href = "/";
    }

    onChangeDate = (date) => {
        this.setState({date})
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a Note</h4>
                    {/* SELECT USER */}
                    <div className="form-group">
                        <select className="form-control" name="userSelected" onChange={this.onInputChange} value={this.state.userSelected}>
                            {
                                this.state.users.map(user => <option key={user} value={user}>{user}</option>)
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Title" name="title" onChange={this.onInputChange} value={this.state.title} required/>
                    </div>
                    <div className="form-group">
                        <textarea name="content" className="form-control" placeholder="Content" onChange={this.onInputChange} value={this.state.content} required></textarea>

                    </div>
                    <div className="form-group">
                        <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>
                    <form onSubmit={this.onSubmit}>

                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateNote
