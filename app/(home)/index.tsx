
import React from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View ,TouchableOpacity,RefreshControl,Platform,I18nManager} from "react-native";
import { Searchbar,FAB,Portal,Avatar } from 'react-native-paper';
import {useRouter } from 'expo-router';
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, fetchAllTodo  } from '@/hooks/slices/todoSlice';

const persons = [
  { id: 1, name: 'John Brahm', designation: 'Project Manager' },
  { id: 2, name: 'Tom Jack', designation: 'Software Engineer' },
  { id: 3, name: 'Mark Bell', designation: 'QA Engineer' },
  { id: 4, name: 'Marshall Doe', designation: 'Software Engineer' },
  { id: 5, name: 'John Dow', designation: 'Product Manager' },
  { id: 6, name: 'Harry Jam', designation: 'Team Lead' },
  { id: 7, name: 'Oliver James', designation: 'Graphic Designer' },
  { id: 8, name: 'Ella Avery', designation: 'QA Engineer' },
  { id: 9, name: 'William Thomas', designation: 'Graphic Designer' },
  { id: 10, name: 'Edward Brian', designation: 'Team Lead' },
];


  export default function TodoHome() {

    const [searchQuery, setSearchQuery] = React.useState('');
    const [showButton, setShowButton] = React.useState(true)

    const router = useRouter();
    
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
        data={persons}
        onMomentumScrollBegin={()=>setShowButton(false)}
        onMomentumScrollEnd={()=>setShowButton(true)}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            title={'Fetching data...'}
          />
        }
        keyExtractor={(item) => item.id.toString()}
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
                  <Text style={styles.heading2}>{item.name}</Text>
                  <Text style={styles.subheading}>{item.designation}</Text>
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