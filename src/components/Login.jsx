import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';

import {UserConsumer} from './context/UserContext.js';
import AuthenticationService from './services/authentication-sevice.js';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            password: '',
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

        const {userData} = this.props;
        
        (async() => {
            try {
                
                const response = await Login.service.login(this.state);
                
                if(!response.success){

                    if(response.errors){
                        const messageArray = Object.values(response.errors).join(' ');
                        throw new Error(messageArray);
                    }
                    
                    toast.error(response.message);
                    return;
                }

                const user = {
                    isLoggedIn: true,
                    isAdmin: response.user.roles.includes('admin'),
                    usernamme: response.user.username
                };

                window.localStorage.setItem('auth_token',response.token);
                window.localStorage.setItem('user', JSON.stringify({...user}));
                
                userData.updateUserState({...user});
                toast.info(response.message);
                
              } catch (error) {
                toast.error(error.message);
              }
        })();
    }
  
    render() {
        const {userData} = this.props;
        return (
            <div className='form-wrapper'>
                {userData.userState.isLoggedIn
                        ? <Redirect to="/home"/>
                        : null
                }
                <h1>Log in</h1>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">                    
                        <input type="email" className="form-control form-control-lg" onChange={(event) => this.handleChange(event)} name="email" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">                    
                        <input type="password" className="form-control form-control-lg" name="password" onChange={(event) => this.handleChange(event)} placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-warning">Submit</button>
                </form>
            </div>
        );
    }
}

export default function LoginWithContext() {
  return (
    <UserConsumer>
        {
            (value) => {
                return (
                    <Login userData={{...value}}/>
                );
            }
        }
    </UserConsumer>
  );
}

