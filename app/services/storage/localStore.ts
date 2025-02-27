// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const storeToken = async (value:string) => {
//     try {
//       await AsyncStorage.setItem('token', value);
//     } catch (e) {
//       // saving error
//       console.log(e)
//     }
//   };

//  export const getToken = async () => {
//     var token : string = ""
//     try {
//       const value = await AsyncStorage.getItem('token');
//       if (value !== null) {
//         // value previously stored
//         token = value;
//       }
//     } catch (e) {
//       // error reading value
//     }
//     return token;
//   };

// export  const storeJson = async (value:any) => {
//     try {
//       const jsonValue = JSON.stringify(value);
//       await AsyncStorage.setItem('data', jsonValue);
//     } catch (e) {
//       // saving error
//       console.log(e)
//     }
//   };

// export  const getJson = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('data');
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch (e) {
//       // error reading value
//     }
//   };