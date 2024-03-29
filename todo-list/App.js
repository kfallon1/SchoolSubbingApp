import { StatusBar } from 'expo-status-bar';
import React, {userState} from 'react';     //userState is a hook
import { StyleSheet, Text, View } from 'react-native';

import TodoList from './Components/TodoList'; //imported from components and used below as a base screen I think?

export default function App() {
  return (
    <View style={styles.container}>
      <TodoList/> 
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
