import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import {toast} from 'react-toastify';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '../node_modules/react-toastify/dist/ReactToastify.min.css';

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Create from './components/Create';
import Cart from './components/Cart';
import Default from './components/Default';
import Login from './components/Login';
import Signup from './components/Signup';

import { UserProvider } from './components/context/UserContext.js';
import Details from './components/Details';
import Edit from './components/Edit';

toast.configure({
  autoClose: 2000,
  hideProgressBar: true
});

class App extends Component {
  constructor(){
    super();

    this.defaultUserState = {
        isLoggedIn: false,
        isAdmin: false,
        username: '',
    };
    const localUserState = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : this.defaultUserState;

    this.state = {
      userState: {
        ...localUserState,
      },
      products: [],
      cart: [],
      details: {}
    };
    
  }

  setProducts = (products) => {
    this.setState({
      products
    });
  }

  getProductDetails = (id) => {
    const idx = this.state.products.findIndex(item => {
      return item._id === id;
    });

    this.setState({
      details: this.state.products[idx]
    });
  }

  addItemToCart = (itme) => {

  }

  updateUserState = (userState) => {
    this.setState({
      userState: {...userState}
    });
    
  }

  logout = (event) => {
    event.preventDefault();
    
    this.setState({
      userState: {...this.defaultUserState}
    }, () => {
      
      window.localStorage.clear();
      toast.info('You are logged out!');
    });
    
  }

  render() {
    return (
      <UserProvider value = 
        {
          {
            ...this.state,
            updateUserState: this.updateUserState,
            setProducts: this.setProducts,
            getProductDetails: this.getProductDetails,
            addItemToCart: this.addItemToCart
          }
        }>
        <Navbar logout={this.logout}/>
        <Switch>
          <Route exact path='/' component={ProductList}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/create' component={() => <Create isAdmin={this.state.userState.isAdmin}/>}/>
          <Route exact path='/cart' component={Cart}/>
          <Route exact path='/details' component={() => <Details details={this.state.details} isAdmin={this.state.userState.isAdmin}/>} />
          <Route exact path='/edit' component={() => <Edit userData = {this.state}/>}/>
          <Route exact component={Default}/>
        </Switch>
      </UserProvider>
    );
  }
}

export default App;
