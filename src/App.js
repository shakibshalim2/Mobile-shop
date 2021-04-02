import './App.css';

import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Checkout from './Components/CheckoutPage/Checkout';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Login from './Components/Login/Login';
import Orders from './Components/Orders/Orders';
import Admin from './Components/Admin/Admin';


export const UserContext = createContext();




function App() {
  const [loggedInUser, setLoggedInUser] = useState({})


  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <PrivateRoute path='/orders'>
            <Orders></Orders>
          </PrivateRoute>
          <PrivateRoute path="/product/:id">
            <ProductDetail></ProductDetail>
          </PrivateRoute>
          <PrivateRoute path='/admin'>
            <Admin></Admin>
          </PrivateRoute>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path="/checkout">
            <Checkout></Checkout>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
