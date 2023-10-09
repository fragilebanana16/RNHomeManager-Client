import React, { Fragment , useContext}  from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet, Dimensions, StatusBar} from "react-native";
import { ImageBackground, View, Text, Image, TextInput, SafeAreaView, FlatList, Keyboard, Animated, Easing } from "react-native";
import { Fontisto , FontAwesome5, Entypo, MaterialCommunityIcons   } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import MovieLibrary from './MovieLibrary';
import MovieExplore from './MovieExplore';
import MoviePage from './MoviePage';
import MoviePlayList from './MoviePlayList';
import {MaterialIcons} from '@expo/vector-icons'
const {width, height} = Dimensions.get('window');
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MovieAppHome = () =>{
    const navigation = useNavigation();

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
          backgroundColor: 'rgba(255, 255, 255, 1)',
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
            name='MoviePage'
            component={MoviePage}
            options={{
              tabBarActiveTintColor:'rgba(0, 0, 0, 1)',
              headerShown:false,
              title: 'Home',
              headerTintColor:'rgba(255, 255, 255, 0.5)',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name='home' size={size} color={color} />
              ),
            }}
          />

          <Tab.Screen
            name='Explore'
            component={MovieExplore}
            listeners={{
              tabPress: e =>{
              },
            }}
            options={{
              tabBarActiveTintColor:'rgba(0, 0, 0, 1)',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name='explore' size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name='History'
            component={MovieLibrary}
            options={{
              tabBarActiveTintColor:'rgba(0, 0, 0, 1)',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name='video-library' size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name='PlayList'
            component={MoviePlayList}
            options={{
              tabBarActiveTintColor:'rgba(0, 0, 0, 1)',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name='playlist-play' size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
        </View>
    );
  }
  
export default MovieAppHome;

const styles = StyleSheet.create({
  container: {
      flex: 1,
  }
})