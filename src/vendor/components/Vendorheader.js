import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Purple from '../../img/logo-ppl.png'
import Logout from '../../components/Logout'


class Vendorheader extends Component {
 
  render(){
  
  return (
    <div className="header" id="header" style={{backgroundColor:"#fff",borderBottom:"#e9e9e9 2px solid"}}>
      <div className="head" style={{padding:"10px 40px"}}>
        
        <nav>
        
            <ul style={{marginLeft:'none', width:'100%'}}>
            <span className="logo" style={{position:"inherit"}}>
            <Link to='/user'>
              <img src={Purple} alt=""/></Link>
            </span>
              <Logout />
            </ul>
            
        </nav>
      </div>
    </div>
  );
}
}

export default Vendorheader;