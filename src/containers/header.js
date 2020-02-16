// imports
import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import classNames from 'classnames';
import './header.css';
import logo from '../images/logo.png';
import { ReactComponent as Close} from "../assets/close.svg";
import Nav from "../components/navigation/navigation";
import Modal from "../components/modal/modaj";


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
                key: 'name',
                value: '',
                error: ''
            },
            {
                type: 'text',
                id: 'forUser',
                label: 'User',
                key: 'user',
                value: '',
                error: ''
            },
            {
                type: 'password',
                id: 'forPass',
                label: 'Password',
                key: 'pass',
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
        registerConfirm: '',
        errorInputs: false,
        popupState: {
            loginPopUp: false,
            registerPopUp:false
        },
     };


    // take input values
    handleRegisterInputChange = (e, index) => {
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
            acc[prev.key] = prev.value;
            return acc;
        }, {});
        console.log(data);
        if (data.name.length >= 2 && data.user.length >= 2 && data.pass.length >= 2) {
            // localstorage register form
            const takeData = JSON.parse(localStorage.getItem('accounts')) || [];
            console.log(takeData);
            takeData.push({data});
            localStorage.setItem('accounts', JSON.stringify(takeData));
            this.setState({
                registerConfirm: `${data.user}, your account was succcesfully registred.`,
                justSignedUp: true
            })
        } else{
            // update array index error
            const updatedInputsArray = [...this.state.registerInputs];
            updatedInputsArray.forEach((input, index) => {
                if (isInvalidInput(input.value)) {
                    updatedInputsArray[index] = { ...input, error: 'enter at least 2 digits' }
                }
               this.setState({
                   registerInputs: updatedInputsArray,
                   registerConfirm: ''
               })

            })
        }
    };
    // open pop up
    openPopup = (action) => {
        this.setState({
            popupState: {
                ...this.state.popupState,
                [action]: true
            }
        });
    };
    // close pop up
    closePopup = (action) => {
       // update array index error
       const updatedInputsArray = [...this.state.registerInputs];
       this.state.registerInputs.forEach((item, index) => {
            if(isInvalidInput(item.value)){
                updatedInputsArray[index] = {...item, error: '', value: ''}
            }
       });
       console.log(updatedInputsArray);
       this.setState({
           popupState: {
               ...this.state.popupState,
               [action]: false
           },
           registerInputs: updatedInputsArray,
           registerConfirm: ''
       })
    };
    render() {
        // classnames
        const registerPopup = classNames({
            globalpopup__active: this.state.popupState.registerPopUp
        });
        const loginPopup = classNames({
            globalpopup__active: this.state.popupState.loginPopUp
        });
            // return container
        return (
            <header>
                {/* register form */}
                <Modal className={registerPopup}>
                <div>
                    <form className="popup__form" onSubmit={this.handleRegisterForm}>
                        <figure className="popup__close" onClick={() => this.closePopup('registerPopUp')}>
                            <Close/>
                        </figure>
                        <h4 className="register__title">Register</h4>
                        {this.state.registerInputs.map( (item, index) => {
                            const inputPlaceholder = classNames({
                                register__input: true,
                                register__close: item.value.length >= 1
                            });
                            return <div key={index} className="position-relative">
                                <input className={inputPlaceholder} id={item.id} onChange={e => this.handleRegisterInputChange(e, index)} value={item.value}/>
                                <label htmlFor={item.id} className="register__label">{item.label}</label>
                                <div className="error">{item.error}</div>
                            </div>
                        })}
                        <span className="confirm">{this.state.registerConfirm}</span>
                        <div className="text-center">
                            <button>Sign up</button>
                        </div>
                    </form>
               </div>
                </Modal>
               {/* login form */}
                <Modal className={loginPopup}>

                    <p>dsadsadsadsadadasdadsadsadas</p>
                    <figure className="popup__close" onClick={() => this.closePopup('loginPopUp')}>
                        <Close/>
                    </figure>
                </Modal>
               <div className="container">
                   <div className="d-flex">
                       {/* logo */}
                       <div className="logo-wrap flex-2">
                           <img src={logo} alt="logo" className="logo"/>
                       </div>
                       {/* main navigation */}
                        <Nav openPopUp={this.openPopup}/>
                   </div>
               </div>
                {/*{console.log(this.state.takeLocalStorage)}*/}
            </header>
        )
    }
}

export default Header;