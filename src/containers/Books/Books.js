import React, { Component } from 'react'
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

export class Books extends Component {

    constructor() {
        super();
        this.state = {
            checkoutList: [],
            allBooks: [],
            isAuth: false,
            copyBooks: [],
            searchInput: '',
            showModal: false,
            totalPrice: 0,
            firstName: '',
            email: '',
            streetName: '',
            phoneNumber: '',
            nameError: false,
            emailError: false,
            streetError: false,
            numberError: false,
            loading: false,
            disableSubmit: true
        }
    }

    async componentDidMount() {
        this.setState({ ...this.state, loading: true });
        let response = await services.getBooks();
        const arr = response.data;
        this.setState({ ...this.state, allBooks: arr });
        this.setState({ ...this.state, copyBooks: arr });
        this.setState({ ...this.state, loading: false });

        const token = localStorage.getItem('token')
        token && this.setState({ ...this.state, isAuth: true })
    }

    LoginRedirect = () => {
        this.props.history.push("/login");
    }

    handleAddToCheckouList = async (id) => {
        const obj = await services.getBook(id)
        this.setState({
            ...this.state,
            checkoutList: [...this.state.checkoutList, obj.data],
            totalPrice: this.state.totalPrice + obj.data.price
        })
    }

    handleRemoveFromCheckouList = async (id) => {
        const updatedList = this.state.checkoutList.filter(li => li.id !== id)
        const bookPrice = this.state.allBooks[id].price;
        this.setState({
            ...this.state,
            checkoutList: updatedList,
            totalPrice: this.state.totalPrice - bookPrice
        })
    }

    handleChangeSearch = (event) => {
        this.setState({ ...this.state, searchInput: event.target.value });
    }

    handleSubmitSearch = () => {
        if (this.state.searchInput !== '') {
            const result = this.state.allBooks.filter(book => book.name === this.state.searchInput)
            this.setState({ ...this.state, copyBooks: result });
        } else {
            this.setState({ ...this.state, copyBooks: this.state.allBooks });
        }
    }

    handlePreventDefault = (event) => {
        event.preventDefault();
    };
    closeModal = () => {
        this.setState({ ...this.state, showModal: false })
    }
    openModal = () => {
        this.setState({ ...this.state, showModal: true })
    }

    onChangeCheckout = async(event) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
        if(event.target.id === 'phoneNumber'){
            const status =  await validation.validateNumber(event.target.value);
            status ? await this.setState({
                ...this.state,
                numberError: true
            }) :
            await this.setState({
                ...this.state,
                numberError: false
            }) 
        }
            if(event.target.id === 'email'){
                const status =  await validation.validateEmail(event.target.value);
                status ? await this.setState({
                    ...this.state,
                    emailError: true
                }) :
                await this.setState({
                    ...this.state,
                    emailError: false
                }) 
            }
        
            if(event.target.id === 'streetName'){
                const status =  await validation.validateText(event.target.value);
                status ? await this.setState({
                    ...this.state,
                    streetError: true
                }) :
                await this.setState({
                    ...this.state,
                    streetError: false
                }) 
            }
        
        
            if(event.target.id === 'firstName'){
                const status =  await validation.validateText(event.target.value);
                status ? await this.setState({
                    ...this.state,
                    nameError: true
                }) :
                await this.setState({
                    ...this.state,
                    nameError: false
                }) 
            }
        
            if((this.state.phoneNumber)){
              this.setState({
                  ...this.state,
                  disableSubmit: false
              })
          }


    }

    submitCheckout = async () => {

    if(this.state.email && this.state.phoneNumber ) {
                
        const order = {
            'firstName': this.state.firstName,
            'email': this.state.email,
            'streetName': this.state.streetName,
            'phoneNumber': this.state.phoneNumber,
            'orderList': this.state.checkoutList,
            'totalPrice': this.state.totalPrice,
        }
        
       
            await services.postOrder(order);
            this.closeModal()
        }
       
    }



    render() {

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
                                    onClick={this.LoginRedirect}
                                >
                                    Login to Checkout
                                </Button>
                            </div> :
                            <div>

                                <Button
                                    className={classes.btn}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.openModal}
                                    disabled={this.state.checkoutList.length === 0}
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
                                value={this.state.searchInput}
                                onChange={this.handleChangeSearch}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="search"
                                            onClick={this.handleSubmitSearch}
                                            onMouseDown={this.handlePreventDefault}
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

                     {this.state.loading ? (
                     
                     <div> 
                        <Loading />
                     </div>
                     
                     ) :                
                this.state.copyBooks.map((item, index) => {
                        return <Card
                            key={index}
                            id={item.id}
                            name={item.name}
                            auther={item.auther}
                            price={item.price}
                            type={item.type}
                            onAdd={this.handleAddToCheckouList}
                            onRemove={this.handleRemoveFromCheckouList}
                        >
                        </Card>
                    })}
                    {
                        this.state.showModal &&
                        (
                            <div id="myModal" className={classes.modal}>

                                <div className={classes.modalContent} >
                                    <span className={classes.exit} onClick={this.closeModal} >
                                        <HighlightOffIcon />
                                    </span>


                                    <h1 className={classes.modalHeader} >We hope you a worth reading </h1>
                                    {this.state.checkoutList.map((item, index) => {
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
                                            {this.state.totalPrice}
                                        </p>
                                    </div>
                                    <div   className={classes.form}>
                                        <div className={classes.list}>
                                            <InputField
                                                id="firstName"
                                                label="Name"
                                                type="text"
                                                value={this.state.firstName}
                                                variant="outlined"
                                                onChange={(event) => this.onChangeCheckout(event)}
                                                error={this.state.nameError}
                                            >
                                            </InputField>
                                            <InputField
                                                id="email"
                                                label="email"
                                                type="text"
                                                value={this.state.email}
                                                variant="outlined"
                                                onChange={(event) => this.onChangeCheckout(event)}
                                                error={this.state.emailError}
                                            >
                                            </InputField>
                                            <InputField
                                                id="streetName"
                                                label="streetName"
                                                type="text"
                                                value={this.state.streetName}
                                                variant="outlined"
                                                onChange={(event) => this.onChangeCheckout(event)}
                                                error={this.state.streetError}
                                            >
                                            </InputField>
                                            <InputField
                                                id="phoneNumber"
                                                label="phoneNumber"
                                                type="text"
                                                value={this.state.phoneNumber}
                                                variant="outlined"
                                                onChange={(event) => this.onChangeCheckout(event)}
                                                error={this.state.numberError}
                                            >
                                            </InputField>
                                        </div>

                                        <div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.submitCheckout}
                                                className={classes.mr}
                                                disabled={this.state.disableSubmit}
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
}
export default React.memo(Books)