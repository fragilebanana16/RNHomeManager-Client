import React from "react";
import { View, Text, Image, TextInput } from "react-native";

import { COLORS, FONTS, SIZES, assets } from "../constants";

const HomeHeader = ({ onSearch }) => {
  return (
    <View
      style={{
        backgroundColor:  'rgba(34,36,40,1)',
        padding: SIZES.font,
        height: 250,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          top:SIZES.ANDROID_STATUSBAR_HEIGHT,
        }}
      >
        {/* <Image
          source={assets.logo}
          resizeMode="contain"
          style={{ width: 90, height: 25 }}
        /> */}

        <View style={{ width: 45, height: 45 }}>
          <Image
            source={assets.person01}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        <View style={{ marginVertical: SIZES.font }}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: COLORS.white,
          }}
        >
          Hello React Native 👋
        </Text>

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 2,
          }}
        >
          You Only Live Once, bro!
        </Text>
      </View>
      {/* search ctrl */}
      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput
            placeholder="Search Apps"
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
        </View>
      </View>
      </View>

      

      
    </View>
  );
};

export default HomeHeader;
