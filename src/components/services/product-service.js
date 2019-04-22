import {get,post} from '../data/request-beer-data.js';

class ProductService {
    constructor(){
        this.baseUrl = 'http://localhost:5555/beer/';
        this.productsUrl = this.baseUrl + 'all';
        this.createUrl = this.baseUrl + 'create';
        this.editUrl = this.baseUrl + 'edit';
    }
    
    getAllProducts(){
        return get(this.productsUrl);
    };

    createNewProduct(item){
        return post(this.createUrl, item);
    }

    editItem(item){
        return post(this.editUrl, item);
    }
}

export default ProductService;