import React from "react";
import { View, Text, Image, TextInput } from "react-native";

import { COLORS, FONTS, SIZES, assets } from "../constants";

const ContactsHeader = ({ onSearch }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        padding: SIZES.font,
      }}
    >
      <View style={{ 
        flexDirection: "row",
        marginVertical: 0, 
        alignItems:'center'
        }}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.large,
            color: COLORS.white,
            flex:1,
            flexDirection:'row',
            textAlign: 'center'
          }}
        >
          ChatPPT
        </Text>

        <Image
            source={assets.search}
            resizeMode="contain"
            style={{ 
              justifyContent:'space-evenly', marginVertical:0,              
              width: 20, height: 20, marginRight: SIZES.base 
              }}
          />
      </View>

      {/* 纵深整个屏幕的一条线 */}
      <View
        style={{
          position: "absolute",
          top: 80,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <View style={{
          width: '100%',
          height: 1, 
          backgroundColor: 'gray', 
          marginTop: -27,
          }} 
        />
      </View>
    </View>
  );
};

export default ContactsHeader;
