import React, { useState } from "react";
import { State, useEffect } from "react";
import {
  Image,
  View,
  ScrollView,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import { Left, Right, Container, H1, Content } from "native-base";

import { connect } from "react-redux"; //connection part
import * as actions from "../../Redux/Actions/cartActions"; //immport the redux actions (add/remove/clear cart)

//props come from TeacherList
const SingleTeacher = (props) => {
  //Maybe ask Sam to go over what exactly happening here vs Java
  const [item, setItem] = useState(props.route.params.item); //mapping where to get props
  const [availablity, setAvailability] = useState(""); //starts with null

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View
        //THe image returned must be inside a View!!!
        >
          <Image
            source={{
              uri: item.image
                ? item.image //find the uri image or else use below
                : "https://www.civictheatre.ie/wp-content/uploads/2016/05/blank-profile-picture-973460_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <View //h1, Text, etc. all within the view tag. Styles done below
          style={styles.contentContainer}
        >
          <H1 style={styles.contentHeader}>{item.name}</H1>
          <Text>{item.teacherCategory}</Text>
          <Boolean //not working currently, how to implement this? tried importing but crashes?
          >
            {item.isAvailable}{" "}
          </Boolean>
        </View>
      </ScrollView>

      <View //This view contains the scroll/action bar for below the teachers with the book button? The Left Tag is called from native base
        style={styles.bottomContainer}
      >
        <Left>
          <Text style={styles.Price}>
            {
              item._id //item._id is in here as a placeholder to show function. Per Tutorial this is Price....Can't get is available running as a boolean.
            }
          </Text>
        </Left>

        <Right>
          <Button
            title="Book"
            //onPressEvent calling the function below to add item to cart/booking
            onPress={() => props.addItemToCart(item)} //rem item vs product. Item function within JS product declared/made by me
          />
        </Right>
      </View>
    </Container>
  );
};


const mapToDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (teacher) => 
          dispatch(actions.addToCart({quantity: 1, teacher}))
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },

  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },

  image: {
    width: "100%", //takes entire width of screen
    height: 250,
  },

  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },

  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },

  Price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
});
//export this and will be used in Teacher List within touchable opacity event when teacher is presssed
export default connect(null, mapToDispatchToProps)(SingleTeacher); //review the connect part vs old export default
