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

}


  
  render() {
    return (
    <footer className="chatbar">
      <input name="user" className="chatbar-username" defaultValue={this.props.currentUser} placeholder="Your Name (Optional)"/>
      <input name="message" onChange={this.handle_onChange} className="chatbar-message" placeholder="Type a message and hit ENTER"/>
    </footer>)

  }

}

export default ChatBar;
