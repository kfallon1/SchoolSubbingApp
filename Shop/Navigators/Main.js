//Main Navigation Component is this file
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; //imported using terminals. the / @ end gives different options to use


//import Stacks(Routes?)
import HomeNavigator from "./HomeNavigator";  //called in the components...



//initial point of navigation
const Tab = createBottomTabNavigator();

//First component for Navigation
const Main = () => {
  return (
    //return entire navigation

    <Tab.Navigator //First call Tab above, then takes props below. All tabs must go inside this so Home, Booking/Cart, etc.
                    //This creates Tab Navigator but TabNavigator needs a screen. Stack on top tp render screens...Stacks created in Home.Navigation file
        initialRouteName="Home"
      tabBarOptions={{
        keyBoardHidesTabBar: true, //keyboard hides the navigation below it
        showLabel: false,
        activeTintColor: "#e91e63", //Colourises the icons when they are active
      }}
      //Pretty sure this is main tab navigator created inside intial part here and diff screens made between the two TabNavigator Tags below
    >
      <Tab.Screen //The home tab at the bottom
        name="Home"
        component={HomeNavigator} //wil be routed here?
        options={{
          tabBarIcon: (
            { color } //Icon imported from above
          ) => (
            <Icon
              name="home" //These names are belonging to Icon class above. Home is a home, cog is a cog, user, etc. FInd one for booking thats not a cart.
              style={{ position: "relative" }} //double check why this is only needed here
              color={color}
              size={30}
            />
          ),
        }}
      />
        
      <Tab.Screen //The Cart/Booking Tab at the Bottom
        name="Booking"
        component={HomeNavigator} //will be coming back to this fill in what is when there
        options={{
          tabBarIcon: (
            { color } //pass the color and an error function
          ) => (
            <Icon
              name="handshake-o" //name that comes from font-awesome library above, found online
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen //The AdminTab at the Bottom
        name="Admin"
        component={HomeNavigator} //will be coming back to this fill in what is when there
        options={{
          tabBarIcon: (
            { color } //pass the color and an error function
          ) => (
            <Icon
              name="cog" //name that comes from font-awesome from above. This will be a cog view I guess
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen //The User at the Bottom. USER is fine for now but rem CUSTOMERS = SCHOOLS
        name="User"
        component={HomeNavigator} //will be coming back to this fill in what is when there
        options={{
          tabBarIcon: (
            { color } //pass the color and an error function
          ) => (
            <Icon
              name="user" //name that comes from font-awesome from above.
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Main;
