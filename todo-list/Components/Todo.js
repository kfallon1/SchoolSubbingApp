import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native' //importing of functions

//This is the actual list items to be under the List
const Todo = (props) => {
    return(
        <View style={[ { margin: 8, padding: 8}, styles.item]}>
            <Text>{props.item}</Text>
            <Button 
                title={'Delete'}
                color={'red'}
                onPress={() => props.delete(props.item)}
            />
        </View>
    )
}

//Remember to put this into the return in the styles part for it to be called/used as styles.item
//This formats all off the different items on the list with characterstics below
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'whitesmoke'
    }
})

export default Todo;