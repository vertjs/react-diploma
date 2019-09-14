import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeadPage from './HeadPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HeadPage} />
      </Switch>
    </Router>
  );
}

export default App;
