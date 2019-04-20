import React, { Component } from "react";
import {Redirect} from 'react-router-dom'; 
import ProductService from './services/product-service';
import {toast} from 'react-toastify';

export default class Create extends Component {
  constructor(props){
    super(props);

    this.state = {
      brand: '',
      title: '',
      style: '',
      description: '',
      price: '',
      image: ''
    };
    
  }

  
  static service = new ProductService(); 
  
  handleChange = ({target}) => {
    
    this.setState({
        [target.name]: target.value,
    });
  }

  handleSubmit = async(event) => {
    event.preventDefault();
    
    try {
      const response = await Create.service.createNewProduct(this.state);

      if(!response.success){
        throw new Error(response.errors.description);
      }

      toast.success(response.message);
      this.setState({       
          brand: '',
          title: '',
          style: '',
          description: '',
          price: '',
          image: ''
      });

    } catch (error) {
      toast.error(error.message);
    }
    
  }

  render() {
    const {isAdmin} = this.props;

    return (
      <div className="form-wrapper">
        {!isAdmin ? <Redirect to="/" /> : null}
        <h1>Insert new item!</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              onChange={event => this.handleChange(event)}
              name="brand"
              placeholder="Enter Brand"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              name="title"
              onChange={event => this.handleChange(event)}
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              name="style"
              onChange={event => this.handleChange(event)}
              placeholder="Style"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              name="price"
              onChange={event => this.handleChange(event)}
              placeholder="Price"
              step='.01'
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              name="image"
              onChange={event => this.handleChange(event)}
              placeholder="Image url"
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control form-control-lg"
              name="description"
              onChange={event => this.handleChange(event)}
              placeholder="Description"
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
