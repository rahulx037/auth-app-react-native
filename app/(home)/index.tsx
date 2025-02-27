
import React, { useEffect } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View ,TouchableOpacity,RefreshControl,Platform,I18nManager} from "react-native";
import { Searchbar,FAB,Portal,Avatar } from 'react-native-paper';
import {useRouter } from 'expo-router';
import { clearTask, getallTask  } from '@/hooks/slices/todoSlice';
import { useAppDispatch,useAppSelector } from '@/hooks/redux-hook';
import { notifyMessage } from '../utils/constants';
import { List } from 'react-native-paper';
import { useRef } from "react";
import { State } from "react-native-gesture-handler";


export default function TodoHome() {

    const [searchQuery, setSearchQuery] = React.useState('');
    const [showButton, setShowButton] = React.useState(true)
    const router = useRouter();
    const hasRun = useRef(false)

    const tasks = useAppSelector((state) => state.todos.todos);
    const dispatch = useAppDispatch();

    
    useEffect(()=>{
      const fetchTask = async () => {
        try {
          await dispatch(
            getallTask(0)
          ).unwrap().then((response)=>{
            if(response.success===true){
              console.log(response.data)
              notifyMessage('Task Fetch successful..')
            }else{
              notifyMessage('Login failed!..')
            }
          });
        } catch (e) {
          console.error(e);
        }
      };

      fetchTask()
      return () => {
        dispatch(clearTask()); // Clear user data when the component is unmounted
      };
    },[]);
    
      const navigateToAdd = () => {
        router.push('../addTodo');
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
      <View style={{flex:1}}>
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
             elevation={1}
             placeholder="Search"
             onChangeText={setSearchQuery}
             value={searchQuery}
          />
        )}
        ListFooterComponent={() => (
          <Text style={{ fontSize: 30, textAlign: "center",marginBottom:50,marginTop:50,fontWeight:'bold' ,color:'grey' }}>Your Task</Text>
        )}

        renderItem={({item}) => {
          return (
            <List.Item
                title={item.title}
                description={item.description}
                left={props => <List.Icon {...props} icon="folder" />}
            />
          );
        }}
      />
     <FAB
        size="medium"
        color="white"
        icon="plus"
        label="Add Note"
        style={styles.fab}
        onPress={navigateToAdd}
     />
     
    </View>
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
      zIndex:1
    },
  });