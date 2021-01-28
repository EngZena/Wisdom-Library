import {instance} from '../axios-instanse';


 export  const  postMessage = async (message) => {
    const res = await  instance.post(`messages.json` , message).then(
           response => {
               return response
           }
       ).catch(error => {
           console.log('error' , error)
       })
       return res;
   }