import React from 'react';
import CartItem from './CartItem';

export default function CartList({value}) {

    const {cart,increment,decrement,removeFromCart} = value;

    return (
    <div className='container-fluid'>
        {
            cart.map(product => (
                <CartItem key={product._id} product={product} increment={increment} decrease={decrement} removeFromCart={removeFromCart}/>
            ))
        }
    </div>
  );
}