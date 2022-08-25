//import { withStdinLines } from "cli";
import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Button,
} from "react-native";
import { connect } from "react-redux"; //import the connect method
import * as actions from "../../Redux/Actions/cartActions"; //import all of the actions from Reduc (ADD, CLEAR, REMOVE from Cart)

var { width } = Dimensions.get("window");

const TeacherCard = (props) => {
  const { name, image, isAvailable } = props; //passing in the props as variables

  //return creates the user interface
  return (
    <View style={styles.container}>
      <Image
        style={styles.image} //Make sure link is ACCURATE didn't render as was a : at the end!!
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://www.civictheatre.ie/wp-content/uploads/2016/05/blank-profile-picture-973460_960_720.png",
        }}
      />

      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15
          ? name.substring(0, 15 - 3) + //Not sure at all what these 3 lines are doing
            "..."
          : name}

        {
          //This is creating the Book Button! Come bqck here and see can I do it based on availability similar to count in stock in lecture 90: 14.20
          <View style={{ marginBottom: 60 }}>
            <Button 
            title={"Book"} 
            color={"green"} 
            onPress = { () => { //On press is a function
                props.addItemToCart(props); //props are above name image is Available
            }}
            />
          </View>
        }
      </Text>
      <Text style={styles.isAvailable}> Is Available {isAvailable} </Text>
    </View>
  );
};

//This method will be used in the button to add the item to the cart....
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (teacher) => dispatch(actions.addToCart({ teacher })), //actions is from above and uses Redux actions we made
  };
};

//Styles to be used in the returns above....
const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 2 - -30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },

  card: {
    marginTop: 10,
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },

  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});
export default connect(null, mapDispatchToProps)(TeacherCard); //review again why null is where it is, don't think is that complicated
