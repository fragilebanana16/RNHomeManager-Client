import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TextInput, SafeAreaView, FlatList, Keyboard } from "react-native";
import { ChatCard, NFTCard, ContactsHeader, FocusedStatusBar } from "../components";
import { COLORS, FONTS, SIZES, assets, NFTData, ContactsData } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Contacts = () =>{
  const navigation = useNavigation();
  const [state, setState] = useState("");
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FocusedStatusBar backgroundColor='rgba(255,0,0, 0.50)' />
            <View style={{ flex: 1 }}>
                <View style={{ zIndex: 0 }}>
                    <FlatList
                        data={ContactsData}
                        renderItem={({ item }) => 
                        <ChatCard data={item} 
                        handlePress={() => navigation.navigate("Chat", {item})} />}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={<ContactsHeader onSearch={() => {}}
                        />}
                        // https://stackoverflow.com/questions/44638286/how-do-you-make-the-listheadercomponent-of-a-react-native-flatlist-sticky
                        stickyHeaderIndices={[0]} 
                    />
                </View>
        
                <View
                    style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    zIndex: -1,
                    }}
                >
                <View style={{ flex: 1, backgroundColor: COLORS.white }} /></View>
            </View>
      </SafeAreaView>
);
}

export default Contacts