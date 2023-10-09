import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native";

import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { SubInfo, EthPrice, NFTTitle, AppTitle } from "./SubInfo";
import { RectButton, CircleButton } from "./Button";

const AppIcon = ({ data, handlePress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
    style={{
      height: 100,
      backgroundColor: COLORS.white,
      borderRadius: SIZES.font,
      marginBottom: SIZES.extraLarge,
      margin: SIZES.base,
      ...SHADOWS.dark,
    }}
    onPress={handlePress}
    >
        <View
          style={{
            width: "100%",
            height: 70,
          }}
        >
          <Image
            source={data.image}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: SIZES.font,
              borderTopRightRadius: SIZES.font,
            }}
          />
        </View>


        <View style={{ width: "100%", padding: 10, marginTop: -40 }}>
          <AppTitle
            title={data.name}
            subTitle={data.description}
            titleSize={SIZES.extraLarge}
            subTitleSize={SIZES.medium}
          />

          <View
            style={{
              marginTop: SIZES.font,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
          </View>
        </View>
    </TouchableOpacity>
  );
};

export default AppIcon;
