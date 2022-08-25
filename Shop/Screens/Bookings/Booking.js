//All the imports required to create UserInterface
import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
} from "native-base";
import { connect } from "react-redux";
import { Icon } from "react-native-vector-icons/FontAwesome"; //additional plugin I installed
import * as actions from "../../Redux/Actions/cartActions"; //add, remove or clear cart actions created within Redux
import { SwipeListView } from "react-native-swipe-list-view";
import BookingItem from "./BookingItem";

var height,
  width = Dimensions.get("window"); //used in styles, gets the height and width of window and set below

const Booking = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>
            {" "}
            Welcome to the Bookings Page{" "}
          </H1>
          {props.cartItems.map((data) => {
            return (
              //returning user interface if has length and mapping through the data
              <ListItem style={StyleSheet.listItem} key={Math.random} avatar>
                <Left>
                  <Thumbnail
                    source={{
                      uri: data.teacher.image
                        ? data.teacher.image
                        : "https://www.civictheatre.ie/wp-content/uploads/2016/05/blank-profile-picture-973460_960_720.png",
                    }}
                  ></Thumbnail>
                </Left>
                <Body style={styles.body}>
                  <Left>
                    <Text> {data.teacher.name} </Text>
                  </Left>

                  <Right>
                    <Text> $ {data.teacher.isAvailable}</Text>
                  </Right>
                </Body>
              </ListItem>
            );
          })}

          <View //THis is the toolbar view at the bottom
          style = {styles.bottomContainer}
          >
            <Left //can put in the variable here for total price
            >
            </Left>
             
             <Right>
              <Button title = 'Clear Booking'
              onPress={ () => props.clearCart()}
              />
             </Right>
             <Right>
              <Button title = 'Confirm Booking' 
              onPress={() => props.navigation.navigate("Checkout")}
              />
             </Right>
          </View>


        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text> No Bookings Made</Text>
          <Text>Make a booking to get Started</Text>
        </Container>
      )}
    </>
  );
};
//cartItem is a reducer....Caused HUGE confusion vs Booking Item!!
const mapStateToProps = (state) => {
  const { cartItems } = state; //cartItems hee is from the Redux Reducers which is a state of add, delete, clear

  return {
    cartItems: cartItems,
  };
};

//This is to clear Cart used in onPress event for button above
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()), //using imported actions/redux imported above
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height, //entire height of screen
    alignItems: "center",
    justifyContent: "center",
  },

  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },

  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },

  bottomContainer: {
    flexDirection: "row", //items in/as a row
    position: "absolute", //sticks to the bottom
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
  },
  //price style is here also

  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

//this connect method above, maps the const to Booking, null means items go to the props
//exporting functions to add to props and remove from props above
export default connect(mapStateToProps, mapDispatchToProps)(Booking);
