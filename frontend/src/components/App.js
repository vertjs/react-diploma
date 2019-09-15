import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeadPage from './HeadPage'
import Catalog from './Catalog'
import Menu from './Menu'
import Footer from './Footer'

export default function App() {
  return (
    <Router>
      <Menu />
        <Switch>
          <Route path="/" exact component={HeadPage} />
          <Route path="/catalog" component={Catalog} />
        </Switch>
      <Footer/>
    </Router>
  );
}