import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/logo-02.png'
import Login from './Login'
import LoginModal from './LoginModal'

class Landingheader extends Component {
  render(){
    const home = {
      backgroundColor: "transparent",
      position: "absolute",
      padding: '20px 0px'
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
              <li>
                <Link to='/user'>
                  User
                </Link>
              </li>
              <li>
                <Link to='/vendor'>
                  Vendor
                </Link>
              </li>
            </ul>
            <LoginModal title="welcome back!"/>
        </nav>
      </div>
    </div>
    );
}
}

export default Landingheader;