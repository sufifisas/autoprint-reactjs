import React ,{Component}from 'react';
import '../css/app.css';
import Footer from '../components/Footer'
import Landingheader from '../components/Landingheader'
import Home from '../components/Home'
import {Redirect} from 'react-router-dom'

class Landing extends Component {
	constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        const type = localStorage.getItem("type")
        let loggedIn = true
        let userIn = true

        if(token === null){
        loggedIn = false
        }
        if(type === "VENDOR"){
          userIn = false
        }

		this.state = {
        loggedIn,
        userIn  
        }    
    }
  render=()=>{
    if(this.state.loggedIn){
      if(this.state.userIn){
        return <Redirect to="/user" />
      }
      return <Redirect to="/vendor" />
    }
  
  return (
    
    <div className="app">
      <div className="index">
      <Landingheader />
      <Home />
      </div>
      <Footer />
    </div>
    
  );}
}

export default Landing;