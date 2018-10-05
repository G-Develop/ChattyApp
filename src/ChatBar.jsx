import React, {Component} from 'react';

class ChatBar extends Component {
  
handle_onChange = (e) => {
  console.log(e.target.name)
  console.log("handle_onChange")
 this.setState({[e.target.name]: e.target.value}) 
  console.log("this.state",this.state)
  
}



handle_eEnter = e => {
  console.log("this is the event", e)
  if (e.keyCode== 13) {      // keycode 13 is the enter key
    console.log("enter detected")
    e.preventDefault();
    console.log(this.state)
   // console.log("text area contents", e.target.value) //e.target.value will give the value of the event target
    const textAreaContents = e.target.value
   // const newmessage = {username:this.props.user} 
  //  const messages = this.state.messages.concat(newmessage);
  //  this.state.messages.concat(newmessage)
  //  e.target.value = '';
  //  this.setstate({messages:[...this.state.messages,]})
  }
}


  
  render() {
    return (
    <footer className="chatbar">
      <input name="user" onChange = {this.handle_onChange} value = {this.state.user} className="chatbar-username" placeholder="Your Name (Optional)"/>
      <input name="message" onChange = {this.handle_onChange} value = {this.state.message} onKeyDown={this.handle_eEnter} className="chatbar-message" placeholder="Type a message and hit ENTER"/>
    </footer>)
  }

}


  //  const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //  const messages = this.state.messages.concat(newMessage)
export default ChatBar;
