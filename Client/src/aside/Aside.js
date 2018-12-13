import React, { Component } from 'react';
import './Aside.css'
import userImage from '../userImage.png';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
export default class Aside extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                openNotifications: false
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



    render() {
        return (
            
                <aside>
                    <div className="vr"></div>
                    {/* <header>
                        <div className="vr"></div>
                        <div>
                        <div>
                            <h2>{this.props.username} <span> </span> <span className="status green"></span></h2>
                        </div>
                            <Badge className="badge" badgeContent={this.props.roomNotification.length} color="secondary" onClick={this.openUserNotifications}>
                                <BellIcon active={this.props.bellRing} animate={this.props.bellRing} color="black" width="25px" />
                            </Badge>
                            <Notifications open={this.state.openNotifications} handleClose={this.handleCloseNotifications}
                                notifications={this.props.roomNotification} roomMessages={this.props.broadcastMessage} />
                               
                        </div>
                       
                    </header> */}
        <TextField
          id="search full-width"
          label="Search members"
          type="search"
          
          margin="normal"
        />
                    <ul >
                        {this.props.roomNotification.map((notification, i) =>
                            <li key={i}>
                                <img src={userImage} alt="Default-User" id="userImage" />
                                <div>
                                    <div><h2 style={{ textAlign: "left", float: "left" }}>{notification.sender.split('~')[0]}</h2>
                                        {/* <h3 style={{textAlign:"right", float:"right"}}>{notification.sender.split('~')[1]}</h3> */}
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
