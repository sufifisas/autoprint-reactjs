import React, { Component } from "react";
import "../css/app.css";
import Footer from "../components/Footer";
import Header from "../user/components/Header";
import Profile from "../user/components/Profile";
import Contact from "../user/components/Contact";
import Activity from "../user/components/Activity";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

class User extends Component {
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
              <Header />
              <Switch>
                <Route path="/user/activity" exact component={Activity} />
                <Route path="/user/contact" exact component={Contact} />
                <Route path="/user/profile" exact component={Profile} />
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
