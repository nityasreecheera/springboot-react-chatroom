import React, { Component } from 'react';

// Material-UI 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';

// Styling
import './ChatBox.css';
import online from './green.png';
import offline from './red.png';


var stompClient = null;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        username: '',
        channelConnected: false,
        chatMessage: '',
        roomNotification: [],
        broadcastMessage: [],
        error: '',
        bottom: false,
      };
  }

  connect = (event) => {

    if (this.state.username) {

      const Stomp = require('stompjs')

      var SockJS = require('sockjs-client')

      SockJS = new SockJS('/ws')

      stompClient = Stomp.over(SockJS);

      stompClient.connect({}, this.onConnected, this.onError);

    }
  }

  onConnected = () => {

    this.setState({
      channelConnected: true
    })

    // Subscribe to the public topic
    stompClient.subscribe('/topic/public', this.onMessageReceived);

    // Registering user to server
    stompClient.send("/app/addUser",
      {},
      JSON.stringify({ sender: this.state.username, type: 'JOIN' })
    )
  }

  onError = (error) => {
    this.setState({
      error: 'Could not connect you to the Chat Room Server. Please refresh this page and try again!'
    })
  }

  sendMessage = (event) => {

    if (stompClient) {
      var chatMessage = {
        sender: this.state.username,
        content: this.state.chatMessage,
        type: 'CHAT'
      };

      stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));

      // clear message text box after sending the message
      this.setState({
        chatMessage: ''
      })

    }
  }

  onMessageReceived = (payload) => {
    var message = JSON.parse(payload.body);

    if (message.type === 'JOIN') {

      this.state.roomNotification.push(message.sender + ' joined!')

      this.setState({
        roomNotification: this.state.roomNotification
      })
    }
    else if (message.type === 'LEAVE') {

      this.state.roomNotification.push(message.sender + ' left!')

      this.setState({
        roomNotification: this.state.roomNotification
      })
    }
    else {

      this.state.broadcastMessage.push({
        message: message.content,
        sender: message.sender
      })

      this.setState({
        broadcastMessage: this.state.broadcastMessage
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleChatMSGChange = (event) => {
    this.setState({
      chatMessage: event.target.value,
    });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  }

  getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  errorStyle = {
    color: 'red'
  }

  roomNotifications = {
    color: 'rgb(227, 241, 57)'
  };

  render() {

    return (
      <div>

        {this.state.channelConnected ?
          (

            this.state.roomNotification.map((notification, i) =>
              <div id="notificationContainer" key={i}>
                <div key={i} style={this.roomNotifications} id="wrapper_1"><Avatar>{notification[0] + notification[1]}</Avatar>
                  {notification}
                  <div id="online-offline">
                    {notification.indexOf('joined') > -1 ? <img src={online} alt="online" width="20px" /> :
                      <img src={offline} alt="offline" width="20px" />}
                  </div>
                  <br /><Divider /></div></div>)
          ) : (
            <div>
              <TextField
                id="user"
                label="Type your username"
                placeholder="Username"
                onChange={this.handleChange}
                margin="normal"
              />
              <br />
              <Button variant="contained" color="primary" onClick={this.connect} >
                Start Chatting
       </Button>
            </div>)
        }

        {
          this.state.error ? <span style={this.errorStyle}>{this.state.error}</span> :
            this.state.broadcastMessage.map(
              (msg, i) =>
                <div key={i} >
                  {
                    this.state.username === msg.sender ?
                      <div className="bubble me">
                        <Avatar><Tooltip id="tooltip-top-start" title={msg.sender} placement="top-start">
                          <Button>{msg.sender[0] + msg.sender[1]}</Button></Tooltip></Avatar>
                        {msg.message}
                      </div>
                      :
                      <div className="bubble you">
                        <Avatar><Tooltip id="tooltip-top-start" title={msg.sender} placement="top-start">
                          <Button>{msg.sender[0] + msg.sender[1]}</Button></Tooltip></Avatar>
                        {msg.message}
                      </div>
                  }
                </div>
            )
        }
        <br />
        {this.state.channelConnected ?
          <div>
            <Drawer
              anchor="bottom"
              open={this.state.bottom}
              onClose={this.toggleDrawer('bottom', false)}
              id="Drawer"
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('bottom', true)}
                onKeyDown={this.toggleDrawer('bottom', true)}
              >
                <TextField
                  id="msg"
                  label="Press enter to send"
                  placeholder="Write your message here..."
                  onChange={this.handleChatMSGChange}
                  margin="normal"
                  value={this.state.chatMessage}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      this.sendMessage();
                      this.scrollToBottom();
                    }
                  }}
                />
              </div>
            </Drawer>
            <br />
            <Button onClick={this.toggleDrawer('bottom', true)}>Send Message</Button>
          </div>
          : ""}
      </div>
    )
  }
}