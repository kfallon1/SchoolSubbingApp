import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Booking from '../Screens/Bookings/Booking';
//import CheckoutNavigator from './CheckoutNavigator';



const Stack = createStackNavigator();

function MyStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Booking"
                component={Booking}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Checkout"
                component={BookingNavigator}
                options={{
                    title: 'Checkout'
                }}
            />
        </Stack.Navigator>
    )
}

export default function BookingNavigator() {
    return <MyStack />
}