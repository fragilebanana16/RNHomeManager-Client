import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native";

import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { SubInfo, EthPrice, NFTTitle, ConatactTitle } from "./SubInfo";
import { RectButton, CircleButton } from "./Button";

const ChatCard = ({ data, handlePress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
    style={{
      height: 80,
      backgroundColor: COLORS.white,
      margin: 1,
      ...SHADOWS.dark,
    }}
    onPress={handlePress}
    >
        <View style={{ width: 50, height: 50 }}>
          <Image
            source={data.image}
            resizeMode="contain"
            style={{ width: "100%", height: "100%", marginTop: 14, marginLeft: 10 }}
          />
        </View>
        <View style={{ width: "100%", padding: 10, marginTop: -40 }}>
          <ConatactTitle
            title={data.name}
            subTitle={data.description}
            date={data.date}
            titleSize={SIZES.extraLarge}
            subTitleSize={SIZES.medium}
            dateTitleSize={SIZES.small}
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

export default ChatCard;
