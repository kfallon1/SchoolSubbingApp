import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";

const BookingItem = (props) => {
  //store the props in consts
  const data = props.item.teacher;
  //const [quantity, setQuantity] = useState(props.item.item.quantity); //don't need this as not used in a teacher

  //most of this UI was generated originally in Booking.JS
  //Returns a list of bookings from main page with image on left and name on right follow comments below
  return (
    <ListItem
      style={styles.listItem}
      key={Math.random()} //review keys and avators again....
      avatar //this says our list item has a thumbnail or avatar
    >
      <Left //on left hand side of list item we want a thumbnail
      >
        <Thumbnail //self closing setting the image as the thumbail. Same code as in TeacherCard...line 26
          source={{
            uri: data.image
              ? data.image
              : "https://www.civictheatre.ie/wp-content/uploads/2016/05/blank-profile-picture-973460_960_720.png",
          }}
        />
      </Left>
      <Body
        styles={styles.body} //Will use the body part to render the name as text component on left and Price/is Available on right
      >
        <Left>
          <Text>{data.name}</Text>
        </Left>
        <Right>
          <Text> $ {data.isAvailable}</Text>
        </Right>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
 

  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },

  body: {
    margin: "10px",
    alignItems: "center",
    flexDirection: "row",
  }

});

export default BookingItem;
