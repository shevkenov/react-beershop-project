import {get,post} from '../data/request-beer-data.js';

class OrderService {
    constructor(){
        this.baseUrl = 'http://localhost:5555/orders/';
        this.submitUrl = this.baseUrl + 'submit';
        this.getOrdersUrl = this.baseUrl + 'user';
    }
    
    submit(cart){
        return post(this.submitUrl,cart);
    };

    getOrders(){
        return get(this.getOrdersUrl);
    }

}

export default OrderService;