import React, { useEffect, useState } from 'react'
import Loading from '../../components/UI/Loading/Loading';
import * as services from '../../services'
import classes from './Orders.module.css'

export const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchorders = async () => {
        const result =
            await services.getOrders();
        setOrders(result);
        return result;
    }
    useEffect(() => {
        setLoading(true);
        fetchorders();
        setLoading(false);
    }, [loading])

    return (
        <div>
            {
                loading ? <Loading /> :


                    orders.map((order, index) => {
                        return <div key={index} className={classes.content} >
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

export default Orders;