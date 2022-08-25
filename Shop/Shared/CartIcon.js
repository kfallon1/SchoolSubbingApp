import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

//redux tells us state of cart/how many items in there etc.
import { connect } from "react-redux";

const CartIcon = (props) => {
  return (
    <>
      {
        props.cartItems.length ? ( //same as other methods if has length render UI if not down below. Displays number of items/bookings
          <Badge style={styles.badge}>
            <Text style={styles.text}>{props.cartItems.length}</Text>
          </Badge>
        ) : null //if not got length/number in there display null/nothing
      }
    </>
  );
};

//map state to props so cartItems brought to props called above
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -4,
    right: -15,
  },

  text: {
    fontSize: 12,
    width: 100,
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps)(CartIcon); //used in Navigation FOlder in Main JS
