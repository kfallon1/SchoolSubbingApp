import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, Badge, Text } from "native-base";

const CategoryFilter = (props) => {
  return (
    <ScrollView //returns UserInterface & a scroll view
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: "#f2f2f2" }} //Grey Colour
    >
      <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }} //List Item in scroll view and touchable within it
      > 
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter("all"), props.setActive(-1); //-1 I think sets initial state (inavtive?)
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 }, //styles found below, different styles depending on if 'props active'
              props.active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: "white" }}>All</Text>
          </Badge>
        </TouchableOpacity>
        
        {props.categories.map((item) => (
          <TouchableOpacity
            key={item._id.$oid} 
            onPress={() => {
              props.categoryFilter(item._id),
                props.setActive(props.categories.indexOf(item));
            }}
          >
            <Badge
              style={[
                styles.center,
                { margin: 5 },
                props.active == props.categories.indexOf(item)
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <Text style={{ color: "white" }}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        ))}
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
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
});

export default CategoryFilter;
