import React from "react";
import PendingItem from "../Orders/PendingItem";

export default function PendingList(props) {
    
    const {orders,updatePendingState} = props;

    return (
    <div className="container-fluid">
      {orders.map(order => (
        <PendingItem key={order._id} order={order} updatePendingState={updatePendingState}/>
      ))}
    </div>
  );
}
