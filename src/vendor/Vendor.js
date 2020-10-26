import React, { Component } from "react";
import "../css/app.css";
import Footer from "../components/Footer";
import Profile from "../vendor/components/Profile";
import Contact from "../vendor/components/Contact";
import Vendorheader from "../vendor/components/Vendorheader";
import Vendorside from "../vendor/components/Vendorside";
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

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.setState({ loggedIn: false });
    }
  }

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Router>
          <div className="app">
            <div className="index">
              <Vendorheader />
              <div className="side">
                <Vendorside />
                <div className="vendorcont">
                  <Switch>
                    <Route path="/vendor/contact" component={Contact} />
                    <Route path="/vendor/profile" component={Profile} />
                  </Switch>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}
export default Vendor;
