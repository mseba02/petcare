// imports
import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import classNames from 'classnames';
import './header.css';
import logo from '../images/logo.png';
import { ReactComponent as Close} from "../assets/close.svg";
import Nav from "../components/navigation/navigation";


const isInvalidInput = (inputValue) => inputValue.length < 2;
// header
class Header extends  Component {
    // state
     state = {
        registerInputs: [
            {
                type: 'text',
                id: 'forName',
                label: 'Name',
                value: '',
                error: ''
            },
            {
                type: 'text',
                id: 'forUser',
                label: 'User',
                value: '',
                error: ''
            },
            {
                type: 'password',
                id: 'forPass',
                label: 'Password',
                value: '',
                error: ''
            }
        ],
        loginInputs: [
            {
                type: 'text',
                id: 'loginForUser',
                label: 'User',
                value: ''
            },
            {
                type: 'password',
                id: 'loginForPassword',
                label: 'Password',
                value: ''
            }
        ],
        registerPopUp: false,
        registerConfirm: '',
        errorInputs: false
    };
     // take input values
    handleInputChange = (e, index) => {
        const updatedArray = [...this.state.registerInputs];
        updatedArray[index].value = e.target.value;
        // set error
        if(e.target.value.length >= 2) {
            updatedArray[index].error = ''
        } else {
            updatedArray[index].error = 'enter at least 2 digits'
        }
        // update array
        this.setState({
            registerInputs: updatedArray
        })
    };
    // register on Submit
    handleRegisterForm = (e) => {
        e.preventDefault();
        // store all inputs value in object
        const data = this.state.registerInputs.reduce((acc, prev) => {
            acc[prev.label] = prev.value;
            return acc;
        }, {});
        console.log(data);

        if (data.Name.length >= 2 && data.User.length >= 2 && data.Password.length >= 2) {
            // localstorage register form
            localStorage.setItem(JSON.stringify(data), 'registeredAccounts');
            this.setState({
                registerConfirm: `${data.User}, your account was succcesfully registred.`,
                justSignedUp: true
            })
        } else{
            // update array index error
            const updatedInputsArray = [...this.state.registerInputs];
            this.state.registerInputs.forEach((input, index) => {
                if (isInvalidInput(input.value)) {
                    updatedInputsArray[index] = { ...input, error: 'enter at least 2 digits' }
                }
               this.setState({
                   registerInputs: updatedInputsArray
               })

            })
        }
    };
    // open pop up
    openPopup = () => this.setState({
       registerPopUp: true
    });
    // close pop up
    closePopup = () => {
        // update array index error
       const updatedInputsArray = [...this.state.registerInputs];
       this.state.registerInputs.forEach((item, index) => {
            if(isInvalidInput){
                updatedInputsArray[index] = {...item, error: 'sda'}
            }
            this.setState({
                registerPopUp: false
            })
       })

    };
    render() {
        // classnames
        const registerPopup = classNames({
           globalpopup: true,
           globalpopup__active: this.state.registerPopUp
        });
        // return container
        return (
            <header>
                <div className={registerPopup}>
                    <form className="popup__form" onSubmit={this.handleRegisterForm}>
                        <figure className="popup__close" onClick={this.closePopup}>
                            <Close/>
                        </figure>

                        <h4 className="register__title">Register</h4>
                        {this.state.registerInputs.map( (item, index) => {
                            const inputPlaceholder = classNames({
                                register__input: true,
                                register__close: item.value.length >= 1
                            });
                            return <div key={index} className="position-relative">
                                <input className={inputPlaceholder} id={item.id} onChange={e => this.handleInputChange(e, index)} />
                                <label htmlFor={item.id} className="register__label">{item.label}</label>
                                <div className="error">{item.error}</div>
                            </div>
                        })}
                        {console.log(this.state.registerPopUp)}
                        <span className="confirm">{this.state.registerConfirm}</span>
                        <div className="text-center">
                            <button>Sign up</button>
                        </div>
                    </form>
                </div>
               <div className="container">
                   <div className="d-flex">
                       {/* logo */}
                       <div className="logo-wrap flex-2">
                           <img src={logo} alt="logo" className="logo"/>
                       </div>
                       {/* main navigation */}
                        <Nav register={this.openPopup} />
                   </div>
               </div>
            </header>
        )
    }
}

export default Header;