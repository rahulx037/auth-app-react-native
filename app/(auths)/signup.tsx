import { Image, StyleSheet, Platform,Alert,TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button,Text,TextInput } from 'react-native-paper';
import React from 'react';
import {register  } from '@/hooks/slices/loginSlice';
import { NewUser } from '@/hooks/models/authState';
import { useAppDispatch,useAppSelector } from '@/hooks/redux-hook';
import { notifyMessage } from '../utils/constants';
import {useRouter } from 'expo-router';

export default function SignupScreen() {
 
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [username, onUserName] = React.useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const navigateHome = () => {
      router.replace('/(home)');
    };
  
  const handleSignUp = async () => {
      // This is only a basic validation of inputs. Improve this as needed.
      if (email && password && username) {
        notifyMessage('Loading...')
        try {
          await dispatch(
            register({name:username,email:email,password:password} as NewUser)
          ).unwrap().then((response)=>{
            if(response.success===true){
              notifyMessage('Registeration successful..')
              navigateHome()
            }else{
              notifyMessage('Registeration failed!..')
            }
          });
        } catch (e) {
          console.error(e);
        }
      } else {
       notifyMessage('Please fill mendatory fields..')
      }
    };

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
        <ThemedText type="title">Register!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">User Name:</ThemedText>
        <TextInput
          mode = {'outlined'}
          style={styles.input}
          onChangeText={onUserName}
          value={username}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Email:</ThemedText>
        <TextInput
          mode = {'outlined'}
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          keyboardType="visible-password"
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Password:</ThemedText>
        <TextInput
          mode = {'outlined'}
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          keyboardType="visible-password"
        />
      </ThemedView>

      <Button mode="contained" onPress={handleSignUp}>
      Register
      </Button>
      

      <ThemedView style={styles.fixToText}>
            <Text  variant="bodySmall">Already have an account?</Text>
            <Button textColor='#00ffff' mode="text" onPress={() =>console.log("Done")}>Login</Button>
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
    gap: 5,
    marginBottom: 5,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    marginTop: 5,
    marginBottom:5,
    borderWidth: 1,
    paddingTop: 5,
    paddingLeft:8,
    paddingBottom:5,
    borderColor:"#ffffff",
    color:"#ffffff"
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
  member: {
    color:"#ffffff",
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
});
