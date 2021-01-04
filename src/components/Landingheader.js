import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/logo-02.png'
import Login from './Login'

class Landingheader extends Component {
  render(){
    const home = {
      backgroundColor: "transparent",
      position: "absolute"
    };
    const bigLogo = {
      width : "25%",
    };
    return (  
      <div className="header" id="header" style={home}>
      <div className="container"> 
        <span className="logo" style={{position: "absolute", width:"40%"}}>
        <Link to='/'>
          <img src={Logo} alt="" style={bigLogo}/></Link>
        </span>
        <nav>
            <ul>
              {/* <li>Home</li>
              <li>About</li>
              <li>Contact</li> */}
            </ul>
            <Login />
        </nav>
      </div>
    </div>
    );
}
}

export default Landingheader;