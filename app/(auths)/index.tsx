import React from 'react';
import LoginScreen from './login';
import { Provider } from 'react-redux';
import store from '@/hooks/store';

export default function DashboardScreen() {
  return (
    <Provider store={store}>
       <LoginScreen/>
    </Provider> 
  );
};