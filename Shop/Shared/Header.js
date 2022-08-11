//This shared folder is for components that will be used throughout the application
//The whole application will require a header and thus we make it here

import React from "react";
import { StyleSheet, Image, View, SafeAreaView } from "react-native"; //safeareaview sets certain paramters that won't be overrided

//Same pattern create the const and return the UI/user interface
const Header = () => {
  return (
    <SafeAreaView style={styles.Header}>
      <Image //The image here is the logo of the
        source={require("../assets/SchoolStaffClipart.jpg")}
        resizeMode="contain"
        Style={{ height: 50 }}
      />
    </SafeAreaView>
  );

  
};

const styles = StyleSheet.create({
  header: {
      width: "100%",
      flexDirection: 'row',
      alignContent: "center",
      justifyContent: "center",
      padding: 20
  }
})

export default Header;