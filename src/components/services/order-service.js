import {get,post} from '../data/request-beer-data.js';

class OrderService {
    constructor(){
        this.baseUrl = 'http://localhost:5555/orders/';
        this.submitUrl = this.baseUrl + 'submit';
        this.pendingUrl = this.baseUrl + 'pending';
        this.userUrl = this.baseUrl + 'user';
        this.statusUrl = this.baseUrl + 'approve';
    }
    
    submit(cart){
        return post(this.submitUrl,cart);
    };

    getPendingOrders(){
        return get(this.pendingUrl);
    }

    getUserOrders(){
        return get(this.userUrl);
    }

    changeSatus(order){
        return post(this.statusUrl, order);
    }

}

export default OrderService;