import React,{useState,useEffect} from 'react';
import {Link,NavLink, withRouter} from 'react-router-dom';
import White from '../../img/logo-02.png'
import Logout from '../../components/Logout'


function Header(props) {
  const [scrolled,setScrolled]=useState(false);
  const handleScroll=() => {
      const offset=window.scrollY;
      if(offset > 170 ){
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
    }

    useEffect(() => {
      window.addEventListener('scroll',handleScroll)
    })
  let navbarClasses=['header'];
    if(scrolled){
      navbarClasses.push('scrolled');
    }

    const exit = () => {
      localStorage.clear()
      window.location.reload()
  }; 

  return (
    <div className={navbarClasses.join(" ")} id="header">
      <div className="container-lg content">
        
        <nav>
          <span className="logo" style={{position:"inherit", width:'10%'}}>
          <Link to='/user'>
            <img src={White} alt=""/></Link>
          </span>
            <ul>
              <NavLink exact={true} activeStyle={{ color: ' #5680E9' }} to='/user'><li>Home</li></NavLink>
              <NavLink activeStyle={{ color: ' #5680E9' }} to="/user/order"><li>Order</li></NavLink>
              <NavLink activeStyle={{ color: ' #5680E9' }} to="/user/activity"><li>Activity</li></NavLink>
              <NavLink activeStyle={{ color: ' #5680E9' }} to="/user/contact"><li>Customer Support</li></NavLink>
              <NavLink activeStyle={{ color: ' #5680E9' }} to="/user/profile" ><li>Account</li></NavLink>
              <Logout />
            </ul>
            
        </nav>
      </div>
    </div>
  );
}


export default withRouter(Header);