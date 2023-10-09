import React, { useState } from "react";
import { View, SafeAreaView, FlatList, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppIcon, NFTCard, HomeHeader, FocusedStatusBar } from "../components";
import { COLORS, NFTData, AppHomeData, SIZES } from "../constants";

const Home = () =>{
  const navigation = useNavigation();

    const handleSearch = (value) => {
      // if (value.length === 0) {
      //   setNftData(NFTData);
      // }

      // const filteredData = NFTData.filter((item) =>
      //   item.name.toLowerCase().includes(value.toLowerCase())
      // );

      // if (filteredData.length === 0) {
      //   setNftData(NFTData);
      // } else {
      //   setNftData(filteredData);
      // }
    };

    return (
        <SafeAreaView style={{ flex: 1}}>
          <FocusedStatusBar hidden={false} translucent backgroundColor="transparent" />
          <View style={{ flex: 1}} >
            <View style={{ zIndex: 0 }}>
              <FlatList
                data={AppHomeData}
                renderItem={({ item }) => 
                <AppIcon data={item} 
                handlePress={() => {
                  switch (item.id ) {
                      case 'App-01':
                        navigation.navigate("Contacts");
                        break;
                      case 'App-02':
                        navigation.navigate("FileManage");
                        break;
                      case 'App-03':
                        navigation.navigate("MusicAppHomeDrawer");
                        break;
                      case 'App-04':
                        navigation.navigate("MovieAppHome");
                        break;
                      case 'App-05':
                        navigation.navigate("Movie");
                        break;
                      case 'App-06':
                        navigation.navigate("Toolbox");
                        break;
                      case 'App-07':
                        navigation.navigate("Toolbox");
                        break;
                      case 'App-08':
                        navigation.navigate("Movie");
                        break;
                      default:
                        break;
                    }
                  }
                }
                 />}
                stickyHeaderIndices={[0]}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
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
              
              <View style={{ flex: 1, backgroundColor: 'rgba(222,222,222, 0.50)' }} />
            </View>
          </View>
      </SafeAreaView>
      );
}

export default Home