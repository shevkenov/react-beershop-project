import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import {UserConsumer} from '../context/UserContext.js';
import CartList from './CartList';
import CartTotals from './CartTotal';

export default class Cart extends Component {
  render() {
    return (
      <section>
        <UserConsumer>
          {
            (value) => {
              const {cart,userState} = value;
              if(!userState.isLoggedIn){
                return (<Redirect to="/login" />);
              }

              if(cart.length > 0){
                return(
                  <React.Fragment>
                    <Title name={value.userState.username} title='cart'/>
                    <CartColumns />
                    <CartList value={value}/>
                    <CartTotals value={value} />
                  </React.Fragment>
                );
              }else{
                return (<EmptyCart />);
              }
            }
          }
        </UserConsumer>
      </section>
    );
  }
}
