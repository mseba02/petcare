// imports
import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import classNames from 'classnames';
import './header.css';
import logo from '../images/logo.png';


class Header extends  Component {
    constructor(props) {
        super(props);

        // state
        this.state = {
            registerPopUp: false,
            regInputName: '',
            registerInputLength: '',
        };
    }



        handleInputChange = (e, inputField) => {
        this.setState({
            [inputField]: e.target.value,
        })
    };
    getInputName = (e) => {
        this.setState({
            regInputName: e.target.value,
            registerInputLength: e.target.value.length
        })
    };
    render() {
        // classnames
        let inputPlaceholder = classNames({
            register__input: true,
            register__close: this.state.registerInputLength >= 1
        });
        return(
            <header>
                <form className="register-popup">
                    <h4 className="register__title">Register</h4>
                    <div className="position-relative">
                        <input type="text"  placeholder="" id="name" className={inputPlaceholder} onChange={(e) => this.handleInputChange(e, 'regInputName')} />
                        <label htmlFor="name" className="register__label">Name</label>
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