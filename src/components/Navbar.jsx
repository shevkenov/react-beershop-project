import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.png";

import {UserConsumer} from './context/UserContext.js';

class Navbar extends Component {
  constructor(props){
    super(props);

    this.state = {
      loginButton: false
    };

  }

  toggleButton = () => {
    this.setState({
      loginButton: !this.state.loginButton
    });
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props.userData.userState;
    let li;

    if(isLoggedIn){
      li = <li className='nav-item'>
        <NavLink to='/' className='nav-link' onClick={(event) => this.props.logout(event)}>Log out</NavLink>
      </li>;
    }else{
      if(this.state.loginButton){
        li =  <li className='nav-item'>
                <NavLink to='/login' className='nav-link' onClick={this.toggleButton}>Log in</NavLink>
              </li>;
      }else{
        li =  <li className='nav-item'>
                <NavLink to='/signup' className='nav-link' onClick={this.toggleButton}>Sign up</NavLink>         
              </li>;
      }
    }

    return (
      <nav className='navbar navbar-expand-sm' >
        <NavLink to="/" className="navbar-link">
          <img
            src={logo}
            alt="logo"
            height="62"
            width="62"
            className="navbar-brand"
          />
        </NavLink>
        <ul className='navbar-nav align-items-center pl-5'>
            <li className='nav-item'>
                <NavLink to='/' className='nav-link'>Home</NavLink>
            </li>
            
            {
              isAdmin
                ?
                  <li className='nav-item'>
                    <NavLink to='/create' className='nav-link'>Create</NavLink>
                  </li>
                :
                  null
            }

            <li>
                <form className="form-inline ml-5">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                </form>
            </li>
            
        </ul>
        <ul className='navbar-nav ml-auto'>
            <li className='nav-item pr-5'>
                <NavLink to='/cart' className='nav-link'>
                    <span className='mr-2'>
                        <i className="fas fa-cart-plus"></i>
                    </span>
                </NavLink>
            </li>

        {li}
        </ul>
      </nav>
    );
  }
}

const NavbarWithContext = (props) => {
  return (
    <UserConsumer>
      {
        (value) => {
          return <Navbar userData = {{...value}} {...props}/>;
        }
      }
    </UserConsumer>
  );
};

export default NavbarWithContext;
