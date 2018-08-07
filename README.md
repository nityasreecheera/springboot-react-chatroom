# springboot-react-chatroom
 Using Spring Boot with WebSocket API  and React with Material-UI to build a simple group chat application onfiguration
 
 Server Configuration: I have used spring boot configurations to configure websocket connection with STOMP and sockJS
 ========================
 
 WebSocket 
 ============
 WebSocket is a communication protocol that makes it possible to establish a two-way communication channel between a server and a  client.
 WebSocket works by first establishing a regular HTTP connection with the server and then upgrading it to a bidirectional websocket       connection by sending an Upgrade header.
 
 WebSocket Configuration
 ==========================
 * The first step is to configure the websocket endpoint and message broker for which <code>@EnableWebSocketMessageBroker</code> is used to enable our WebSocket server. I have implemented <code>WebSocketMessageBrokerConfigurer</code> interface and provide implementation for some of its methods to configure the websocket connection.
 * SockJS has been used to enable fallback options for browsers that don’t support websocket.
 *  Spring frameworks STOMP implementation has been used. STOMP stands for Simple Text Oriented Messaging Protocol. It is a messaging    protocol that defines the format and rules for data exchange because WebSocket is just a communication protocol. It doesn’t define things like - How to send a message only to users who are subscribed to a particular topic, or how to send a message to a particular user. We need STOMP for these functionalities.
 * A message broker has been configured that will be used to route messages from one client to another.I have enabled a simple in-memory  message broker. But you’re free to use any other full-featured message broker like RabbitMQ or ActiveMQ.
 
WebSocket Event Listeners
============================
I have used event listeners to listen for socket connect and disconnect events so that we can log these events and also broadcast them when a user joins or leaves the chat room.

Spring Boot Setup Prerequisites 
======================
 JDK 8
 
 Spring Boot
 
 STS or Eclipse  
 
 Tomcat(embedded with Spring) 
 
 Maven


Client Configuration: The front end of the application has been developed using react js components 
========================

* The connect() function uses SockJS and stomp client to connect to the /ws endpoint that we configured in Spring Boot.

* Upon successful connection, the client subscribes to /topic/public destination and tells the user’s name to the server by sending a    message to the /app/addUser destination.

* The stompClient.subscribe() function takes a callback method which is called whenever a message arrives on the subscribed topic.

* Rest of the code is used to display and format the messages on the screen.

React Setup Prerequisites and Dependencies
==========================
Node

NPM

create-react-app

material-ui

react-stomp and sockjs-client

Visual Studio Code

Setting up the proxy
=========================

To have the Webpack development server proxy our requests to our Server, we just need to add the following line to package.json:

<code>"proxy": "http://localhost:8080/", </code>

Features
===============
* Built with Spring Boot and Reactjs
* User login
* Chat message broadcasting (no private message support for now)
* Presence tracking and sending notifications when users join / leave
* Broadcast notifications when users are typing


Finally
=============
Boot both the Server and Client apps and you're in the business. Enter any username and click Start Chatting button to enter into the chat room. If no one is available in the chat room, then you can open the app in two tabs, login with different usernames and start sending messages. You will see the below chat room UI

![alt text](https://github.com/RatneshChauhan/springboot-react-chatroom/blob/master/Client/chat-box.png "Chat Room")

Author
=============
Ratnesh Chauhan, Full Stack Developer

Note: Everything is tested on Windows environment on Laptop device

License
==============
The MIT License (MIT)

Copyright (c) 2018 Ratnesh Chauhan

Permission is hereby granted, free of charge, to any person obtaining a copy of this application and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.


