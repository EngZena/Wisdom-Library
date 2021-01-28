import {authInstance} from '../axios-instanse';

const storeInLocalStorage = (response) => {
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
    localStorage.setItem('token', response.data.idToken)
    localStorage.setItem('expirationDate', expirationDate)
    localStorage.setItem('userId',  response.data.localId)
    return true
}

export const signIn = async (email,password) => {
   const url = 'accounts:signInWithPassword?key=AIzaSyCpNkbRQ2drGQh3NdhyJuya_XejMzd7F3k'
    const authData = {
        'email': email,
        'password': password,
        'returnSecureToken': true
    }
    const res = await authInstance.post(url, authData)
    .then(response => {
        storeInLocalStorage(response)
        return response;
    }).catch(error =>{
        console.log('error',error)
        return false
    }
       )
        return res 
}


export const signUp = async (email, password) => {
    const url = 'accounts:signUp?key=AIzaSyCpNkbRQ2drGQh3NdhyJuya_XejMzd7F3k'
    const authData = {
        'email': email,
        'password': password,
        'returnSecureToken': true
    }
    const res =  await authInstance.post(url,authData)
    .then(response => {
        storeInLocalStorage(response)
        return response;
    }).catch(error => {
        console.log('error',error)
        return false
    })
    return res
}

export const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
}
