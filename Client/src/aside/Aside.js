import React, { Component } from 'react';
import './Aside.css'
import userImage from '../userImage.png';
import TextField from '@material-ui/core/TextField';
export default class Aside extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                openNotifications: false,
                roomNotification: this.props.roomNotification
            };
    }

    openUserNotifications = () => {
        this.setState({
            openNotifications: true
        })
    }

    handleCloseNotifications = () => {
        this.setState({
            openNotifications: false
        })
    }

    handleSearch = (e) => {

        let currentList = [];

        let newList = [];


        if (e.target.value !== "") {

            currentList = this.props.roomNotification;

            newList = currentList.filter(notification => {

                const lc = notification.sender.split('~')[0].toLowerCase();

                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = this.props.roomNotification;
        }

        this.setState({
            roomNotification: newList
        });
    }

    render() {
        return (
            <aside>
                <div className="vr"></div>
                <TextField
                    id="search full-width"
                    label="Search members"
                    type="search"
                    onChange={this.handleSearch}
                    margin="normal"
                />
                <ul >
                    {this.state.roomNotification.map((notification, i) =>
                        <li key={i}>
                            <img src={userImage} alt="Default-User" id="userImage" />
                            <div>
                                <div><h2 style={{ textAlign: "left", float: "left" }}>{notification.sender.split('~')[0]}</h2>
                                </div>
                                <br />
                                <h3>
                                    {notification.status === 'online' || notification.status === 'typing...' ? <span className="status green"></span> : <span className="status orange"></span>}
                                    {notification.status}
                                </h3>
                            </div>
                        </li>
                    )} </ul>
            </aside>

        )
    }
}
