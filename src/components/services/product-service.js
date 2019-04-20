import {get,post} from '../data/request-beer-data.js';

class ProductService {
    constructor(){
        this.baseUrl = 'http://localhost:5555/beer/';
        this.productsUrl = this.baseUrl + 'all';
        this.createUrl = this.baseUrl + 'create';
    }
    
    getAllProducts(){
        return get(this.productsUrl);
    };

    createNewProduct(item){
        return post(this.createUrl, item);
    }
}

export default ProductService;