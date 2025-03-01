import { Image, StyleSheet, Platform,Alert,TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect } from 'react';
import { Button,Text,TextInput,Snackbar } from 'react-native-paper';
import {useRouter } from 'expo-router';
import { login  } from '@/hooks/slices/loginSlice';
import { useAppDispatch,useAppSelector } from '@/hooks/redux-hook';
import { notifyMessage } from '../utils/constants';
import { getToken } from '../services/storage/localStore';

export default function LoginScreen() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const router = useRouter();

  const auth = useAppSelector((state) => state.auth.auth.success);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
    if (email && password) {
      try {
        notifyMessage('Loading...')
        await dispatch(
          login({  
            email,
            password,
          })
        ).unwrap().then((response)=>{
          if(response.success===true){
            notifyMessage('Login successful..')
            navigateHome()
          }else{
            notifyMessage('Login failed!..')
          }
        });
      } catch (e) {
        console.error(e);
        notifyMessage('Login failed!..')
      }
    } else {
      notifyMessage('Check email or password incorrect.')
    }
  };


  const navigateHome = () => {
		router.replace('/(home)');
	};

  const navigateSignup = () => {
		router.push('/signup');
	};

  const navigateReset = () => {
		router.push('/forgot');
	};

  useEffect(()=>  {
    getToken().then(session=>{
     if(!!session){

     }else{
       navigateHome()
     }
    })
},[]);



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/benifits_of_adda.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" lightColor='#A1CEDC' darkColor='#1D3D47'>Login!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Email:</ThemedText>
        <TextInput
          mode = {'outlined'}
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Password:</ThemedText>
        <TextInput
          mode = {'outlined'}
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          keyboardType="visible-password"
        />
      </ThemedView>
      <Button style={{alignItems:'flex-end'}} textColor='#00ffff' mode="text" onPress={navigateReset}>Forgot Password?</Button>
      <Button mode="contained" onPress={handleLogin}>
       Login
      </Button>

      <ThemedView style={styles.fixToText}>
      <Text  variant="bodySmall">Don't you have an account?</Text>
      <Button textColor='#00ffff' mode="text" onPress={navigateSignup}>Sign Up</Button>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 300,
    width: 300,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 45,
    marginTop: 5,
    marginBottom:5,
    borderWidth: 1,
    paddingTop: 5,
    paddingLeft:8,
    paddingBottom:5,
    borderColor:"#ffffff",
    color:"#ffffff",
  },

  button: {
    height: 50,
    color:"#ffffff",
    borderRadius:15,
  },

  label: {
    color:"#00ffff",
    textAlign: 'right'
  },
  light: {
    color:"#dadada",
  },
  dark:{
    color:"#000000"
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
});
