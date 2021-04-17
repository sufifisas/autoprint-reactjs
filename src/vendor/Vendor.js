import React, { Component } from "react";
import axios from 'axios';
import "../css/app.css";
import Footer from "../components/Footer";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import Order from "./components/Order";
import Vendorheader from "./components/Vendorheader";
import Vendorside from "./components/Vendorside";
import Document from './components/Document'
import Printer from './components/Printer'
import Product from './components/Product'
import Activity from './components/Activity'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

class Vendor extends Component {
  state = {
    loggedIn: true,
  };

  // componentDidMount() {
  //   const token = localStorage.getItem("token");
  //   if (token === null) {
  //     this.setState({ loggedIn: false });
  //   }
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': localStorage.getItem('token')
  //   }
  //   const id = localStorage.getItem("id");
  //   axios.get('/vendor/users/'+ id ,{headers})
  //     .then(res => {
  //         console.log(res)
  //         localStorage.setItem("vendorId",res.data.id)
  //     })
  // }

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Router>
          <div className="app">
              <Vendorheader />
              <div className="index container-lg vendor">
                <Vendorside />
                  <Switch>
                    <Route path ="/vendor/"  exact component={Home} />
                    <Route path ="/vendor/order"  exact component={Order} />
                    <Route path="/vendor/order/:id" component={Document} />
                    <Route path ="/vendor/printer"  exact component={Printer} />
                    <Route path ="/vendor/product"  exact component={Product} />
                    <Route path="/vendor/contact" exact component={Contact} />
                    <Route path="/vendor/activity" exact component={Activity} />

                    <Route path="/vendor/profile" exact component={Profile} />
                  </Switch>
            </div>
            <Footer color="#8860D0"/>
          </div>
        </Router>
      </div>
    );
  }
}
export default Vendor;
