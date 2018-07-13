import React, { Component } from 'react';
import ChatBox from './ChatBoxComponent'
// Re-using my ErrorBoundary Component 
import ErrorBoundary from 'react-error-boundary-component-fallback';


class App extends Component {
  render() {
    return (
      <ErrorBoundary headerColor="lightseagreen" errorTitle="Server Error" errorText="Unable to not connect you to the Chat Room Server. Please refresh this page and try again!" buttonType={['', 'primary', '', '']} buttonLabel={['', 'OK', '', '']} modal={true} autoScrollBodyContent={false} customContentStyle={null}>
        <ChatBox />
      </ErrorBoundary>

    );
  }
}

export default App;
