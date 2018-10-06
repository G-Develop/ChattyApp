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
    //console.log(e.target.name)
    // console.log("handle_onChange")
    this.setState({
      [e.target.name]: e.target.value
    })
    //console.log("this.state", this.state)

  }

  handle_eMessageEnter = e => {
    //console.log("this is the event", e)
    if (e.keyCode == 13) { // keycode 13 is the enter key
      // console.log("enter detected")
      e.preventDefault();
      console.log(this.state)
      this.setState({message:this.state.message})
      // console.log("this is the new state ==>", this.state)
      this.props.message(this.state.message);
    }
  }

  handle_eNameEnter = e => {
    //console.log("this is the event", e)
    if (e.keyCode == 13) { // keycode 13 is the enter key
      // console.log("enter detected")
      e.preventDefault();
      // console.log(this.state)
      this.setState({user:this.state.user })
      // console.log("this is the new state ==>", this.state)
      this.props.user(this.state.user);
    }
  }




  render() {
    return (<footer className="chatbar">
      <input name="user" onChange={this.handle_onChange} value={this.state.user}  onKeyDown={this.handle_eNameEnter} className="chatbar-username" placeholder="Your Name (Optional)"/>
      <input name="message" onChange={this.handle_onChange} value={this.state.message} onKeyDown={this.handle_eMessageEnter} className="chatbar-message" placeholder="Type a message and hit ENTER"/>
    </footer>)
  }

}

//  const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
//  const messages = this.state.messages.concat(newMessage)
export default ChatBar;
