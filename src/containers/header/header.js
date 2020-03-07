// imports
import React, {Component} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';
import {Link, withRouter } from "react-router-dom";
import './header.css';
import logo from '../../images/logo.png';
import { ReactComponent as Close} from "../../assets/close.svg";
import Nav from "../../components/navigation/navigation";
import Modal from "../../components/modal/modal";
import LoggedNavigation from "../../components/navigation/loggedNavigation";

// check input length
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
                error: '',
                userExists: ""
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
                error: '',
            }
        ],
        registerConfirm: '',
        errorInputs: false,
        userAlreadyExists: false,
        accounts: JSON.parse(localStorage.getItem('accounts')) || [],
        popupState: {
            loginPopUp: false,
            registerPopUp:false
        },
         loggedUser: JSON.parse(localStorage.getItem('loggedUser')) || "",
     };
     // update error
     updateError = (array, errorMessage) => {
        const updatedArray = [...array];
        updatedArray.forEach((input, index) => {
             updatedArray[index] = { ...input, error: errorMessage}
        });
       return updatedArray;
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
        if (data.name.length >= 2 && data.user.length >= 2 && data.pass.length >= 2) {

            // localstorage register form
            const takeData = JSON.parse(localStorage.getItem('accounts')) || [];
            // check if user exist
            const userExists = takeData.find(item => {
                return data.user === item.user;
            });
            if(userExists){
                console.log('exiusta');
                    this.setState({
                        userAlreadyExists: true
                    })
                } else {
                console.log('nu exista')
                    takeData.push(data);
                    localStorage.setItem('accounts', JSON.stringify(takeData));
                    this.setState({
                        registerConfirm: `${data.user}, your account was succcesfully registred, now you can login.`,
                        accounts: JSON.parse(localStorage.getItem('accounts')) || [],
                        popupState: {
                            loginPopUp: true,
                            registerPopUp: false,
                            userAlreadyExists: false
                        }
                    })
                }
            } else{
            // update array index error
            const updatedArray = this.updateError(registerInputs, 'please sloboz');
            this.setState({
                registerInputs: updatedArray,
                registerConfirm: "",

            })
        }
    };
    // login handler
    handlerLogin = (e, context) => {
        e.preventDefault();
        const { loginInputs, accounts } = this.state;
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
           localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
           this.setState({
               popupState: {
                   loginPopUp: false
               },
               loggedUser: JSON.parse(localStorage.getItem('loggedUser'))
           });
           this.props.history.push('/dashboard')

       } else {
           const updatedArray = this.updateError(loginInputs, "user not found");
           this.setState({
               loginInputs: updatedArray
           })
       }
    };
    // open pop up
    openPopup = (action) => {
        this.setState({
            popupState: {
                ...this.state.popupState,
                [action]: true
            },
            justSignedUp: ""
        });
    };
    // close pop up
    closePopup = (action) => {
        const { registerInputs, loginInputs } = this.state;
        const logInputs = [...loginInputs];
       // update array index error
        logInputs.forEach((input, index) => {
            if(!isInvalidInput(input.value)) {
               logInputs[index] = { ...input, error: '', value:'' }
           }
            console.log(isInvalidInput(input.value))
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
    // log out
    logOut = () => {
        localStorage.removeItem("loggedUser");
        this.setState({
            loggedUser: []
        });
        this.props.history.push('/')
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
            // main header
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
                                <input type={item.type} className={inputPlaceholder} id={item.id} onChange={e => this.handleRegisterInputChange(e, index)} value={item.value}/>
                                <label htmlFor={item.id} className="register__label">{item.label}</label>
                                <div className="error">{item.error}</div>
                            </div>
                        })}
                        {this.state.userAlreadyExists ?  <span className="error text-center">user already exists</span> : <span>dsad</span>}

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
                                    <input type={item.type} className={inputPlaceholder} onChange={e => this.handleLoginInputChange(e, index)} id={item.id} value={item.value}/>
                                    <label htmlFor={item.id} className="register__label">{item.label}</label>
                                    <div className="error">{item.error}</div>
                                </div>
                            })}
                            <span className="confirm">{this.state.registerConfirm}</span>
                            <div className="text-center">
                                <button>Log in</button>
                            </div>
                        </form>
                    </div>
                </Modal>
                {console.log(this.props.data)}
               <div className="container">
                   <div className="d-flex">
                       {/* logo */}
                       <div className="logo-wrap flex-2">
                           <Link to={this.state.loggedUser.length > 1 ? "/dashboard": "/"}>
                                <img src={logo} alt="logo" className="logo"/>
                           </Link>
                       </div>
                       {/* main navigation */}
                       <nav className="navigation flex-2 ">
                           {this.state.loggedUser.length > 1 ?
                               <LoggedNavigation logout={this.logOut}/>:
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
// map state to props
const mapStateToProps = (state) => {
    return {
        data: state.data
    }
};

// export header
export default compose(
    withRouter,
    connect(mapStateToProps)
)(Header);