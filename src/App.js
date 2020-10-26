import React from 'react';
import './css/app.css';
import Landing from './main/Landing'
import User from './user/User'
import Vendor from './vendor/Vendor'

import { BrowserRouter as Router, Switch , Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/user" component={User} />
          <Route path="/vendor" component={Vendor} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
