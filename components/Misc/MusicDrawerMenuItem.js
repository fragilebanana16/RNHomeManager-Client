import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MusicDrawerMenuItem = ({
  onItemPress, title, iconName
}) => {
  return (
    <>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
        {/* 同一行分别放前后的方法是前两个一组为View再和后面的进行space-between */}
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name={iconName} size={22} color='#fff'  style={{marginLeft:15}}/>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 15,
                    fontFamily:'RobotoRegular',
                    color: '#fff',
                  }}>
                  {title}
                </Text>
              </View>

            <Text style={{
                fontSize: 16,
                marginRight:10,
                fontFamily:'RobotoRegular',
                color: '#eee',
                marginRight:20
              }}>
            &gt;
            </Text>
          </View>
        </TouchableOpacity>
    </>
  );
};


export default MusicDrawerMenuItem;