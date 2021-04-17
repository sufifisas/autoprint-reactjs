import React, { Component } from "react";
import "../css/app.css";
import Footer from "../components/Footer";
import Header from "../user/components/Header";
import Home from "../user/components/Home";
import Profile from "../user/components/Profile";
import Contact from "../user/components/Contact";
import Activity from "../user/components/Activity";
import Order from "../user/components/Order";
import Document from "../user/components/Document";
import Topup from "../user/components/Topup";
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

class User extends Component {
  state = {
    loggedIn: true,
    userIn: true
  };

  // componentDidMount() {
  //   const token = localStorage.getItem("token");
  //   if (token === null || localStorage.getItem("type")==="VENDOR") {
  //     this.setState({ loggedIn: false });
  //   }
  //   else if(localStorage.getItem("type") === "VENDOR"){
  //     this.setState({ userIn: false });
  //   }
  //   const headers = {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'superadmin_576a0a1284a853b56f50e876273cdadbfd8ec13408223f1492617a75399921c4'
  //     }
  //   const id = localStorage.getItem("id");
  //   axios.get('/user/'+ id ,{headers})
  //   .then(res => {
  //       localStorage.setItem("wallet",res.data.amount)
  //       localStorage.setItem("loader",true)
  //   }) 
  // }

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/" />;
    }


    return (
      <div>
        <Router>
          <div className="app">
          <Header />
            <div className="index">
                <Switch>
                  <Route path="/user/" exact component={Home} />
                  <Route path="/user/order/" exact component={Order} />
                  <Route path="/user/order/:id" component={Document} />
                  <Route path="/user/activity" exact component={Activity} />
                  <Route path="/user/contact" exact component={Contact} />
                  <Route path="/user/profile" exact component={Profile} />
                  <Route path="/user/topup" exact component={Topup} />
                </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}
export default User;
