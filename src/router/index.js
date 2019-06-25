import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const User = () => <div>user</div>;

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/user" component={User} />
    </Switch>
  </Router>
);

export default AppRouter;
