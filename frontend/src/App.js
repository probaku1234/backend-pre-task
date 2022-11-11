import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';

import ProfileCardList from './pages/profileCardList';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ProfileCardList} />
    </Switch>
  </Router>
);

export default App;
