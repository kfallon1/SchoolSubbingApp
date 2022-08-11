import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Screens
import TeacherContainer from './Screens/Teachers/TeacherContainer';
import  Header  from './Shared/Header'; //Used below to maintain the same header for the whole application

export default function App() {
  return (
    <View style={styles.container}>
      <Header /> 
      <TeacherContainer />
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
