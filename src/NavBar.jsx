import React, {Component} from 'react';

class NavBar extends Component {

  render() {
    return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <h1>{this.props.activeConnections} </h1> 
    </nav>)
  }
}

export default NavBar;


































