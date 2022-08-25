//Saves the state of our cart with items inside...
import { CardItem } from "native-base";
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./constants";

const cartItems = (state = [], action) => {
  //empty array as in beginning has no state, action is then passed.
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];

    case REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem !== action.payload); //filters out cart item from the payload state

    case CLEAR_CART:
      return []; //returns to initial empty state
  }

  return state;
};

export default cartItems;
