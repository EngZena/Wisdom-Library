import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import classes from './Login.module.css';
import { InputFields } from '../../components/UI/Input/InputField'
import { AuthContext } from '../../context/AuthContext';
import * as validate from '../Validation/Validation'

export const Login = () => {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errorEmail, setErrorEmail] = useState(false);
   const [passwordError, setPasswordError] = useState(false);


  const  onChange = async (event) => {
        const targetId = event.target.id;
        switch(targetId) {
            case('email'): 
            await setEmail(event.target.value)
            break;
            case('password'): 
            await setPassword(event.target.value)
            break;
            default: 
                break;
         }
       
        if (event.target.id === 'email') {
            if(validate.validateEmail(email)){   
                return setErrorEmail(true)
            } else {
                return setErrorEmail(false)
            }

        }
        if (event.target.id === 'password') {
            if (!password) {
                return setPasswordError(true)
            }
            if (password.length < 5) {
                return setPasswordError(true)
            } else {
                return setPasswordError(false)
            }
        }
    }

        return (
            <div className={classes.container}>
                <div className={classes.fields}>
                    <div className={classes.mr}>
                        <InputFields
                            id="email"
                            label="email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(event) => onChange(event)}
                            error={errorEmail}
                        />
                    </div>
                    <div className={classes.mr}>
                        <InputFields
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            variant="outlined"
                            onChange={(event) => onChange(event)}
                            error={passwordError}

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
                                onClick={() => handleLogin(email, password)}
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
                                    onClick={() => handleSignUp(email, password)}
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
export default  Login;