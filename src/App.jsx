import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  componentDidMount() {
    const ws = new WebSocket('ws://localhost:3001')
    console.log("connected to server")
//    window._ws=ws // this alows the browser to access the ws variable. 
    this.WebSocket=ws;


/*  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);*/
}

/*  changeUsername = (username) =>  {
    this.setState({currentUser: {name: username}}, () => {console.log(this.state.currentUser)})
  }*/

  appendMessage = (message) => {
    const messageObj = { 
      message:message,
      currentUser:this.state.currentUser.name
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
