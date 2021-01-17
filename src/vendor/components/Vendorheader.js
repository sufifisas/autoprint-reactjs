import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Purple from '../../img/logo-ppl.png'
import Logout from '../../components/Logout'


class Vendorheader extends Component {
 
  render(){
  
  return (
    <div className="header container-lg vendor" id="header">
      <div className="head" style={{padding:"10px 0px"}}>
        
        <nav>
        
            <ul style={{marginLeft:'none', width:'100%'}}>
            <span className="logo" style={{position:"inherit"}}>
              <img style={{width: '30%'}} src={Purple} alt=""/>
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