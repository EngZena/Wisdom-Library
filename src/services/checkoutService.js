import {instance} from '../axios-instanse';

 export  const  postOrder = async (order) => {
    const userId = localStorage.getItem('userId')

    const res = await  instance.post(`orders/${userId}.json` , order).then(
           response => {
               console.log('response', response)
               return response
           }
       ).catch(error => {
           console.log('error' , error)
       })
       return res;
   }


export const getOrders = async () => {
    const userId = localStorage.getItem('userId')
    
    const res = await instance.get(`orders/${userId}.json`).then(
        response => {
            const loadedData = [];
            const result = response.data
            for(const key in result) {
              loadedData.push({
                id: key,
                firstName: result[key].firstName,
                lastName: result[key].lastName,
                phoneNumber: result[key].phoneNumber,
                streetName: result[key].streetName,
                totalPrice: result[key].totalPrice,
                orderList: result[key].orderList,
              })
            }
            return loadedData
        }
    ).catch(error=> {
        console.log('error', error)
    })
    return res;
}
