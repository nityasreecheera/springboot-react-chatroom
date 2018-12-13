import React, { Component } from 'react';

import Menu from './menu-app-bar/MenuAppBar'
import Aside from './aside/Aside'
import Login from './login/Login'
import Footer from './footer/Footer'

// Styling
import './ChatBox.css';
// Default user image
import userImage from './userImage.png';
// import backToTop from './backToTop.png';

var stompClient = null;

export default class ChatBoxComponent extends Component {
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
        curTime: '',
        openNotifications: false,
        bellRing: false
      };
  }

  connect = (userName) => {

    if (userName) {

      this.setState({
        username: userName
      })

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

    // Subscribing to the public topic
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

  sendMessage = (type, value) => {

    if (stompClient) {
      var chatMessage = {
        sender: this.state.username,
        content: type === 'TYPING' ? value : value,
        type: type

      };

      stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));

      // clear message text box after sending the message

    }
  }

  onMessageReceived = (payload) => {

    var message = JSON.parse(payload.body);

    if (message.type === 'JOIN') {

      this.state.roomNotification.push({ 'sender': message.sender + " ~ joined", 'status': 'online', 'dateTime': message.dateTime })

      this.setState({
        roomNotification: this.state.roomNotification,
        bellRing: true
      })

    }
    else if (message.type === 'LEAVE') {
      this.state.roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " ~ joined") {
          notification.status = "offline";
          notification.sender = message.sender + " ~ left";
          notification.dateTime = message.dateTime;
        }
      })
      this.setState({
        roomNotification: this.state.roomNotification,
        bellRing: true
      })
    }
    else if (message.type === 'TYPING') {

      this.state.roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " ~ joined") {
          if (message.content)
            notification.status = "typing...";
          else
            notification.status = "online";
        }

      })
      this.setState({
        roomNotification: this.state.roomNotification
      })
    }
    else if (message.type === 'CHAT') {

      this.state.roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " ~ joined") {
          notification.status = "online";
        }
      })
      this.state.broadcastMessage.push({
        message: message.content,
        sender: message.sender,
        dateTime: message.dateTime
      })
      this.setState({
        broadcastMessage: this.state.broadcastMessage,

      })
    }
    else {
      // do nothing...
    }
  }

  fetchHostory = () => {
    alert('History Not Available!\nIt is Not Yet Implemented!');
  }

  scrollToBottom = () => {
    var object = this.refs.messageBox;
    if (object)
      object.scrollTop = object.scrollHeight;
  }

  // getRandomColor = () => {
  //   var letters = '0123456789ABCDEF';
  //   var color = '#';
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  componentDidUpdate() {
    if (this.state.error) {
      throw new Error('Unable to connect to chat room server.');
    }
    else {
      this.scrollToBottom();
    }
  }

  componentDidMount() {
    this.setState({
      curTime: new Date().toLocaleString()
    })

    this.timerID = setInterval(
      () => this.state.bellRing ? this.setState({
        bellRing: false
      }) : "",
      10000
    );

  }
  render() {

    return (
      <div id="container">
        {this.state.channelConnected ?
          (


            <div>
              <Menu roomNotification={this.state.roomNotification}
                bellRing={this.state.bellRing}
                openNotifications={this.state.openNotifications}
                username={this.state.username}
                broadcastMessage={this.state.broadcastMessage}/>
                
              <Aside  roomNotification={this.state.roomNotification}
                bellRing={this.state.bellRing}
                openNotifications={this.state.openNotifications}
                username={this.state.username}
                broadcastMessage={this.state.broadcastMessage} />
             
              
              <ul id="chat"  ref="messageBox">
                {/* {this.state.broadcastMessage.length ?
                  [<div id="history"><div id="old" onClick={this.fetchHostory}>Older</div><hr /><div id="today">Today</div></div>] : ""} */}
                {this.state.broadcastMessage.map((msg, i) =>
                  this.state.username === msg.sender ?
                    <li className="you" key={i}>
                      <div className="entete">
                        <h2><img src={userImage} alt="Default-User" className="avatar" />
                          <span> </span>
                         <span className="sender"> {msg.sender} ~ (You)</span></h2>
                        <span> </span>
                        {/* <span className="status green"></span> */}
                      </div>
                      <div className="triangle"></div>
                      <div className="message">
                        {msg.message}
                      </div>
                      <div><h3>{msg.dateTime}</h3></div>
                    </li>
                    :
                    <li className="others">
                      <div className="entete">
                        {/* <span className="status blue"></span> */}
                        <span> </span>
                        <img src={userImage} alt="Default-User" className="avatar" />
                        <span> </span>
                        <span className="sender">{msg.sender}</span>
                      </div>
                      <div className="triangle"></div>
                      <div className="message">
                        {msg.message}
                      </div>
                      <div><h3>{msg.dateTime}</h3></div>
                    </li>
                )}

              </ul>
              <div></div>
               <Footer sendMessage={this.sendMessage}/>
            </div>
         

          ) : (
            <Login connect={this.connect} />
            
          )
        }
      </div>
    )
  }
}