import { Image, StyleSheet, Platform,Alert,TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button,Text,TextInput } from 'react-native-paper';
import {useRouter } from 'expo-router';

export default function LoginScreen() {
  const [text, onChangeText] = React.useState('Email');
  const [password, onChangePassword] = React.useState('Password');
  const router = useRouter();

  const navigateHome = () => {
		router.push('/(home)');
	};

  const navigateSignup = () => {
		router.push('/signup');
	};

  const navigateReset = () => {
		router.push('/forgot');
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
        <ThemedText type="title" lightColor='#A1CEDC' darkColor='#1D3D47'>Login!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Email:</ThemedText>
        <TextInput
          mode = {'outlined'}
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
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
      <Button mode="contained" onPress={navigateHome}>
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
    height: 178,
    width: 290,
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
