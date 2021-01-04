import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Logout extends Component {
  exit = (e) => {
    localStorage.clear()
  };

  render() {
    if(localStorage.getItem("type") === "VENDOR"){
      return <a href="/" onClick={this.exit}><button style = {{borderColor:"#8860D0", color:"#8860D0"}}>Log Out</button></a>
    }
    return <a href="/" onClick={this.exit}><button>Log Out</button></a>;
  }
}

export default withRouter(Logout);
