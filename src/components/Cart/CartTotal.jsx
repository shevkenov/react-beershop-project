import React from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';

import OrderService from "../services/order-service.js";

export default function CartTotals({ value }) {
  const { grandTotal, clearCart } = value;

  const service = new OrderService();

  const checkout = async(event) => {
    event.preventDefault();
    
    try {
      
      const response = await service.submit(value.cart);

      if(!response.success){
        throw new Error(response.errors.description);
      }

      toast.success(response.message);
      clearCart();
    } catch (error) {
      toast.error(error.message);
    }
    
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={clearCart}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">
                total: <strong>$ {grandTotal}</strong>
              </span>
            </h5>
            <button className="btn btn-danger text-uppercase mb-3 my-3" onClick={(event) => {checkout(event);}}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
