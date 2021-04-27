import React, { Component } from 'react'
import InputFields from '../../components/UI/Input/InputField';
import classes from './Homepage.module.css'
import Button from '@material-ui/core/Button';
import TextArea from '../../components/UI/Input/TextArea';
import * as services from '../../services'


export default class HomePage extends Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            description: '',
            successMessage: '',
            errorMessage: '',
            showErrorMessage: false,
        }
    }

    onChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
    }

    handleSendMessage = () => {
        let errorMessage = 'please enter valid ';
        if (!(this.state.phoneNumber.length === 10 || (typeof (this.state.phoneNumber) === 'number'))) {
            errorMessage = errorMessage.concat('phone number, ')
        }
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(this.state.email)) {
            errorMessage = errorMessage.concat(' email,')
        }
        const firstNameValidation = this.checkLength(this.state.firstName)
        const lastNameValidation = this.checkLength(this.state.lastName)
        const descriptionValidation = this.checkLength(this.state.description)
        firstNameValidation && (errorMessage = errorMessage.concat(' first name,'));
        lastNameValidation && (errorMessage = errorMessage.concat(' last name,'));
        descriptionValidation && (errorMessage = errorMessage.concat(' description.'));

        this.setState({
            ...this.state,
            errorMessage: errorMessage
        })
        if (errorMessage.length === 19) {
            this.setState({
                ...this.state,
                showErrorMessage: false,
                errorMessage: '',
            })
            this.setState({
                ...this.state,
                successMessage: 'Thank you',
            })
            const message = {
                'firstName': this.state.firstName,
                'lastName': this.state.lastName,
                'phoneNumber': this.state.phoneNumber,
                'email': this.state.email,
                'description': this.state.description,
            }
            services.postMessage(message);
            
            this.setState({
                ...this.state,
                firstName: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                description: '',
                showErrorMessage: false,
              
            });
            this.counter();
           
        } else {
            this.setState({
                ...this.state,
                showErrorMessage: true,
                errorMessage: errorMessage
            })
        }
    }

    handleNav = () => {
        this.props.history.push("/Books")
    }

    counter = () => {
        console.log('counter', this.state)
        setTimeout(() => {
            console.log('timer', this.state)
            this.setState({
                ...this.state,
                successMessage: ''
            })
        }, 1000);
    }
    checkLength = (name) => {
        if (!name) {
            return true;
        }
        if (name.length < 3) {
            return true;
        }
        else return false
    }

    render() {


        return (
            <div className={classes.text}>
                <p>  Wisdom Library opened in 2000.</p>
                <p>
                    our purpose is to share knowledge.
                </p>
                <p>
                    based on the benefits of the reading the wisdom Library becomes like support to ease the process of reading we deliver your favorite books anywhere you are and if the book does not exist on the website just contact us and we will get it for you.
                    <br /> here are some benefits:
                </p>
                <ul>
                    <li>Mental Stimulation</li>
                    <li>Memory Improvement</li>
                    <li>Improved Focus and Concentration</li>
                </ul>
                <p className={classes.bold}>
                    If you devote 15 minutes to reading a day, you will read 20 books a year, then you will be on the list of 20% of the most read people in the world.
                </p>
                <p>
                    you can visit us opposite Abdali Mall in Amman - Jordan
                </p>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNav}
                >
                    Buy books
                </Button>
                <h4>
                    Contact Us
                 </h4>
                <div>
                    <form className={classes.form}>
                    <div className={classes.fields}>
                       
                        <InputFields
                            id="firstName"
                            label="first name"
                            className={classes.field}
                            type="text"
                            value={this.state.firstName}
                            onChange={(event) => this.onChange(event)}
                        />
                        <InputFields
                            id="lastName"
                            label="last name"
                            type="text"
                            value={this.state.lastName}
                            onChange={(event) => this.onChange(event)}
                        />
                        <InputFields
                            id="phoneNumber"
                            label="phone number"
                            type="tel"
                            value={this.state.phoneNumber}
                            onChange={(event) => this.onChange(event)}
                        />
                        <InputFields
                            id="email"
                            label="email"
                            type="email"
                            value={this.state.email}
                            onChange={(event) => this.onChange(event)}
                        />
                        </div>
                        <TextArea
                        id="description"
                        label=" Message"
                        multiline
                        rows={5}
                        variant="outlined"
                        value={this.state.description}
                        onChange={(event) => this.onChange(event)}
                        required
                    />
                        <div className={classes.btn}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleSendMessage}
                            >
                                Send
                     </Button>
                            {this.state.showErrorMessage ? (<p>
                                {this.state.errorMessage}
                            </p>) : (<p>
                                {this.state.successMessage}</p>)}
                        </div>
                    </form>

                </div>

            </div>

        )
    }
}
