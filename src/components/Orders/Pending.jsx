import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

import Title from "../Title";
import PendingColumns from "./PendingColumns";
import PendingList from "./PendingList";
import OrderService from "../services/order-service.js";

export default class PendingOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pendings: []
    };
  }

  updatePendingState = (order) => {
    const newPendings = this.state.pendings.filter(item => {
      return order !== item;
    });

    this.setState({
      pendings: newPendings
    });
  }
 
  static service = new OrderService();

  async componentDidMount() {
    const pendings = await PendingOrders.service.getPendingOrders();

    this.setState({
      pendings
    });
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.isAdmin ? <Redirect to="/login" /> : null}

        {this.state.pendings.length > 0 ? (
          <Fragment>
            <Title title="Pending" name="orders!" />
            <PendingColumns />
            <PendingList orders={this.state.pendings} updatePendingState={this.updatePendingState}/>
          </Fragment>
        ) : (
          <Title title="No pending" name="orders!" />
        )}
      </React.Fragment>
    );
  }
}
