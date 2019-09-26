import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeadPage from './HeadPage'
import CatalogPage from './CatalogPage'
import About from './About'
import Contacts from './Contacts'
import Menu from './Menu'
import Footer from './Footer'
import ProductPage from './ProductPage'
import Page404 from './Page404'

export default function App() {
  return (
    <Router>
      <Menu />
        <Switch>
          <Route path='/' exact component={HeadPage} />
          <Route path='/catalog' exact component={CatalogPage} />
          <Route path='/about' component={About} />
          <Route path='/contacts' component={Contacts} />
          <Route path='/catalog:id' exact component={ProductPage} />
          <Route path='*' component={Page404} />
        </Switch>
      <Footer/>
    </Router>
  );
}