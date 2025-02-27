
import React, { useEffect } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View ,TouchableOpacity,RefreshControl,Platform,I18nManager} from "react-native";
import { Searchbar,FAB,Portal,Avatar } from 'react-native-paper';
import {useRouter } from 'expo-router';
import { clearTask, getallTask  } from '@/hooks/slices/todoSlice';
import { useAppDispatch,useAppSelector } from '@/hooks/redux-hook';
import { notifyMessage } from '../utils/constants';

export default function TodoHome() {

    const [searchQuery, setSearchQuery] = React.useState('');
    const [showButton, setShowButton] = React.useState(true)
    const router = useRouter();

     const tasks = useAppSelector((state) => state.todos.todos);
      const dispatch = useAppDispatch();

    const fetchTask = async () => {
        // This is only a basic validation of inputs. Improve this as needed.
        try {
          await dispatch(
            getallTask(0)
          ).unwrap().then((response)=>{
            if(response.success===true){
              notifyMessage('Task Fetch successful..')
            }else{
              notifyMessage('Login failed!..')
            }
          });
        } catch (e) {
          console.error(e);
        }
      };
    
    useEffect(()=>{
      fetchTask()
      return () => {
        dispatch(clearTask()); // Clear user data when the component is unmounted
      };
    },[tasks]);
    
      const navigateToAdd = () => {
        router.push('/(home)/addTodo');
      };

    const myItemSeparator = () => {
      return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10}} />;
      };
    
    const myListEmpty = () => {
      return (
        <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
        </View>
      );
    };
      
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        onMomentumScrollBegin={()=>setShowButton(false)}
        onMomentumScrollEnd={()=>setShowButton(true)}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            title={'Fetching data...'}
          />
        }
        keyExtractor={(item) => (item._id) as string}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        ListHeaderComponent={() => (
          <Searchbar
             elevation={0}
             placeholder="Search"
             onChangeText={setSearchQuery}
             value={searchQuery}
          />
        )}
        ListFooterComponent={() => (
          <Text style={{ fontSize: 30, textAlign: "center",marginBottom:65,fontWeight:'bold' ,color:'grey' }}>Thank You</Text>
        )}

        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                
              }}>
                <View style={styles.listTile}>
                  <Avatar.Icon size={35} icon="note" />
                  <View style={styles.flatlist}>
                  <Text style={styles.heading2}>{item.title}</Text>
                  <Text style={styles.subheading}>{item.description}</Text>
                 </View>
                </View>
             
            </TouchableOpacity>
          );
        }}
      />
     <Portal>
     <FAB
        size="medium"
        color="blue"
        icon="plus"
        label="Add Note"
        style={styles.fab}
        onPress={navigateToAdd}
     />
    </Portal>
    </SafeAreaView>
    );
   }
   
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 8,
      fontSize: 30,
      position: "relative",
    },
    listTile: {
      flex: 1,
      flexDirection:'row',
      alignItems:'center'
    },
    item: {
      padding: 20,
      marginTop: 5,
      fontSize: 15,
    },

    flatlist: {
      paddingVertical: 30,
      paddingHorizontal: 10,
    },
    heading2: {
      fontSize: 18,
      color: 'grey',
    },
    subheading: {
      color: 'grey',
    },
    fab: {
      position: 'absolute',
      right: 16,
      bottom:16,
    },
  });