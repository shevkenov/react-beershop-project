import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import {toast} from 'react-toastify';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '../node_modules/react-toastify/dist/ReactToastify.min.css';

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Create from './components/Create';
import Cart from './components/Cart/Cart';
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
      details: {},
      grandTotal: 0
    };
    
  }

  setProducts = (products) => {

    this.setState({
      products
    });
  }

  findProductIndex(id){
    return this.state.products.findIndex(item => {
      return item._id === id;
    });
  }

  getProductDetails = (id) => {
    const idx = this.findProductIndex(id);

    this.setState({
      details: this.state.products[idx]
    });
  }

  addItemToCart = (event,id) => {
    event.preventDefault();
    
    const chosenItem = this.state.products.filter(item => {
      return item._id === id;
    })[0];
    
    chosenItem.count = 1;
    chosenItem.total = chosenItem.price;
    
    this.setState({
      cart: [...this.state.cart, chosenItem]
    },() => {
      this.updateGrandTotal();
    });
  }

  increment = (id) => {
    const tempCart = [...this.state.cart];
    let item = tempCart.find(prd => {
      return prd._id === id;
    });

    item.count += 1;
    item.total = (+item.count * +item.price).toFixed(2);

    this.setState({
      cart: tempCart
    },() => {
      this.updateGrandTotal();
    });
  }

  decrement = (id) => {
    const tempCart = [...this.state.cart];
    let item = tempCart.find(prd => {
      return prd._id === id;
    });

    if(item.count > 1){
      item.count -= 1;
      item.total = (+item.count * +item.price).toFixed(2);

      this.setState({
        cart: tempCart
      },() => {
        this.updateGrandTotal();
      });
    }
  }

  removeFromCart = (id) => {
    let tempCart = this.state.cart.filter(item => {
      return item._id !== id;
    });
    
    this.setState({
      cart: tempCart
    },() => {
      this.updateGrandTotal();
    });
  }

  updateGrandTotal = () => {
    let total = this.state.cart.reduce((acc,cur) => {
      return acc += +cur.total;
    },0).toFixed(2);

    this.setState({
      grandTotal: total
    });
  }

  clearCart =() => {
    this.setState({
      cart: [],
      grandTotal: 0
    });
  }

  updateUserState = (userState) => {
    this.setState({
      userState: {...userState}
    });
    
  }

  logout = (event) => {
    event.preventDefault();
    
    this.setState({
      userState: {...this.defaultUserState},
      cart: []
    }, () => {
      
      window.localStorage.clear();
      toast.info('You are logged out!');
    });
    
  }

  removeFromProducts = (id) => {

  }

  checkout = () => {

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
            removeItemFromProducts: this.removeFromProducts,
            addItemToCart: this.addItemToCart,
            increment: this.increment,
            decrement: this.decrement,
            removeFromCart: this.removeFromCart,
            clearCart: this.clearCart,
          }
        }>
        <Navbar logout={this.logout}/>
        <Switch>
          <Route exact path='/' component={ProductList}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/create' component={() => <Create isAdmin={this.state.userState.isAdmin}/>}/>
          <Route exact path='/cart' component={Cart}/>
          <Route exact path='/details' component={() => 
            <Details 
              details={this.state.details} 
              isAdmin={this.state.userState.isAdmin} 
              cart={this.state.cart} 
              addItemToCart={this.addItemToCart}
              removeFromProducts={this.removeFromProducts}
            />} />
          <Route exact path='/edit' component={() => <Edit userData = {this.state}/>}/>
          <Route exact component={Default}/>
        </Switch>
      </UserProvider>
    );
  }
}

export default App;
