import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TextInput, SafeAreaView, FlatList, Keyboard, ImageBackground, TouchableOpacity,Dimensions } from "react-native";
import { ChatCard, NFTCard, ContactsHeader, FocusedStatusBar } from "../components";
import { COLORS, FONTS, SIZES, assets, NFTData, ContactsData } from "../constants";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MusicAppHome from "./MusicPlayer/MusicAppHome";
import CustomDrawer from "../components/Misc/CustomDrawer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');
function LogoTitle() {
  const navigation = useNavigation();
  // 音乐最上面drawer标题
  return (
    <View
      style={{ width: width, height: 50,  marginTop:40 }}
    >
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
            {/* 菜单 */}
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{paddingVertical: 0}}>
              <Ionicons name='menu' size={30} color='#fff' style={{marginLeft:10}}/>
            </TouchableOpacity>

            {/* 搜索 */}
            <View style={{ width: 250, height: 50,  marginTop:0 }}>
            </View>

            {/* 拍照？ */}
            <View style={{ width: 50, height: 50,  marginTop:0 }}>
            </View>

      </View>
    </View>

  );
}

// 嵌套导航需要另创建一个
const MyDrawer = () =>{
  const navigation = useNavigation();
  const [state, setState] = useState("");
  return (
    <ImageBackground  
    source={require('../assets/images/app2.jpeg')}
    style={{ height: '100%', width: '100%', top:0}}
    blurRadius={1}>
      <View style={{flex: 1, backgroundColor: 'rgba(23, 33, 33, 0.8)'}}>
        <Drawer.Navigator 
        drawerContent={props => <CustomDrawer {...props}></CustomDrawer>}
        screenOptions={{
          header: (props) => <LogoTitle {...props} />,
          headerShown: true,
          drawerActiveBackgroundColor: 'transparent',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
            }}>
          <Drawer.Screen name="Feed" component={MusicAppHome} />
          <Drawer.Screen name="Feed2" component={MusicAppHome} />
          <Drawer.Screen name="Feed3" component={MusicAppHome} />
          <Drawer.Screen name="Feed4" component={MusicAppHome} />

        </Drawer.Navigator>
      </View>
    </ImageBackground>

  );
}

export default MyDrawer