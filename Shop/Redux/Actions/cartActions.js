//actions despatch the reducers to the payload
//payload identifies the item
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../Reducers/constants";

export const addToCart = (payload) => {
  //takes payload as argument which is the data. Payload itentifies item

  return {
    type: ADD_TO_CART, //Not sure what type is
    payload 
  }
} 

export const removeFromCart = (payload) => {  
    return {
      type: REMOVE_FROM_CART, //Think this sends to swtich method in the cartItem.js
      payload //payload identifies the item
    }
  }

  export const clearCart = () => {  
    return {
      type: CLEAR_CART //no need for payload as returning item cart to empty 
      
    }
  }
