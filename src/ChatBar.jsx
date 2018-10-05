import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      message: ""
    }
  }


handle_onChange = (e) => {
  console.log(e.target.name)
  console.log("handle_onChange")
 this.setState({[e.target.name]: e.target.value}) 
  console.log("this.state",this.state)
  
}

handle_SelectUser = e => {
  if(event.key == 'Enter') {
    e.preventDefault();
    this.props.user(this.state.name);
  }
}

handle_eEnter = e => {
  console.log("this is the handleEnter", e)
  if (e.keyCode== 13) {
    console.log("enter detected")
    e.preventDefault();
    this.props.addText(this.state.text);
    e.target.value = '';
    this.setState({messages:[...this.state.messages,]})
  }
}


  
  render() {
    return (
    <footer className="chatbar">
      <input name="user" onChange = {this.handle_SelectUser}className="chatbar-username" defaultValue={this.props.currentUser} placeholder="Your Name (Optional)"/>
      <input name="message" onKeyDown={this.handle_eEnter} className="chatbar-message" placeholder="Type a message and hit ENTER"/>
    </footer>)
  }

}


  //  const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //  const messages = this.state.messages.concat(newMessage)
export default ChatBar;
