import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { useEffect } from "react";
import Home from './components/pages/HomePage/Home';
import Checkout from './components/pages/RestaurantPage/CheckoutPage/Checkout';
import Restaurant from './components/pages/RestaurantPage/Restaurant';
import AdminData from './components/pages/AdminPage/AdminData';




function App() {
  return (
    <Router>
      <Switch>
        <Route path='/admin' exact component={AdminData} />
        <Route path='/' exact component={Home} />
        <Route path='/checkout' exact component={Checkout} />
        <Route path='/:restaurantId' component={Restaurant} />
      </Switch>
    </Router>
  );
}

export default App;
