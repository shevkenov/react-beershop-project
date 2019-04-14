import React, { Component } from 'react';
import {toast} from 'react-toastify';

import AuthenticationService from '../components/services/authentication-sevice.js';

export default class Signup extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
        };

    }

    static service = new AuthenticationService();

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        (async() => {
            try {
                
                const response = await Signup.service.signup(this.state);

                if(!response.success){

                    if(response.errors){
                        const messageArray = Object.values(response.errors).join('\n');
                        throw new Error(messageArray);
                    }
                    
                    toast.error(response.message);
                    return;
                }
                
                toast.info(response.message);
                this.props.history.push("/");
                
              } catch (error) {
                toast.error(error.message);
              }
        })();
    }
  
    render() {
        return (
            <div className='form-wrapper'>
                <h1>Sign up!</h1>
                <form onSubmit={(event) => this.handleSubmit(event)} >
                    <div className="form-group">                   
                        <input type="text" className="form-control form-control-lg" onChange={(event) => this.handleChange(event)} name="username" placeholder="Enter Username"/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control form-control-lg" onChange={(event) => this.handleChange(event)} name="email" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" name="password" onChange={(event) => this.handleChange(event)} placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" name="confirmPassword" onChange={(event) => this.handleChange(event)} placeholder="Confirm Password"/>
                    </div>
                    <button type="submit" className="btn btn-warning">Submit</button>
                </form>
            </div>
        );
    }
}
