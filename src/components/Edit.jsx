import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'; 
import ProductService from './services/product-service';
import {toast} from 'react-toastify';

export default class Edit extends Component {
    constructor(props){
        super(props);

        const {_id, brand,title,style,description,price,image} = props.userData.details; 

        this.state = {
            id: _id,
            brand,
            title,
            style,
            description,
            price,
            image
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
          const response = await Edit.service.editItem(this.state);
    
          if(!response.success){
            throw new Error(response.errors.description);
          }
    
          toast.success(response.message);
    
        } catch (error) {
          toast.error(error.message);
        }
        
    }
  
  
    render() {
        
        const {isAdmin} = {...this.props.userData.userState};
        

        return (
            <div className="form-wrapper">
            {!isAdmin ? <Redirect to="/" /> : null}
            <h1>Edit item!</h1>
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  onChange={event => this.handleChange(event)}
                  name="brand"
                  placeholder="Enter Brand"
                  value={this.state.brand}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="title"
                  onChange={event => this.handleChange(event)}
                  placeholder="Title"
                  value={this.state.title}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="style"
                  onChange={event => this.handleChange(event)}
                  placeholder="Style"
                  value={this.state.style}
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
                  value={this.state.price}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="image"
                  onChange={event => this.handleChange(event)}
                  placeholder="Image url"
                  value={this.state.image}
                />
              </div>
              <div className="form-group">
                <textarea
                  type="text"
                  rows="5"
                  className="form-control form-control-lg"
                  name="description"
                  onChange={event => this.handleChange(event)}
                  placeholder="Description"
                  value={this.state.description}
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
