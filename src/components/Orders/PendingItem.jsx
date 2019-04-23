import React from "react";
import OrderService from "../services/order-service.js";
import { toast } from "react-toastify";

export default function PendingItems(props) {
  const { date, status, products } = props.order;
  const total = products.reduce((acc, cur) => {
    return (acc += Number(cur.total));
  }, 0);

  const changeStatus = async () => {
    const service = new OrderService();

    try {
      const response = await service.changeSatus(props.order);
      if (!response.success) {
        throw new Error(response.message);
      }

      toast.info(response.message);
      props.updatePendingState(props.order);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product: </span>
        {date.substring(0, 10)}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price: </span>$ {total.toFixed(2)}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product: </span>
        {status}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <button
          className="btn btn-danger text-uppercase mb-3 my-3"
          onClick={changeStatus}
        >
          Approve
        </button>
      </div>
    </div>
  );
}
