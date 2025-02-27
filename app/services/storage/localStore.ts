import * as SecureStore from 'expo-secure-store';

export const setToken = (token:string) => {
    return SecureStore.setItemAsync('secure_token', token);
};

export const getToken = () => {
    return SecureStore.getItemAsync('secure_token');
};

//setToken('#your_secret_token');
//getToken().then(token => console.log(token));