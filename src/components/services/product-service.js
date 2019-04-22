import {get,post,remove} from '../data/request-beer-data.js';

class ProductService {
    constructor(){
        this.baseUrl = 'http://localhost:5555/beer/';
        this.productsUrl = this.baseUrl + 'all';
        this.createUrl = this.baseUrl + 'create';
        this.editUrl = this.baseUrl + 'edit';
        this.removeUrl = this.baseUrl + 'delete';
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

    removeItem(item){
        return remove(this.removeUrl, item);
    }

}

export default ProductService;