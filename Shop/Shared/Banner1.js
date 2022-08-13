//Check this vs Banner when have time again
import React from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import Swiper from "react-native-swiper/src";

var { width } = Dimensions.get("window"); //Pretty sure this sets width to screen/window size

const Banner = () => {
  const [BannerData, setBannerData] = useState([]);

  useEffect(
    () => {
      //adds images to the state, these are hardcoded images we want for our banner
      setBannerData([
        "https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg",
        "https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg",
        "https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg",
      ]);

      return () => {
        setBannerData([]);
      };
    },
    [] //call empty array once
  );

  //UI return
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            styles={{ height: width / 2 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {BannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode="contain"
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>

          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

//All used above similar to header and other JS files completed
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
  },
  swiper: {
    width: width,
    marginTop: 10,
  },

  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default Banner;
