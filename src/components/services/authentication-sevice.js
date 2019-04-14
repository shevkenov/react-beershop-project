import {post} from '../data/request-user-data';

class AuthenticationService {
    constructor(){
        this.baseUrl = 'http://localhost:5555/auth/';
        this.loginUrl = this.baseUrl + 'login';
        this.signupUrl = this.baseUrl + 'signup';
    }
    
    login(data){
        return post(this.loginUrl, data);
    };

    signup(data){
        return post(this.signupUrl, data);
    }
}

export default AuthenticationService;