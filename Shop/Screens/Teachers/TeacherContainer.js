import React, {useState, useEffect} from 'react' //{these are hooks we can use, hook = method}
import {View, Text, Stylesheet, ActivityIndicator, FlatList} from 'react-native' //FlatList used to render list

//This imports the teachers/data from the JSON file in assets
const data = require("../../assets/data/teachers.json");

//This const is rendered in the main app.js file as a retun function. Guess builds the whole screen and it's function?!
const TeacherContainer = () => {
  
  const item = {} //This solves can't find variable item
  const [teachers, setTeachers] = useState([]); //Setting the state of the teachers and putting them in an array

   //Use effect is the function to fetch the data/teachers from the file which is called data
   useEffect(() => {
    setTeachers(data);

    return () => { 
      setTeachers([]); //Reset the teachers again to empty array
    };
  }, []); //Not sure why empty array needs to be here something to do with no call back from =>

  return (
    <View>
    
<Text> Teacher Container List loading </Text> 

<FlatList 
data = {teachers}
renderItem={({item}) => <Text> {item.name} </Text> }
keyExtractor = {item.name}

/>

    </View>
  )
}

export default TeacherContainer;