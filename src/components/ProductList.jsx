import React, { Component } from 'react';

import Title from './Title';
import Product from './Product';
import {UserConsumer} from './context/UserContext'; 
import ProductService from './services/product-service.js';

class ProductList extends Component {
  constructor(props){
    super(props);

    this.state = {
      products: []
    };
  }

  static service = new ProductService();

  

  async componentDidMount(){

    const products = await ProductList.service.getAllProducts();
    this.props.userData.setProducts(products);
  }

  render() {
    
    const {username} = this.props.userData.userState;
    const {products} = this.props.userData;
    const {getProductDetails} = this.props.userData;

    return (
      <div className='pt-5 px-5'>
        <div className='container'>
          <Title title = "welcome" name = {username} />
          <div className='row'> 
            {
              products.map(item => <Product key={item._id} item={{...item}} getProductDetails={getProductDetails}/>)
            }
          </div>
        </div>
      </div>
    );
  }
}

const ProductListWithContext = (props) => {
  return (
    <UserConsumer>
        {
            (value) => {
                return (
                    <ProductList userData={{...value}}/>
                );
            }
        }
    </UserConsumer>
  );
};

export default ProductListWithContext;