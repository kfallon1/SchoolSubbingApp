//When I get time again go back overt this vs category filter file

import React from "react";
import { StyleSheet, TouchableOpactiy, ScrollView } from "react-native";
import { Badge, ListItem, Text } from "native-base";

const CategoryFilter = (props) => {
  return (
    //return UserInterface
    <ScrollView //ScrollView in the UI/Return
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: "#f2f2f2" }} //grey colour
    >
      <ListItem
        style={{ margin: 0, padding: 0, radius: 0 }} //ListItem is in scroll view and Opacity within the List Item
      >
        <TouchableOpactiy
          key={1}
          onPress={() => {
            props.CategoryFilter("all"), props.setActive(-1);
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 }, //styles found below, different styles depending on if 'props active'
              props.active == -1 ? styles.active : styles.inactive, //-1 I think sets initial state (inavtive?)
            ]}
          >
            <Text styles={{ color: "white" }}>All</Text>
          </Badge>
        </TouchableOpactiy>

        {props.categories.map(
          (
            item //mapping through to find the category names and turning them into scrollable, touchable badges
          ) => (
            <TouchableOpactiy
              key={item._id} //unique key will be the _id value
              onPress={() => {
                props.CategoryFilter(item._id),
                  props.setActive(props.categories.indexOf(item)); //item comes from the map method
              }}
            >
              <Badge
                style={[
                  styles.center,
                  { margin: 5 }, //styles found below, different styles depending on if 'props active'
                  props.active == props.categories.indexOf(item)
                    ? styles.active
                    : styles.inactive, //-1 I think sets initial state to inactive
                ]}
              >
                <Text styles={{ color: "white" }}>{item.name} </Text>
              </Badge>
            </TouchableOpactiy>
          )
        )}
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "03bafc",
  },

  inactive: {
    backgroundColor: "a0e1eb",
  },
});

export default CategoryFilter;
