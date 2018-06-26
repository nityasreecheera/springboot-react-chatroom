import React, { Component } from 'react';
import ChatBox from './ChatBoxComponent'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React and Spring Boot Chat App Demo</h1>
        </header>
        <p className="App-intro">
          
        </p>
        <ChatBox/>
      </div>
    );
  }
}

export default App;
