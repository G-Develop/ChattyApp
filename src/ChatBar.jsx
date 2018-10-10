import React, {Component} from 'react';

class ChatBar extends Component {



  handle_eMessageEnter = e => {
    //console.log("this is the event", e)
    if (e.keyCode == 13) { // keycode 13 is the enter key
      console.log("enter detected")
      e.preventDefault();
      this.props.appendMessage(e.target.value);
    }
  }

  handle_eNameEnter = e => {
    console.log("this is the event", e)
    if (e.keyCode == 13) { // keycode 13 is the enter key
      e.preventDefault();
      this.props.changeUsername(e.target.value);
    }
  }

  render() {
    return (
    <footer className="chatbar">
      <input 
        name="user" 
        defaultValue={this.props.currentUser}  
        onKeyDown={this.handle_eNameEnter} 
        className="chatbar-username" 
        placeholder="Your Name (Optional)"
      />
      
      <input name="message" 
        onKeyDown={this.handle_eMessageEnter} 
        className="chatbar-message" 
        placeholder="Type a message and hit ENTER"
      />
    </footer>)
  }

}

//  const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
//  const messages = this.state.messages.concat(newMessage)
export default ChatBar;



































