// imports
import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import classNames from 'classnames';
import './header.css';
import logo from '../images/logo.png';
import { ReactComponent as Close} from "../assets/close.svg";
import Nav from "../components/navigation/navigation";
import Modal from "../components/modal/modal";
import LoginNavigation from "../components/navigation/loginNavigation";

// check input length
const isInvalidInput = (inputValue) => inputValue.length < 2;

const updateError = (array) => {
    const updatedArray = [...array];
    updatedArray.forEach((input, index) => {
        if(isInvalidInput(input.value)) {
            return updatedArray[index] = { ...input, error: 'errrrrrrorrrrrrrr'}
        }
    })
    console.log(updatedArray);

};
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
                key: 'user',
                value: '',
                error: ''
            },
            {
                type: 'password',
                id: 'loginForPassword',
                label: 'Password',
                key: 'pass',
                value: '',
                error: ''
            }
        ],
        registerConfirm: '',
        errorInputs: false,
        loggedUser: JSON.parse(localStorage.getItem('loggedUser')) || [],
        accounts: JSON.parse(localStorage.getItem('accounts')) || [],
        popupState: {
            loginPopUp: false,
            registerPopUp:false
        }
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
    // take input values
    handleLoginInputChange = (e, index) => {
        const updatedArray = [...this.state.loginInputs];
        updatedArray[index].value = e.target.value;
        // set error
        if(e.target.value.length >= 2) {
            updatedArray[index].error = ''
        } else {
            updatedArray[index].error = 'enter at least 2 digits'
        }
        // update array
        this.setState({
            loginInputs: updatedArray
        })
    };
    // register on Submit
    handleRegisterForm = (e) => {
        const {registerInputs} = this.state;
        e.preventDefault();

        // store all inputs value in object
        const data = registerInputs.reduce((acc, prev) => {
            acc[prev.key] = prev.value;
            return acc;
        }, {});
        console.log(data);
        if (data.name.length >= 2 && data.user.length >= 2 && data.pass.length >= 2) {
            // localstorage register form
            const takeData = JSON.parse(localStorage.getItem('accounts')) || [];
            takeData.push(data);
            localStorage.setItem('accounts', JSON.stringify(takeData));
            this.setState({
                registerConfirm: `${data.user}, your account was succcesfully registred.`,
                justSignedUp: true,
                accounts: JSON.parse(localStorage.getItem('accounts')) || []

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
    // login handler
    handlerLogin = (e) => {
        const { loginInputs, accounts } = this.state;
        e.preventDefault();

        // custom iteration to take individual values
        const user = loginInputs[0].value;
        const pass = loginInputs[1].value;
        const checkUser = accounts.find( item => {
            return user === item.user;
        });
        const checkPass = accounts.find( item => {
            return pass === item.pass;
        });
       if (checkUser && checkPass) {
           const loggedUser = user;
           localStorage.setItem('loggedUser', JSON.stringify({loggedUser}));
           console.log(JSON.parse(localStorage.getItem('loggedUser')));
       } else {
           updateError(this.state.loginInputs);
           // this.setState({
           //     loginInputs: updateError
           // })
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
        const { registerInputs, loginInputs } = this.state;
        const logInputs = [...loginInputs];
       // update array index error
        loginInputs.forEach((input, index) => {
           if(isInvalidInput(input.value)) {
               logInputs[index] = { ...input, error: '', value:'' }
           }
        });
       this.setState({
           loginInputs: logInputs,
           popupState: {
               ...this.state.popupState,
               [action]: false,
           },
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
                    <div>
                        <form className="popup__form" onSubmit={this.handlerLogin}>
                            {/*  close  */}
                            <figure className="popup__close" onClick={() => this.closePopup('loginPopUp')}>
                                <Close/>
                            </figure>
                            <h4 className="register__title">Login</h4>
                            { this.state.loginInputs.map( (item, index) => {
                                const inputPlaceholder = classNames({
                                    register__input: true,
                                    register__close: item.value.length >= 1
                                });
                                return <div key={index} className="position-relative">
                                    <input className={inputPlaceholder} onChange={e => this.handleLoginInputChange(e, index)} id={item.id} value={item.value}/>
                                    <label htmlFor={item.id} className="register__label">{item.label}</label>
                                    <div className="error">{item.error}</div>
                                </div>
                            })}
                            <div className="text-center">
                                <button>Log in</button>
                            </div>
                        </form>
                    </div>
                </Modal>
                {console.log(this.state.loggedUser)}
               <div className="container">
                   <div className="d-flex">
                       {/* logo */}
                       <div className="logo-wrap flex-2">
                           <img src={logo} alt="logo" className="logo"/>
                       </div>
                       {/* main navigation */}
                       <nav className="navigation flex-2 text-right">
                           {this.state.loggedUser.length >= 2 ?
                              <LoginNavigation />:
                               <Nav openPopUp={this.openPopup}/>
                           }

                       </nav>
                   </div>
               </div>
                {/*{console.log(this.state.takeLocalStorage)}*/}
            </header>
        )
    }
}

export default Header;