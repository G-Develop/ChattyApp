import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
       
    };
  }

  componentDidMount() {
    const ws = new WebSocket('ws://localhost:3001')
    console.log("connected to server")
    /*window._ws=ws  this alows the browser to access the ws variable.*/ 
    this.WebSocket=ws;
  }

/*  changeUsername = (username) =>  {
    this.setState({currentUser: {name: username}}, () => {console.log(this.state.currentUser)})
  }*/

  appendMessage = (message) => {
    const messageObj = { 
      content:message,
      userName :this.state.currentUser.name
    } 
    this.WebSocket.send(JSON.stringify( messageObj ))
    const oldstate = {...this.state};
    this.setState({
      currentUser: oldstate.currentUser,
      messages:oldstate.messages.concat({username:oldstate.currentUser.name,content:message})
    })
  }


  render() {
    console.log('app', this.state)
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
      ========CHAT BAR  ===========
      <ChatBar
           currentUser = {this.state.currentUser.name}
           user =  {this.changeUsername}
           message = {this.appendMessage}
      />
      </div>
    )
  }
}
export default App;
