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
import { Entypo, Feather  } from '@expo/vector-icons';

// const getThumbnailText = filename => filename[0];
// no need now
// const convertTime = minutes => {
//   if (minutes) {
//     const hrs = minutes / 60;
//     const minute = hrs.toString().split('.')[0];
//     const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
//     const sec = Math.ceil((60 * percent) / 100);

//     if (parseInt(minute) < 10 && sec < 10) {
//       return `0${minute}:0${sec}`;
//     }

//     if (parseInt(minute) < 10) {
//       return `0${minute}:${sec}`;
//     }

//     if (sec < 10) {
//       return `${minute}:0${sec}`;
//     }

//     return `${minute}:${sec}`;
//   }
// };

const renderPlayPauseIcon = (activeListItem, isPlaying) => {
  if (isPlaying && activeListItem)
  return (
    <Feather name="bar-chart-2" size={24} color='rgba(255, 255, 255, 0.8)' />
  );
  else if (!isPlaying &&activeListItem) {
  return (
    <Entypo name='controller-paus' size={24} color='rgba(255, 255, 255, 0.8)' />
  );
  }

  return;
};

const AudioListItem = ({
  title,
  artist,
  album,
  duration,
  onOptionPress,
  onAudioPress,
  isPlaying,
  activeListItem,
}) => {
  return (
    <>
        <View style={styles.container}>
          <TouchableOpacity onPress={onAudioPress}>
            <View style={styles.leftContainer}>
              <View
                style={[
                  styles.thumbnail,
                  
                  // {
                  //   backgroundColor: activeListItem
                  //     ? color.ACTIVE_BG
                  //     : color.FONT_LIGHT,
                  // },
                ]}>
              <Image style={{width:50, height:50, marginTop:30}}
                  source={album}/>
                <Text style={styles.thumbnailText}>
                  {
                    renderPlayPauseIcon(activeListItem, isPlaying)
                  }
                </Text>
              </View>
              <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.title}>
                  {title}
                </Text>
                <Text numberOfLines={1} style={styles.subTitle}>
                  {artist}
                </Text>
              </View>
              <Text style={styles.timeText}>{duration}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rightContainer}>
            <Entypo
              onPress={onOptionPress}
              name='dots-three-vertical'
              size={20}
              style={{ padding: 10, color: 'rgba(255, 255, 255, 0.8)' }}
            />
          </View>
        </View>
      <View style={styles.separator} />
    </>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: width - 20,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center',
  },
  rightContainer: {
    flexBasis: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  thumbnail: {
    height: 50,
    flexBasis: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  thumbnailText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  titleContainer: {
    flexDirection: 'column',
    width: width - 180,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  subTitle:{
    fontSize: 16,
    color: 'rgba(124, 124, 124, 1)',
  },
  separator: {
    width: width - 20,
    backgroundColor: '#333',
    opacity: 0.5,
    height: 0.5,
    alignSelf: 'center',
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default AudioListItem;