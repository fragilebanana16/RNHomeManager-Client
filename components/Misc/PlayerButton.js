import React from 'react';
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const PushButton = props => {
  var controlButtons = ['PLAY', 'PAUSE', 'NEXT', 'PREV']
  const { iconType, size = 50, 
    iconColor = 'rgba(225, 225, 225, 1)', onPress } = props;
  const getIconName = type => {
    switch (type) {
      case 'PLAY':
        return 'play-circle-filled';
      case 'PAUSE':
        return 'pause-circle-filled';
      case 'NEXT':
        return 'skip-next';
      case 'PREV':
        return 'skip-previous';
    }
  };

  const project = (type) => {
    switch(type) {
      case "PLAY": 
      case "PAUSE":
      case "NEXT":
      case "PREV":   
        return <MaterialIcons
      {...props}
      onPress={onPress}
      name={getIconName(type)}
      size={size}
      color={iconColor}/>;

      case "LIKE":
        return <MaterialCommunityIcons 
      onPress={onPress}
      name="heart" 
      color={iconColor}
      size={size}/> ;

      case "RANDOM":
        return <FontAwesome 
      onPress={onPress}
      name="random" 
      color={iconColor}
      size={size}/> ;

      case "LISTLOOP":
        return <FontAwesome 
      onPress={onPress}
      name="list-ol" 
      color={iconColor}
      size={size}/> ;

      case "LOOP":
        return <Entypo 
      onPress={onPress}
      name="loop" 
      color={iconColor}
      size={size}/> ;

      case "LIST":
        return <Fontisto 
        onPress={onPress}
        name="play-list" 
        color={iconColor} 
        size={size} />
        
      default:null;
    }
  }

  return (
    <TouchableOpacity
    hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}>
      <View>{ project(iconType) }</View>
    </TouchableOpacity>
  );
};

export default PushButton;