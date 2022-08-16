import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
//TouchableOpacity uses the touch properties of devices
//Dimensions allow us to get the dimensions of the device/window thats using program, does style dynamiclly

import TeacherCard from "./TeacherCard"; //TeacherCard is used down below as a tag <TeacherCard> and is passed some props in there

var { width } = Dimensions.get("window"); //will be used within style below/touchableopacity

const TeacherList = (props) => {
  const { item } = props;

  return (
    <TouchableOpacity
      style={{ width: "50%" }}
      //On Press event goes in here within Touchable Opacity
      onPress={
        () =>
          //use Navigate Property
          props.navigation.navigate("Teacher Details", { item: item }) //Navigate to the Teacher Details Screen from HomeNavigator.js and item: item passes everything through the navigation
      }
    >
      <View style={{ width: width / 2, backgroundColor: "gainsboro" }}>
        <TeacherCard
          {...item} //Think this is the passing of props into the teacherCard here
        />
      </View>
    </TouchableOpacity>
  );
};

export default TeacherList;
