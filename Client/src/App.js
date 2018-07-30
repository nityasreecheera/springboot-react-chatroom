import React, { Component } from 'react';
import ChatBox from './ChatBoxComponent'
// Re-using my ErrorBoundary Component 
import ErrorBoundary from 'react-error-boundary-component-fallback2';


class App extends Component {
  refreshPage(){
    window.location.reload();
  }

  render() {
    return (
      <ErrorBoundary headerColor="lightseagreen" errorTitle="Server Error" 
      errorText="Unable to not connect you to the Chat Room Server. Please refresh this page and try again!" 
      buttonType={['', 'primary', '', '']} buttonLabel={['', 'Refresh', '', '']} modal={true} autoScrollBodyContent={false}
      customContentStyle={null} onClick={this.refreshPage}>
        <ChatBox />
      </ErrorBoundary>

    );
  }
}

export default App;
