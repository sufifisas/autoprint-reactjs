import React from 'react';
import {Link,NavLink, withRouter} from 'react-router-dom';
import White from '../../img/logo-wht.png'


function Header(props) {
  

  return (
    <div className="header" id="header">
      <div className="container-lg content">
        
        <nav>
          <span className="logo" style={{position:"inherit", width:'15%'}}>
          <Link to='/user'>
            <img src={White} alt=""/></Link>
          </span>
            <ul>
              {/* <NavLink exact={true} activeStyle={{ color: '#000' }} to='/user'><li>Home</li></NavLink> */}
              <NavLink activeStyle={{ color: '#000' }} to="/user/order"><li>Order</li></NavLink>
              <NavLink activeStyle={{ color: '#000' }} to="/user/activity"><li>Notification</li></NavLink>
              <NavLink activeStyle={{ color: '#000' }} to="/user/contact"><li>Customer Support</li></NavLink>
              <NavLink activeStyle={{ color: '#000' }} to="/user/profile" ><li>Account</li></NavLink>
              <p style={{marginBottom: '0px'}}>MYR {localStorage.getItem("wallet")}</p>
            </ul>
            
        </nav>
      </div>
    </div>
  );
}


export default withRouter(Header);