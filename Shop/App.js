import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

//Redux Call: Redux is used to manage and update the application state using 'actions'
import {Provider} from 'react-redux'; //embeds application with redux state
import store from './Redux/store';

//Navigators
import Main from "./Navigators/Main"; //This will be used below. Content will be copied inside the navigation container

//Screens
import TeacherContainer from "./Screens/Teachers/TeacherContainer";
import Header from "./Shared/Header"; //Used below to maintain the same header for the whole application
 

export default function App() {
  return (
    <Provider store = {store} //The whole return needs to go inside the Provider above so it has Redux State
    >  
    <NavigationContainer //The Views, Containers, etc. are viewed within the navigation container
    >
        <Header />
        <Main //The previous route here was TeacherContainer which points to teacher list but this is now done via the component part in <Main />
        />
    </NavigationContainer>
    </Provider>
  );
}

