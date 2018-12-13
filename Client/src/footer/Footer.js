import React, { Component } from 'react';
import './Footer.css'
import TextField from '@material-ui/core/TextField';
export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                chatMessage: ''

            };
    }

    handleSendMessage = () => {

        this.props.sendMessage('CHAT', this.state.chatMessage)

            this.setState({
              chatMessage: ''
            })
    }

    handleTyping = (event) => {

        this.setState({
            chatMessage: event.target.value,
        });
        this.props.sendMessage('TYPING', event.target.value);

    };


    render() {
        return (
            
                <div className="footerComponent">
                    <TextField
                        id="msg"
                        label="Press enter to send"
                        placeholder="Type your message here..."
                        onChange={this.handleTyping}
                        margin="normal"
                        value={this.state.chatMessage}
                        fullWidth={true}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.handleSendMessage();
                            }
                        }}
                    />


                </div>

            
        )
    }
}
