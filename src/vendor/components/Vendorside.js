import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


class Vendorside extends Component {
 
  render(){
  
  return (
    <div className="sidenav">
        <nav>
            <ul>
              <NavLink activeStyle={{ color: '#8860D0',backgroundColor:"#e9e9e9" }} to='/vendor/order'><li>Order</li></NavLink>
              <NavLink activeStyle={{ color: '#8860D0',backgroundColor:"#e9e9e9" }} to='/vendor/printer'><li>Printer</li></NavLink>
              <NavLink activeStyle={{ color: '#8860D0',backgroundColor:"#e9e9e9" }} to='/vendor/product'><li>Product</li></NavLink>
              <NavLink activeStyle={{ color: '#8860D0',backgroundColor:"#e9e9e9" }} to="/vendor/contact"><li>Customer Support</li></NavLink>
              <NavLink activeStyle={{ color: '#8860D0',backgroundColor:"#e9e9e9" }} to="/vendor/profile" ><li>Account</li></NavLink>
            </ul>
            
        </nav>
    </div>
  );
}
}

export default Vendorside;