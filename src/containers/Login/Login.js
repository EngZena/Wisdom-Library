import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import classes from './Login.module.css';
import { InputFields } from '../../components/UI/Input/InputField'
import { AuthContext } from '../../context/AuthContext';
import * as validate from '../Validation/Validation'

export default class Login extends Component {


    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            signIn: true,
            errorEmail: false,
            passwordError: false,
        }

    }
      onChange = async (event) => {
        const targetId = event.target.id;
        await this.setState({...this.state,
            [event.target.id]: event.target.value
        })
       
        if (event.target.id === 'email') {
            if(validate.validateEmail(this.state.email)){ 
                return this.setState({...this.state,
                    errorEmail: true
                }) 
            } else {
                return this.setState({...this.state,
                    errorEmail: false
                }) 
            }

        }
        if (event.target.id === 'password') {
            if (!this.state.password) {
                return this.setState({...this.state,
                    passwordError: true
                }) 
            }
            if (this.state.password.length < 5) {
                return this.setState({...this.state,
                    passwordError: true
                }) 
            } else {
                return this.setState({...this.state,
                    passwordError: false
                }) 
            }
        }
    }

    // onChange = async (event) => {
    //     await this.setState({
    //         ...this.state,
    //         [event.target.id]: event.target.value,
    //     });
    //     if (event.target.id === 'email') {
    //         let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //         if (regEmail.test(this.state.email)) {
    //             return this.setState({
    //                 ...this.state,
    //                 errorEmail: false,
    //             })
    //         } else {
    //             return this.setState({
    //                 ...this.state,
    //                 errorEmail: true,
    //             })
    //         }

    //     }
    //     if (event.target.id === 'password') {
    //         if (!this.state.password) {
    //             return this.setState({
    //                 ...this.state,
    //                 passwordError: true,
    //             })
    //         }
    //         if (this.state.password.length < 6) {
    //             return this.setState({
    //                 ...this.state,
    //                 passwordError: true,
    //             })
    //         } else {
    //             this.setState({
    //                 ...this.state,
    //                 passwordError: false
    //             })
    //         }

    //     }


    // }



    render() {
        return (
            <div className={classes.container}>
                <div className={classes.fields}>
                    <div className={classes.mr}>
                        <InputFields
                            id="email"
                            label="email"
                            type="email"
                            variant="outlined"
                            value={this.state.email}
                            onChange={(event) => this.onChange(event)}
                            error={this.state.errorEmail}
                        />
                    </div>
                    <div className={classes.mr}>
                        <InputFields
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            variant="outlined"
                            onChange={(event) => this.onChange(event)}
                            error={this.state.passwordError}

                        />
                    </div>
                </div>
                <div className={classes.padding}>
                    <AuthContext.Consumer>
                        {({ handleLogin }) =>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.mr}
                                onClick={() => handleLogin(this.state.email, this.state.password)}
                            >
                                sign in
                     </Button>

                        }
                    </AuthContext.Consumer>
                </div>
                <div className={classes.padding}>
                    <AuthContext.Consumer>
                        {({ handleSignUp }) =>
                            <div>

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleSignUp(this.state.email, this.state.password)}
                                    className={classes.mr}
                                >
                                    sign up
                     </Button>
                               
                            </div>
                        }
                    </AuthContext.Consumer>
                </div>
            </div>
        )
    }
}
