import React, { useState } from 'react'
import InputFields from '../../components/UI/Input/InputField';
import TextArea from '../../components/UI/Input/TextArea';
import classes from './Homepage.module.css'
import Button from '@material-ui/core/Button';
import * as services from '../../services'
import * as validate from '../Validation/Validation'


export const HomePage = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showErrorMessage, setSHowErrorMessage] = useState(false);

    const onChange = (event) => {
        const field = event.target.id;
        switch (field) {
            case ('firstName'):
                setFirstName(event.target.value);
                break;
            case ('lastName'):
                setLastName(event.target.value);
                break;
            case ('phoneNumber'):
                setPhoneNumber(event.target.value);
                break;
            case ('email'):
                setEmail(event.target.value);
                break;
            case ('description'):
                setDescription(event.target.value);
                break;
            case ('errorMessage'):
                setErrorMessage(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleSendMessage = () => {
        let errMessage = 'please enter valid ';
        if (validate.validateNumber(phoneNumber)) {
            errMessage = errMessage.concat('phone number, ')
        }
        if (validate.validateEmail(email)) {
            errMessage = errMessage.concat(' email,')
        }
        const firstNameValidation = validate.validateText(firstName)
        const lastNameValidation = validate.validateText(lastName)
        const descriptionValidation = validate.validateText(description)
        firstNameValidation && (errMessage = errMessage.concat(' first name,'));
        lastNameValidation && (errMessage = errMessage.concat(' last name,'));
        descriptionValidation && (errMessage = errMessage.concat(' description.'));

        setErrorMessage(errMessage)

        if (errMessage.length === 19) {
            setSHowErrorMessage(false);
            setErrorMessage('')
            const message = {
                'firstName': firstName,
                'lastName': lastName,
                'phoneNumber': phoneNumber,
                'email': email,
                'description': description,
            }
            services.postMessage(message)
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setEmail('');
            setDescription('');
            setSHowErrorMessage(false);
            setSuccessMessage('Thank you');
            counter();
        } else {
            setSHowErrorMessage(true);
            setErrorMessage(errMessage)
        }
    }

    const handleNav = () => {
        props.history.push("/Books")
    }

    const counter = () => {
        setTimeout(() => {
            setSuccessMessage('')
        }, 1000);
    }

    return (
        <div className={classes.text}>
            <p>  Wisdom Library opened in 2000.</p>
            <p>
                our purpose is to share knowledge.
                </p>
            <p>
                based on the benefits of the reading the wisdom Library becomes like support to ease the process of reading we deliver your favorite books anywhere you are and if the book does not exist on the website just contact us and we will get it for you.
                    <br />
                    here are some benefits:
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
                onClick={handleNav}
            >
                Buy books
                </Button>
            <h4>
                Contact Us
                 </h4>
            <div>
                <form >
                    <div className={classes.fields}>
                            <InputFields
                                id="firstName"
                                label="First name"
                                type="text"
                                value={firstName}
                                onChange={(event) => onChange(event)}
                            />
                            <InputFields
                                id="lastName"
                                label="Last name"
                                type="text"
                                value={lastName}
                                onChange={(event) => onChange(event)}
                            />
                            <InputFields
                                id="phoneNumber"
                                label="Phone number"
                                type="tel"
                                value={phoneNumber}
                                onChange={(event) => onChange(event)}
                            />
                            <InputFields
                                id="email"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(event) => onChange(event)}
                            />
                        </div>
                    <TextArea
                        id="description"
                        label=" Message"
                        multiline
                        rows={5}
                        variant="outlined"
                        value={description}
                        onChange={(event) => onChange(event)}
                        required
                    />
                    <div className={classes.btn}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSendMessage}
                        >
                            Send
                     </Button>
                        {showErrorMessage ? (<p>
                            {errorMessage}
                        </p>) : <p>
                                {successMessage}</p>}
                    </div>

                </form>

            </div>

        </div>

    )
}

export default HomePage;
