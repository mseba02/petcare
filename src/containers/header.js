// imports
import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import classNames from 'classnames';
import './header.css';
import logo from '../images/logo.png';

// header
class Header extends  Component {
    constructor(props) {
        super(props);
        // state
        this.state = {
            registerInputs: [
                {
                    type: 'text',
                    id: 'forName',
                    label: 'Name',
                    value: ''
                },
                {
                    type: 'text',
                    id: 'forUser',
                    label: 'User',
                    value: ''
                },
                {
                    type: 'password',
                    id: 'forPass',
                    label: 'Password',
                    value: ''
                }
            ],
            registerPopUp: false,
        };
    }
    // take input values
    handleInputChange = (e, index) => {
        const updatedArray = [...this.state.registerInputs];
        updatedArray[index].value = e.target.value;
        this.setState({
            registerInputs: updatedArray
        })
    };
    render() {
        // classnames

        // return container
        return (
            <header>
                <form className="register-popup">
                    <h4 className="register__title">Register</h4>
                    {this.state.registerInputs.map( (item, index) => {
                        const inputPlaceholder = classNames({
                            register__input: true,
                            register__close: item.value.length >= 1
                        });
                        return <div key={index} className="position-relative">
                            <input className={inputPlaceholder} id={item.id} onChange={e => this.handleInputChange(e, index)} />
                            <label htmlFor={item.id} className="register__label">{item.label}</label>
                        </div>
                    })}
                    {console.log(this.state.registerInputs)}
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
}

export default Header;