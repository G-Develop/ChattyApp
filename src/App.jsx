import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: "Bob"
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?"
        }, {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]

    };
  }
  render() {
    return (<div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <main className="messages">
        <div className="message">
          <span className="message-username">Anonymous1</span>
          <span className="message-content">I won't be impressed with technology until I can download food.</span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
          <h1>{this.state.currentUser.name}</h1>

        </div>
      </main>
<ChatBar />
    </div>);
  }
}
export default App;
