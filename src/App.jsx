import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import NavBar from "./NavBar.jsx"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:'Anonymous', 
      messages: [],
      activeConnections:0
    };
  }

  componentDidMount() {
   // console.log("<App /> has mounted");
    this.socket  = new WebSocket('ws://localhost:3001')
    /*window._ws=ws  this alows the browser to access the ws variable.*/ 
    // this.WebSocket=ws;
    
    this.socket.onopen = (e) => {
      console.log("Connected to the server")
    };
   
    
    this.socket.onmessage = (e) => {
      //console.log('this is the message ===> ', e);
      // The socket event data is encoded as a JSON string.  
      // This line turns it into an object
      const data = JSON.parse(e.data);
      console.log('this is the data ===>', data)
      switch(data.type) {
        case 'incomingMessage':
          this.setState({
            messages:this.state.messages.concat(data)
          });
          break;
        case 'incomingNotification':
          this.setState({
            currentUser: data.userName,
            messages:this.state.messages.concat(data)
            
          }, )
          break;
        case 'connectedUsers':
          this.setState({
            activeConnections: data.userCount
          });
          break;
        default:
          break;
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



  changeUsername = (user) =>  {
    if(this.state.currentUser !== user) {
      const notificationObj = {
        type: "postNotification",
        content: `${this.state.currentUser} changed their name to ${user}`,
        userName:user
      }
      this.socket.send(JSON.stringify(notificationObj));
      //this.setState({ currentUser: {name: user}})
    }
  }

  //this appends the message to the state and sends it to the server
  appendMessage = (message) => {
    const messageObj = { 
      type:"postMessage",
      content:message ,
      userName :this.state.currentUser
    } 
    
    this.socket.send(JSON.stringify(  messageObj ))
  }   


  render() {
    console.log('app', this.state)
    return (
      <div>
        {/* ===NAV BAR COMPONENT== */}
        <NavBar
          activeConnections={this.state.activeConnections}
        />
        {/* ===MESSAGE LIST COMPONENT== */}
        <MessageList messages={this.state.messages} />
        {/* ===CHAT BAR COMPONENT== */}
        <ChatBar
          currentUser={this.state.currentUser}
          changeUsername={this.changeUsername}
          appendMessage={this.appendMessage}
        />
      </div>
    )
  }
}
export default App;
