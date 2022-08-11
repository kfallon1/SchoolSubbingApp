import React, { useState, useEffect } from "react"; //{these are hooks we can use, hook = method}
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native"; //FlatList used to render list
import { Container, Header, Icon, Item, Input, Text } from "native-base";

import TeacherList from "./TeacherList";
import SearchedTeacher from "./SearchedTeachers"; 

//This imports the teachers/data from the JSON file in assets
const data = require("../../assets/data/teachers.json");

var { height } = Dimensions.get("window");

//This const is rendered in the main app.js file as a retun function. Guess builds the whole screen and it's function?!
const TeacherContainer = () => {
  const item = {}; //This solves can't find variable item
  const [teachers, setTeachers] = useState([]); //Setting the state of the teachers and putting them in an array
  const [teachersFiltered, setTeachersFiltered] = useState([]); //Functionality for search teacher This created before TeacherSearched.js not sure about useState() think its created here to be used as props in const
  const [focus, setFocus] = useState(); //event for when we focus the input

  //Use effect is the function to fetch the data/teachers from the file which is called data
  useEffect(() => {
    setTeachers(data);
    setTeachersFiltered(data);
    setFocus(false); //initial focus state is false so only used when search occurs

    return () => {
      setTeachers([]); //Reset the teachers again to empty array
      setTeachersFiltered([]);
      setFocus();
    };
  }, []); //Not sure why empty array needs to be here something to do with no call back from =>

  const searchTeacher = (text) => {
    setTeachersFiltered(
      //method for searching and finding teacher
      teachers.filter((i) => i.name.toLowerCase().includes(text.toLowerCase())) //LowerCase used so all ways of spelling included
    );
  };

  //Simple methods to setFocus to true and false. Make sure to include in the return above
  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    //Everything goes inside native-base container
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onFocus={openList} //Sets focus to true, method created above
            onChangeText={(text) => searchTeacher(text)} //text is the input, searchTeacher function using inputted text
          />

          {focus == true ? (
            <Icon onPress ={onBlur} name = "ios-close" /> //Think function for clicking the little x to bring back to main list

          ) : null 
          }

        </Item>
      </Header>

      {focus == true ? ( //If the focus above is true then we do this else, we return the flat list below of all proucts
        <SearchedTeacher
        teachersFiltered = {teachersFiltered}

        />
      ) 
      //else part here is rendering the flat list
      : ( 
        <View styles={styles.container}>
          <Text> Teacher Container List loading </Text>

          <View style={styles.listContainer}>
            <FlatList
              //horizontal
              data={teachers}
              numColumns={2} //numColumns does not support horizontal error,...changes layout?? was = {2}
              renderItem={({ item }) => (
                <TeacherList //renderItem function here renders the full teacherList js created
                  key={item.id}
                  item={item}
                />
              )}
              keyExtractor={item.name}
            />
          </View>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TeacherContainer;
/*
See lecture 94 questions someone has this error, seems to affect Web App part only
soloution is to copy in their package j.son file.......

./node_modules/@codler/react-native-keyboard-aware-scroll-view/lib/KeyboardAwareHOC.js 13:12
Module parse failed: Unexpected token (13:12)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loader



*/
