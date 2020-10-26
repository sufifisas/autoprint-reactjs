import React, {Component} from 'react';
import {Link,NavLink} from 'react-router-dom';
import White from '../../img/logo-wht.png'
import Logout from '../../components/Logout'


class Header extends Component {
 
  render(){
  
  return (
    <div className="header" id="header">
      <div className="container">
        <span className="logo">
        <Link to='/user'>
          <img src={White} alt=""/></Link>
        </span>
        <nav>
            <ul>
              <NavLink exact={true} activeStyle={{ color: '#000' }} to='/user'><li>Home</li></NavLink>
              <NavLink activeStyle={{ color: '#000' }} to="/user/activity"><li>Activity</li></NavLink>
              <NavLink activeStyle={{ color: '#000' }} to="/user/contact"><li>Contact</li></NavLink>
              <NavLink activeStyle={{ color: '#000' }} to="/user/profile" ><li>Account</li></NavLink>
              <Logout />
            </ul>
            
        </nav>
      </div>
    </div>
  );
}
}

export default Header;