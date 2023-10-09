import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, Animated ,StyleSheet, Image, TextInput, SafeAreaView, FlatList, Keyboard, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get('window');
// import 'vidstack/styles/defaults.css';
import VideoPlayer from 'expo-video-player'
import { Video, ResizeMode } from 'expo-av';
import MovieCard from "../../components/MovieView/MovieCard";
// import {useSelector} from 'react-redux'
// import VideoPlayer from "react-native-video-player";
const MoviePage = () => {
  const navigation = useNavigation();
  const video = React.useRef(null);
  const [cardData, setCardData] = useState();
  useEffect(() => {
    // console.log(video);
  }, [video]);

  useEffect(() => {
    fetch(`http://192.168.0.100:8000/api/videoStream/videosDataList`)
      .then((res) => res.json())
      .then((data) => setCardData(data));
  }, []);

  const scrollY = new Animated.Value(0)
  const diffClamp = Animated.diffClamp(scrollY,0,45)
  const translateY = diffClamp.interpolate({
    inputRange:[0,45],
    outputRange:[0,-45]
  })

  // const cardData = useSelector(state=>{
  //   return state.cardData
  // })
  // await data from server
  

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  if (cardData === undefined) {
    return <Text>Still loading...</Text>;
  }

  return (
    <View style={{
      flex: 1, backgroundColor: 'rgba(33, 33, 33, 1)',
    }}>

{/* <FlatList
        data={cardData}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      /> */}

      
      <FlatList
        data={cardData}
        renderItem={({ item }) => {
          return <MovieCard
            videoId={item.id}
            videoName={item.videoName}
            title={item.title} 
            channel={item.title}
          />
        }}

        keyExtractor={item => item.id}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y)
        }}
      />

      {/* <VideoPlayer
        style={styles.video}

        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
          source: {
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          },
        }}
      />
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        // source={require("../../assets/demo.mp4")}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://192.168.0.113:8000/video',
        }}
        // source={require("../../assets/demo.mp4")}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
      <View style={styles.buttons}>
        <Button
          title={'Pause'}
          onPress={async () => {
            try {
              const res = await video.current.playAsync()
              console.log(res);
            } catch (error) {
              console.log('error inside resume helper method', error.message);
            }
          }
          }
        />
      </View> */}

    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    alignSelf: 'center',
    width: 400,
    height: 200,
  },
});

export default MoviePage