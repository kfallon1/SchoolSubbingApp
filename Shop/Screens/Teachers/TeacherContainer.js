import React, { useState, useEffect } from "react"; //{these are hooks we can use, hook = method}
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native"; //FlatList used to render list 
import { Container, Header, Icon, Item, Input, Text } from "native-base";

import TeacherList from "./TeacherList";
import SearchedTeacher from "./SearchedTeachers";
import Banner from "../../Shared/Banner"; //WORKS BUT LOSE THE TEACHER LIST WHEN I USE IT
import CategoryFilter from "./CategoryFilter"; //NOT WORKING EITHER? RENDER METHOD/IMPORT ERROR?

import baseURL from '../../assets/common/baseUrl'

import axios from 'axios'//axios handles HTTP Requests 

//This imports the teachers/data from the JSON file in assets
const data = require("../../assets/data/teachers.json");
const teacherCategories = require("../../assets/data/categories.json"); //categories import

var { height } = Dimensions.get("window");

//This const is rendered in the main app.js file as a retun function. Guess builds the whole screen and it's function?!
const TeacherContainer = (props) => {
  const item = {}; //This solves can't find variable item
  const [teachers, setTeachers] = useState([]); //Setting the state of the teachers and putting them in an array
  const [teachersFiltered, setTeachersFiltered] = useState([]); //Functionality for search teacher This created before TeacherSearched.js not sure about useState() think its created here to be used as props in const
  const [focus, setFocus] = useState(); //event for when we focus the input
  const [categories, setCategories] = useState([]); //categories variable defined and a use state
  const [teachersCtg, setTeachersCtg] = useState([]); //store teachers when filtering by category
  const [active, setActive] = useState(); //activate state to show certain categories
  const [initialState, setInitialState] = useState([]); //inital state/set up when renders first time/ all categories

  //Use effect is the function to fetch the data/teachers from the file which is called data
  useEffect(() => {
    //setTeachers(data);
    //setTeachersFiltered(data);
    setFocus(false); //initial focus state is false so only used when search occurs
    setCategories(teacherCategories); //when renders use the categories from categoriy file above
    setActive(-1); //not sure why or what this is
    //setInitialState(data);

    //our call to DB, axios handles HTTP calls
    axios
    .get(`${baseURL}teachers`) //backticks required for string literal?. GET baseurl/teachers from server
    .then((res) => {
      console.log("I am following the URI to the DB!!")
      setTeachers(res.data); 
      setTeachersFiltered(res.data); 
      setTeachersCtg(res.data);  
      setInitialState(res.data); 
    })

    .catch((error) => {
      console.log('Api call error')
    })



    return () => {
      setTeachers([]); //Reset the teachers again to empty array
      setTeachersFiltered([]);
      setFocus();
      setCategories([]); //not sure about this think returns back to normal
      setTeachersCtg(data);
      setActive(); //same as above and below return to inital/empty states when finished
      setInitialState();
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

  //Category method to filter
  const changeCtg = (ctg) => {
    {
      ctg == "all"
        ? [setTeachersCtg(initialState), setActive(true)] //show al
        : //if not all categories
          [
            setTeachersCtg(
              teachers.filter((i) => i.category.$oid == ctg),
              setActive(true)
            ),
          ];
    }
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
            <Icon onPress={onBlur} name="ios-close" /> //Think function for clicking the little x to bring back to main list
          ) : null}
        </Item>
      </Header>

      {focus == true ? ( //If the focus above is true then we do this else, we return the flat list below of all proucts
        <SearchedTeacher
          navigation={props.navigation} //passes navigation props to searched product
          teachersFiltered={teachersFiltered}
        />
      ) : (
        //else part here is rendering the flat list
        //Needs to be a scroll view so users can scroll page. Flat list however can't be done within scroll view
        //Banner below is imported above and created in shared folder
        <ScrollView>
          <View>
            <View // <Banner /> should go inside here but removes the list from the application then and just shows the banner?
            >
              <Banner />
            </View>

            <View //should be <CategoryFilter but having import issues?
            > 
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                teachersCtg={teachersCtg}
                active={active}
                setActive={setActive}
              />
            </View>
            {teachersCtg.length > 0 ? ( //if teacherCtg list has more than 1 we will render list
              <View style={styles.listContainer}>
                {teachersCtg.map((item) => {
                  return (
                    <TeacherList //pass props to it/ same as flat list but rendering it using map isntead
                      navigation={props.navigation} //coming from navigation but not sure why or what
                      key={item.name}
                      item={item}
                    />
                  );
                })}
              </View>
            ) : (
              //if no product list simple view
              <View style={[styles.center, { height: "40%" }]}>
                <Text> No Teachers Found </Text>
              </View>
            )} 
          </View>
        </ScrollView>
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

Check this but think list doens't render unless this is saved AFTER filter method? 

*/
