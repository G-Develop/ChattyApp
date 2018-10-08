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
    console.log("<App /> has mounted");
    this.socket  = new WebSocket('ws://localhost:3001')
    /*window._ws=ws  this alows the browser to access the ws variable.*/ 
    // this.WebSocket=ws;
    
    this.socket.onopen = (e) => {
      console.log("Connected to the server")
    };
   
    this.socket.onmessage = (e) => {
      console.log(e);
      // The socket event data is encoded as a JSON string.  
      // This line turns it into an object
      const data = JSON.parse(e.data);
      console.log(data);
      switch(data.type) {
        case "incomingMessage":
          // handle incoming message
          console.log(data);
          const broadcastedMessage = data;
          this.setState({
            messages:this.state.messages.concat(broadcastedMessage)
          });
          break;
        case "incomingNotification":
          //handle incoming notification 
          console.log(data);
          const broadcastedNotification = data;
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
   };
  }


// this.socket.onmessage = (e) => {
 //     console.log(e.data);
  //    const broadcastedMessage = JSON.parse(e.data); 
   //   this.setState({
    //    messages:this.state.messages.concat(broadcastedMessage)
   // });
   // }









  changeUsername = (username) =>  {
    this.setState({currentUser: {name: username}}, () => {console.log(this.state.currentUser)})
  }

  //this appends the message to the state and sends it to the server
  appendMessage = (message) => {
    const messageObj = { 
      type:"postMessage",
      content:message,
      userName :this.state.currentUser.name
    } 
    this.socket.send(JSON.stringify( messageObj ))
    //const oldstate = {...this.state};
    //this.setState({
     // currentUser: oldstate.currentUser,
      //messages:oldstate.messages.concat({username:oldstate.currentUser.name,content:message})
    //})
  }   


  render() {
    console.log('app', this.state)
    return (
      <div>
      
      {/* ===NAV BAR COMPONENT=== */}
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
     
      
      {/* ===MESSAGE LIST COMPONENT== */}
        <MessageList messages={this.state.messages} />
     
      
      {/* ===CHAT BAR COMPONENT== */}
      <ChatBar
           currentUser = {this.state.currentUser.name}
           changeUsername =  {this.changeUsername}
           appendMessage = {this.appendMessage}
      />
      </div>
    )
  }
}
export default App;
