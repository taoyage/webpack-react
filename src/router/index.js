import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from 'views/user/login';

const User = () => <div>user1</div>;

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/user" component={User} />
    </Switch>
  </Router>
);

export default AppRouter;
