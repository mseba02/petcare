// imports
import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import './header.css';
import logo from '../images/logo.png';


class Header extends  Component {
    constructor() {
        super();

        // state
        this.state = {
            registerPopUp: false
        };
    }
    registerUser = (e) => {

    };
    render() {
        return(
            <header>
                <form className="register-popup">
                    <h4>Register</h4>
                    <div>
                        <label>Name</label>
                        <input type="text"  placeholder=""/>
                    </div>
                    <input type="text"  placeholder="User"/>
                    <input type="text"  placeholder="Password"/>
                    <button>Sign up</button>
                </form>
               <div className="container">
                   <div className="d-flex">
                       {/* logo */}
                       <div className="logo-wrap flex-2">
                           <img src={logo} alt="logo" className="logo"/>
                       </div>
                       {/* main navigation */}
                       <nav className="navigation flex-2 text-right">
                           <ul className="inline-list">
                               <li>
                                   <a href="">Log in</a>
                               </li>
                               <li>
                                   <a href="">Register</a>
                               </li>
                           </ul>
                       </nav>
                   </div>
               </div>
            </header>
        )
    }
};

export default Header;