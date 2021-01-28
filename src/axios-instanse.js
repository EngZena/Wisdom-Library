import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://wisdom-library-d06e8-default-rtdb.europe-west1.firebasedatabase.app/'
});

export const authInstance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/'
});

