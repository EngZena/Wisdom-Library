import React, { Component } from 'react'
import Loading from '../../components/UI/Loading/Loading';
import * as services from '../../services'
import classes from './Orders.module.css'
export default class Orders extends Component {

    constructor(){
        super();
        this.state={
            orders : [],
            loading: false
        }
    }

      async  componentDidMount() {
        this.setState({...this.state , loading: true})
            const result = await services.getOrders();
            await  this.setState({...this.state ,orders: result})
        this.setState({...this.state , loading: false})

        }
        

    render() {
        return (
            <div>
                {
                    this.state.loading ? <Loading /> :
                
                
                this.state.orders.map((order, index) => {
                  return  <div key={index} className={classes.content} >
                      <div className={classes.displayFlex}>
                                  <p className={classes.mr}>   {order.firstName}</p>
                                  <p className={classes.mr}>   {order.lastName}</p>
                                  </div>

                                  <div className={classes.innerContent} >
                                  <p >  Book</p> 
                                  <p className={classes.price}>  Price </p>
                                      </div>
                         
                          <div  >
                        {order.orderList.map((book, index) => (
                             <div key={index} className={classes.innerContent} >
                              <p>  {book.name}</p>
                               <p className={classes.price}>  {book.price}</p>
                                </div>
                        ))}
                        </div>
                        <div className={classes.displayFlex}>
                        <p className={classes.mr}>Total price</p>
                        <p className={classes.mr}>  {order.totalPrice} </p>
                        </div>
                        </div>
                })}
            </div>
        )
    }
}
