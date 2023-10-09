import React, { Fragment , useContext}  from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PlayList from './PlayList';
import MusicPlayer from './MusicPlayer';
import AudioList from './AudioList';
import { TouchableOpacity, StyleSheet, Dimensions, StatusBar} from "react-native";
import { ImageBackground, View, Text, Image, TextInput, SafeAreaView, FlatList, Keyboard, Animated, Easing } from "react-native";
import { Fontisto , FontAwesome5, Entypo, MaterialCommunityIcons   } from '@expo/vector-icons';
import { FocusedStatusBar } from "../../components";
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { AudioContext } from "../../context/AudioProvider";

const {width, height} = Dimensions.get('window');
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity 
    style={{
      top: -5,
      justifyContent:'center',
      alignItems: 'center'
    }}
    onPress={onPress}
  >
    <View style={{
      width:170,
      height:36,
      borderRadius:0,
      backgroundColor:'rgba(23, 33, 255, 0.8)'
    }}>
      {children}
    </View>
  </TouchableOpacity>
);

const MusicAppHome = () =>{
    const navigation = useNavigation();
    const context = useContext(AudioContext);

    return ( 
      <View style={{flex: 1}}>
        <Tab.Navigator 
        screenOptions={{ headerShown: true, 
          headerStyle: {
            height: 80, 
            backgroundColor: 'rgba(255, 255, 255, 0)',
            elevation: 0, // 透明解决里面有个矩形的问题
          },
        tabBarShowLabel: true,
        tabBarStyle: { 
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderTopWidth: 0.2,
          borderBottomWidth: 0, // 下边还有个边框
          borderTopColor:'rgba(255, 255, 255, 0.6)',
          elevation: 0, // 透明解决里面有个矩形的问题
          height:60,
          paddingBottom:9,
          paddingTop:12,
          },
        }}>   
          <Tab.Screen 
            name='FileList'
            component={AudioList}
            options={{
              tabBarActiveTintColor:'rgba(255, 255, 255, 1)',
              headerShown:false,
              title: 'FileList',
              headerTintColor:'rgba(255, 255, 255, 0.5)',
              tabBarIcon: ({ color, size }) => (
                <Entypo name="folder-music" size={size} color={color} />
              ),
            }}
          />

          <Tab.Screen
            name='Player'
            component={MusicPlayer}
            listeners={{
              tabPress: e =>{
                e.preventDefault();
                navigation.navigate("MusicPlayer");
              },
            }}
            options={{
              tabBarActiveTintColor:'rgba(255, 255, 255, 1)',
              tabBarIcon: ({ color, size }) => (
                <Fontisto name="music-note" size={size} color={color} />
              ),

              // tabBarButton: (props) => (
              //   <CustomTabBarButton {...props}>

              //   </CustomTabBarButton>
              // )
            }}
          />
          <Tab.Screen
            name='PlayList'
            component={PlayList}
            options={{
              tabBarActiveTintColor:'rgba(255, 255, 255, 1)',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="playlist-music"size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
        {/* minplayer */}
          <TouchableOpacity
            style={{
              position: "absolute",
              backgroundColor: 'rgba(23, 33, 33, 0.5)',
              bottom: 48, // 和RecyclerListView的bottom一致
              flexDirection: "row",
              width: "100%",
              height: 50,
              paddingVertical: "3%",
              alignSelf: "center",
              borderTopLeftRadius:6,
              borderTopRightRadius:6,
              margin: "3%",
            }}
            onPress={() => {
              navigation.navigate("MusicPlayer");
              }}
            >  
             <View style={[{flex:1,flexDirection:'row'}]}>
                <Image style={{width:34, height:34, left:10, top:-5}} source={context.currentAudio.SongAlbumImg}></Image>
                <Text style={{left:34, color:'white'}}>{context.currentAudio.SongName}</Text>
                <Text style={{left:38, color:'white'}}>-</Text>
                <Text style={{left:44, color:'white'}}>{context.currentAudio.Artist}</Text>
              </View>
          </TouchableOpacity>
        </View>
    );
  }
  
export default MusicAppHome;

const styles = StyleSheet.create({
  container: {
      flex: 1,
  }
})