import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import User from '../pages/user';
import Accounts from '../pages/accounts';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/user" component={User} />
      <Route path="/accounts" component={Accounts} />
    </Switch>
  </Router>
);

export default AppRouter;
