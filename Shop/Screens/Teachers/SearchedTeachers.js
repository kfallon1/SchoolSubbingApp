import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Content, Left, Body, ListItem, Thumbnail, Text } from "native-base";

var { width } = Dimensions.get("window");

const SearchedTeacher = (props) => {
  const { teachersFiltered } = props;

  return (
    <Content style={{ width: width }}>
      {teachersFiltered.length > 0 ? ( //search through all of the teachersFiltered array
        teachersFiltered.map((item) => (
          <ListItem
          //onPress is what happens when press on item coming up on search list.. navigate to Teacher Detail in HomeNavigator & item:item is route parimeter
            onPress= {() => {
              props.navigation.navigate("Teacher Details", {item:item}) //make sure matched whats in navigate file 'TeacherDetails'
            }}
            key={item._id.$oid}
            avatar //not sure what this is or does
          >
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : "https://www.civictheatre.ie/wp-content/uploads/2016/05/blank-profile-picture-973460_960_720.png",
                }}
              />
            </Left>

            <Body>
              <Text> {item.name} </Text>
              <Text note> {item.isAvailable} </Text>
            </Body>
          </ListItem>
        ))
      ) : (
        //this is for if it's not present/list is >0
        <View style={StyleSheet.center}>
          <Text style={{ alignSelf: "center" }}>
            No teachers match your search
          </Text>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchedTeacher;
