import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import * as services from '../../services/'
import { AuthContext } from '../../context/AuthContext';
import classes from './Books.module.css'
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InputField from "../../components/UI/Input/InputField";
import * as validation from '../Validation/'
import Loading from '../../components/UI/Loading/Loading';

export const Books = (props) => {

    const [checkoutList, setCheckoutList] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [auth, setIsAuth] = useState(false);
    const [copyBooks, setCopyBooks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [showModal, setShowModel] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [streetName, setStreetName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [streetError, setStreetError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(true);

    const fetchBooks = async () => {
        let response = await services.getBooks();
        const arr = response.data;
        setAllBooks(arr);
        setCopyBooks(arr);
    }

    useEffect(() => {
        setLoading(true);
        fetchBooks();
        setLoading(false);
        const token = localStorage.getItem('token')
        token && setIsAuth(true)
    }, [loading, auth, setIsAuth])

    const LoginRedirect = () => {
        props.history.push("/login");
    }

    const handleAddToCheckouList = async (id) => {
        const obj = await services.getBook(id);
        setCheckoutList([...checkoutList, obj.data])
        setTotalPrice(totalPrice + obj.data.price)
    }

    const handleRemoveFromCheckouList = async (id) => {
        if (checkoutList.length > 0) {
            const updatedList = checkoutList.filter(li => li.id !== (id + 1))
            const bookPrice = allBooks[id].price;
            await setCheckoutList(updatedList)
            await setTotalPrice(totalPrice - bookPrice)
        }
    }

    const handleChangeSearch = (event) => {
        setSearchInput(event.target.value)
    }

    const handleSubmitSearch = () => {
        if (searchInput !== '') {
            const result = allBooks.filter(book => book.name === searchInput)
            setCopyBooks(result);
        } else {
            setCopyBooks(allBooks)
        }
    }

    const handlePreventDefault = (event) => {
        event.preventDefault();
    };
    const closeModal = () => {
        setShowModel(false)
    }
    const openModal = () => {
        setShowModel(true)
    }

    const onChangeCheckout = async (event) => {
        const Value = event.target.value;

        if (event.target.id === 'phoneNumber') {
            setPhoneNumber(Value)
            const status = await validation.validateNumber(Value);
            status ? await setNumberError(true)
                :
                await setNumberError(false)

        }
        if (event.target.id === 'email') {
            setEmail(Value)
            const status = await validation.validateEmail(Value);
            status ? await setEmailError(true)
                :
                await setEmailError(false)
        }

        if (event.target.id === 'streetName') {
            setStreetName(Value)
            const status = await validation.validateText(Value);
            status ? await setStreetError(true)
                :
                await setStreetError(false)
        }


        if (event.target.id === 'firstName') {
            setFirstName(Value)
            const status = await validation.validateText(Value);
            status ? await setNameError(true)
                :
                await setNameError(false)
        }

        if ((phoneNumber)) {
            setDisableSubmit(false)
        }


    }

    const submitCheckout = async () => {

        if (email && phoneNumber) {

            const order = {
                'firstName': firstName,
                'email': email,
                'streetName': streetName,
                'phoneNumber': phoneNumber,
                'orderList': checkoutList,
                'totalPrice': totalPrice,
            }


            await services.postOrder(order);
            closeModal()
        }

    }

    return (
        <React.Fragment>
            <AuthContext.Consumer>

                {({ authenticated }) => (
                    !authenticated ?
                        <div>
                            <Button
                                className={classes.btn}
                                variant="contained"
                                color="primary"
                                onClick={LoginRedirect}
                            >
                                Login to Checkout
                                </Button>
                        </div> :
                        <div>
                            <Button
                                className={classes.btn}
                                variant="contained"
                                color="primary"
                                onClick={openModal}
                                disabled={checkoutList.length === 0}
                            >
                                Checkout
                                </Button>
                        </div>
                )}
            </AuthContext.Consumer>
            <div>
                <div>
                    <p></p>
                </div>
                <div>
                    <div>

                        <FormControl
                            style={{ width: '25ch', margin: '8px' }}
                            variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type='text'
                                value={searchInput}
                                onChange={handleChangeSearch}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="search"
                                            onClick={handleSubmitSearch}
                                            onMouseDown={handlePreventDefault}
                                            edge="end"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                    </div>


                </div>
            </div>

            <div className={classes.list}>
                <AuthContext.Consumer>
                    {({ authenticated }) => (
                        loading ? (
                            <div>
                                <Loading />
                            </div>
                        ) :
                            copyBooks.map((item, index) => {
                                return <Card
                                    key={index}
                                    id={item.id}
                                    name={item.name}
                                    auther={item.auther}
                                    price={item.price}
                                    type={item.type}
                                    onAdd={handleAddToCheckouList}
                                    onRemove={handleRemoveFromCheckouList}
                                    authenticated={authenticated}
                                >
                                </Card>
                            })
                    )}
                </AuthContext.Consumer>
                {
                    showModal &&
                    (
                        <div id="myModal" className={classes.modal}>

                            <div className={classes.modalContent} >
                                <span className={classes.exit} onClick={closeModal} >
                                    <HighlightOffIcon />
                                </span>

                                <h1 className={classes.modalHeader} >We hope you a worth reading </h1>
                                {(checkoutList.length > 0) && checkoutList.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className={classes.modalText}>
                                                <p>{item.name}</p>
                                                <p className={classes.price} >{item.price}</p>

                                            </div>
                                        </div>
                                    )
                                })}
                                <div className={classes.modalText}>
                                    <h3>Total price</h3>
                                    <p className={classes.price}>
                                        {totalPrice}
                                    </p>
                                </div>
                                <div className={classes.form}>
                                    <div className={classes.list}>
                                        <InputField
                                            id="firstName"
                                            label="Name"
                                            type="text"
                                            value={firstName}
                                            variant="outlined"
                                            onChange={(event) => onChangeCheckout(event)}
                                            error={nameError}
                                        >
                                        </InputField>
                                        <InputField
                                            id="email"
                                            label="email"
                                            type="text"
                                            value={email}
                                            variant="outlined"
                                            onChange={(event) => onChangeCheckout(event)}
                                            error={emailError}
                                        >
                                        </InputField>
                                        <InputField
                                            id="streetName"
                                            label="streetName"
                                            type="text"
                                            value={streetName}
                                            variant="outlined"
                                            onChange={(event) => onChangeCheckout(event)}
                                            error={streetError}
                                        >
                                        </InputField>
                                        <InputField
                                            id="phoneNumber"
                                            label="phoneNumber"
                                            type="text"
                                            value={phoneNumber}
                                            variant="outlined"
                                            onChange={(event) => onChangeCheckout(event)}
                                            error={numberError}
                                        >
                                        </InputField>
                                    </div>

                                    <div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={submitCheckout}
                                            className={classes.mr}
                                            disabled={disableSubmit}
                                        >
                                            Submit order
                                            </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    )
}
export default Books;