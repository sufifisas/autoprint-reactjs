import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


class Vendorside extends Component {
 
  render(){
  
  return (
    <div className="sidenav">
        <nav>
            <ul>
              <NavLink activeStyle={{ color: '#8860D0',backgroundColor:"#e9e9e9" }} to='/dashboard'><li>Home</li></NavLink>
              <NavLink activeStyle={{ color: '#8860D0',backgroundColor:"#e9e9e9" }} to="/vendor/contact"><li>Contact</li></NavLink>
              <NavLink activeStyle={{ color: '#8860D0',backgroundColor:"#e9e9e9" }} to="/vendor/profile" ><li>Account</li></NavLink>
            </ul>
            
        </nav>
    </div>
  );
}
}

export default Vendorside;