import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MusicDrawerMenuItem from './MusicDrawerMenuItem';
const CustomDrawer = props => {
  return (
    <ImageBackground  
    source={require('../../assets/images/app2.jpeg')}
    style={{ height: '100%', width: '100%', top:0}}
    blurRadius={1}>
      <View style={{flex: 1, backgroundColor: 'rgba(23, 33, 33, 0.8)'}}>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'transparent'}}
        >
        <View
          style={{padding: 20, marginHorizontal:10, borderRadius: 40, backgroundColor:'rgba(23, 33, 33, 0.8)'}}>
          <Image
            source={require('../../assets/images/person01.png')}
            style={{height: 40, width: 40, borderRadius: 20, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontFamily:'RobotoRegular',
              fontSize: 18,
              marginBottom: 5,
            }}>
            Yolo
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily:'RobotoRegular',
                color: '#fff',
                marginRight: 5,
              }}>
              280 Points
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
        </View>

        {/* first */}
        <View style={{flex: 1, backgroundColor:'rgba(255,255,255, 0.15)', 
        paddingTop: 10,borderRadius:10, marginHorizontal:10, marginVertical:10
        }}>
          <MusicDrawerMenuItem title="Inbox" iconName="mail-outline"/>
          <MusicDrawerMenuItem title="Cards" iconName="card-outline"/>
        </View>

        {/* second */}
        <View style={{flex: 1, backgroundColor:'rgba(255,255,255, 0.15)', 
        paddingTop: 10,borderRadius:10, marginHorizontal:10, marginVertical:10
        }}>
          <MusicDrawerMenuItem title="Chords" iconName="musical-notes-outline"/>
          <MusicDrawerMenuItem title="ThreeJS" iconName="aperture-outline"/>
          <MusicDrawerMenuItem title="PlayGround" iconName="basketball"/>
          <MusicDrawerMenuItem title="Other" iconName="apps-outline"/>
          <MusicDrawerMenuItem title="Other" iconName="apps-outline"/>
          <MusicDrawerMenuItem title="Other" iconName="apps-outline"/>
        </View>
      </DrawerContentScrollView>

      {/* last */}
      <View style={{backgroundColor:'rgba(255,255,255, 0.15)', 
        paddingTop: 10,borderRadius:10, marginHorizontal:10, marginBottom:20
        }}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="md-settings-outline" size={22} color='#fff' style={{marginLeft:15}}/>
            <Text
              style={{
                fontSize: 16,
                fontFamily:'RobotoRegular',
                marginLeft: 15,
                color: '#fff',
              }}>
              Setting
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color='#fff'  style={{marginLeft:15}}/>
            <Text
              style={{
                fontSize: 16,
                fontFamily:'RobotoRegular',
                marginLeft: 15,
                color: '#fff',
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground> 
  );
};

export default CustomDrawer;