
export const validateNumber = (value) => {
    if (!(value.length === 10 || (typeof (value) === 'number'))) {
        return true;
    }
    else return false;
}


export const validateText = (value) => {
    if (!value) {
      return true;
    }
    if (value.length < 3) {
        return true;
    }
    else return false;
}


export const validateEmail = (value) => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(value)) {
        return true;
    }
    else return false;
}

