import {Platform, Dimensions} from 'react-native';
export const API_BASE_URL = "https://node-authenticate-ztc6.onrender.com/api/";
export const MAX_POSTS_PER_PAGE = 10;

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;