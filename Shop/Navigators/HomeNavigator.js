//Creates Stacks to be added to Main.js used npm install @react-navigation/stack to install
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TeacherContainer from "../Screens/Teachers/TeacherContainer"; //import Teacher Container
import SingleTeacher from "../Screens/Teachers/SingleTeacher";

//create Stacks same way create Tabs
const Stack = createStackNavigator();

function MyStack() {
  //return stacks with this function
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TeacherContainer}
        options={{
          headerShown: false, //Don't want header shown for this part..
        }}
      />

      <Stack.Screen //Screen for a single teacher when they are clicked on
        name="Teacher Details"
        component={SingleTeacher} //imported above, JS file for a single teacher when clicked
        options={{
          headerShown: false, //Don't want header shown for this part..
        }}
      />
    </Stack.Navigator>
  );
}
export default function HomeNavigator() {
  //export the function. Review this vs other exports, objects rather than function?
  return <MyStack />;
}
