import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      message: ""
    }
  }

  handleChange = (event) => {
    console.log(event.target.name)
    this.setState({[event.target.name]: event.target.value})
        console.log("this.state",this.state)
  }


  /*handleUserNameSubmit = event => {
    if(event.key == 'Enter') {
      event.preventDefault();
      this.props.user(this.state.name);
    }
  }

  handleTextSubmit = event => {
    if(event.key== 'Enter') {
      event.preventDefault();
      this.props.addText(this.state.text);
      event.target.value = '';
      this.setState({text: ""})
    }
  }*/


  render() {
    return (
    <footer className="chatbar">
      <input name="user" onChange={this.handleChange} className="chatbar-username" defaultValue={this.props.currentUser} placeholder="Your Name (Optional)"/>
      <input name="message" onChange={this.handleChange} className="chatbar-message" placeholder="Type a message and hit ENTER"/>
    </footer>)

  }

}

export default ChatBar;
