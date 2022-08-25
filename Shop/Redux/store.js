import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import cartItems from './Reducers/cartItem'
 
const reducers = combineReducers({
    cartItems: cartItems //unsure of this logic. Cart Items imported which created the 3 states. 
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware)) 
)
//actions despatch the reducers to the payload
export default store;