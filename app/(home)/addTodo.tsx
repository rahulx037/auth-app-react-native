import * as React from 'react';
import { TextInput,Divider,Button } from 'react-native-paper';
import {useRouter } from 'expo-router';
import { View,StyleSheet } from 'react-native';
import { notifyMessage } from '../utils/constants';
import { useAppDispatch,useAppSelector } from '@/hooks/redux-hook';
import { createTask } from '@/hooks/slices/todoSlice';
import { Data } from '@/hooks/models/todoState';

export default function AddTodoScreen() {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const dispatch = useAppDispatch();

  const handleAddNotes = async () => {
        // This is only a basic validation of inputs. Improve this as needed.
        if (title && desc) {
          notifyMessage('Submitting...')
          try {
            await dispatch(
              createTask({title:title,description:desc} as Data)
            ).unwrap().then((response)=>{
              if(response.success===true){
                notifyMessage('Notes created successful..')
              
              }else{
                notifyMessage('Task creation failed!..')
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
    <View style={{flex:1}}>
    <TextInput
      style={styles.stepContainer}
      label="Title"
      value={title}
      onChangeText={text => setTitle(text)}
    />
    <TextInput
    style={styles.stepContainer}
    label="Description"
    value={desc}
    onChangeText={text => setDesc(text)}
   />
  <Divider />
  
  <Button style={styles.stepContainer}
   icon="note" mode="contained" onPress={handleAddNotes}>
    Save Note
  </Button>
  </View>
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
    margin:15
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

