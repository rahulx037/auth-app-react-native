import { Image, StyleSheet, Platform,Alert,TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button,Text,TextInput } from 'react-native-paper';
import React from 'react';

export default function ForgotScreen() {
  const [text, onChangeText] = React.useState('Email');
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
        <ThemedText type="title">Forgot Password?</ThemedText>
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
      <Button mode="contained" onPress={() =>  console.log('Android Clicked')}>
      Reset
      </Button>

      <ThemedView style={styles.fixToText}>
      <Text  variant="bodySmall">Already have an account?</Text>
      <Button textColor='#00ffff' mode="text" onPress={() =>console.log('Android Clicked')}>Login</Button>
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
    height: 40,
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
  member: {
    color:"#ffffff",
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
});
