import React, { useState, useEffect, useRef, useContext } from "react";
import { ImageBackground, View, Text, Image, TextInput, SafeAreaView, FlatList, Keyboard, Animated, Easing } from "react-native";
import { ChatCard, NFTCard, ContactsHeader, FocusedStatusBar } from "../../components";
import { COLORS, FONTS, SIZES, assets, NFTData, ContactsData } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Dimensions, StatusBar, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import PushButton from "../../components/Misc/PlayerButton";
import { FontAwesome } from '@expo/vector-icons';
import { AudioContext } from "../../context/AudioProvider";
import { play, pause, resume, playNext, moveAudio } from "../../components/Misc/AudioController"
import { millisToMinutesAndSeconds } from "../../components/Misc/helper";
import Lyric from 'lyric-parser'
import { Audio } from 'expo-av';
import { storeAudioForNextOpening } from '../../components/Misc/helper';
const { width, height } = Dimensions.get('window');

// 需要放外边，否则每次执行刷新值
var rotateAnimation = new Animated.Value(0);
var rotationOffset = 0;
const lyricOnelineHeight = 54;
const lyricOnelineMarginTop = 5;
const MusicPlayer = () => {
  const context = useContext(AudioContext);
  const { soundObjStatus, playingObj, audioFiles,
    currentAudio, updateState, currentAudioIndex,
    playbackPos, playbackDuration, isPlaying, totalTracksCount, playOrder } = context;
  const [currentPosition, setCurrentPosition] = useState(0);
  const [state, setState] = useState(false);
  const [isLoadingLyrics, setLoadingLyrics] = useState(true);
  const [currentlyricLineNum, setCurrentlyricLineNum] = useState();
  const [currentlyric, setCurrentlyric] = useState([]);
  const navigation = useNavigation();
  const scrollView = useRef();
  let lyric = null;
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  // console.log("Execute each time render");
  useEffect(() => {
    context.isPlaying ? startLoopAnimation() : stopLoopAnimation()
  }, [context.isPlaying]);

  useEffect(() => {
    loadLyricOnlyOnce();
    return () => {
      // console.log("clean lyric");
      if (lyric !== null) {
        lyric.stop()
        // console.log("stop lyric");
        if (scrollView !== null && scrollView.current !== null) {
          // console.log("scrollView 0");
          scrollView.current.scrollTo({
            y: 0,
            animated: true
          })
        }

      }
    };
  }, [currentAudio.SongLyric]);


  const onAlbumPress = () => {
    setState(!state);
  };

  // 动画做下
  // https://medium.com/@shaneboyar/react-native-animated-tutorial-8543c9df4530
  const handleAnimation = () => {

    // updateState(context, {isPlaying: !context.isPlaying,});

    // setIsPlaying(!isPlaying);
    // startLoopAnimation();
    // console.log("animation");
  };

  const startLoopAnimation = () => {
    console.log("startLoopAnimation");
    rotateAnimation.setOffset(rotationOffset);
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 10,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true, // https://stackoverflow.com/questions/56980044/how-to-prevent-setinterval-in-react-native-from-blocking-running-animation
      })
    ).start();
  };

  const stopLoopAnimation = () => {
    rotateAnimation.stopAnimation(currentValue => {
      rotationOffset = currentValue;
    });
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 10],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };

  const handleSearch = (value) => {

  };

  const calculateSeekBar = () => {
    if (playbackPos !== null && playbackDuration !== null) {
      return playbackPos / playbackDuration;
    }

    if (currentAudio.lastPosition) {
      return currentAudio.lastPosition / (currentAudio.duration * 1000);
    }

    return 0;
  };

  const calculateBarStart = () => {
    if (playbackPos !== null) {
      return millisToMinutesAndSeconds(playbackPos);
    }

    return "0:00";
  };

  const calculateBarEnd = () => {
    if (playbackDuration !== null) {
      return millisToMinutesAndSeconds(playbackDuration);
    }

    return "0:00";
  };

  const handlePlayPause = async () => {
    handleAnimation();
    // await selectAudio(context.currentAudio, context);
    // play
    const playBackObj = new Audio.Sound();
    if (soundObjStatus === null) {
      const index = audioFiles.indexOf(currentAudio);
      const status = await play(playBackObj, currentAudio.SongUri, 3);
      // console.log("context.playingObj " + context.playingObj);
      // console.log("context.onPlaybackStatusUpdate " + context.onPlaybackStatusUpdate);
      // BUG:context.playingObj is null
      context.playingObj.setOnPlaybackStatusUpdate(
        context.onPlaybackStatusUpdate
      );

      return updateState(this.context,
        {
          playingObj: playBackObj,
          soundObjStatus: status,
          isPlaying: true,
          currentAudioIndex: index,
        });
    }
    // pause
    if (soundObjStatus && soundObjStatus.isPlaying) {
      const status = await pause(playingObj);
      return updateState(context, {
        soundObjStatus: status,
        isPlaying: false,
        playbackPosition: status.positionMillis,
      });
    }
    // resume
    if (soundObjStatus && !soundObjStatus.isPlaying) {
      const status = await resume(playingObj);
      return updateState(context, {
        soundObjStatus: status,
        isPlaying: true,
      });
    }
  };

  const handleNext = async () => {
    let isLoaded = false;
    // await changeAudio(context, 'next');
    if (playingObj === null) {
      isLoaded = false;
    }
    else {
      isLoaded = await playingObj.getStatusAsync();
    }

    const isLastAudio =
      currentAudioIndex + 1 === totalTracksCount;
    switch (playOrder) {
      case "RANDOM":
        index = Math.floor(Math.random() * totalTracksCount);
        // console.log("RANDOM MODE: index "+ index);
        break;
      case "LOOP":
        index = context.currentAudioIndex;
        // console.log("LOOP MODE: index " + index);
        break;
      default:
        index = context.currentAudioIndex + 1;
        // console.log("LIST MODE: index " + index);
        break;
    }

    let audio = audioFiles[index];
    let index;
    let status;

    // bug:playingObj为空无法播放
    if (!isLoaded && !isLastAudio) {
      index = currentAudioIndex + 1;
      status = await play(playingObj, audio.SongUri);
    }

    if (isLoaded && !isLastAudio) {
      status = await playNext(playingObj, audio.SongUri);
    }

    if (isLastAudio) {
      index = 0;
      audio = audioFiles[index];
      if (isLoaded) {
        status = await playNext(playingObj, audio.SongUri);
      } else {
        status = await play(playingObj, audio.SongUri);
      }
    }

    updateState(context, {
      currentAudio: audio,
      playingObj: playingObj,
      soundObjStatus: status,
      isPlaying: true,
      currentAudioIndex: index,
      playbackPosition: null,
      playbackDuration: null,
    });

    storeAudioForNextOpening(audio, index);
  };

  const handlePrevious = async () => {
    let isLoaded = false;
    // await changeAudio(context, 'next');
    if (playingObj === null) {
      isLoaded = false;
    }
    else {
      isLoaded = await playingObj.getStatusAsync();
    }

    const isFirstAudio =
      currentAudioIndex <= 0;
    let audio = audioFiles[currentAudioIndex - 1];
    let index;
    let status;

    // bug:playingObj为空无法播放
    if (!isLoaded && !isFirstAudio) {
      index = currentAudioIndex + 1;
      status = await play(playingObj, audio.SongUri);
    }

    if (isLoaded && !isFirstAudio) {
      index = context.currentAudioIndex - 1;
      status = await playNext(playingObj, audio.SongUri);
    }

    if (isFirstAudio) {
      index = totalTracksCount - 1;
      audio = audioFiles[index];
      if (isLoaded) {
        status = await playNext(playingObj, audio.SongUri);
      } else {
        status = await play(playingObj, audio.SongUri);
      }
    }

    updateState(context, {
      currentAudio: audio,
      playingObj: playingObj,
      soundObjStatus: status,
      isPlaying: true,
      currentAudioIndex: index,
      playbackPosition: null,
      playbackDuration: null,
    });

    storeAudioForNextOpening(audio, index);
  };

  const handleOrder = async () => {
    const order = ['RANDOM', 'LISTLOOP', 'LOOP'];
    let index = order.indexOf(context.playOrder);
    if (index == -1) {
      return;
    }

    if (index < order.length - 1) {
      index += 1;
    }
    else {
      index = 0;
    }

    updateState(context, {
      playOrder: order[index],
    });
  }

  const loadLyricOnlyOnce = async () => {
    // 这里currentAudio一进来是undefined，所以要执行两次
    // console.log(currentAudio.SongLyric);
    if (currentAudio.SongLyric === null) {
      return;
    }
    console.log("lyric object " + lyric);


    // console.log(JSON.stringify(res));
    const res = await fetch('http://192.168.0.100:19000/' + currentAudio.SongLyric)
      .then((r) => r.text())
      .then(text => {
        lyric = new Lyric(text, handler);
        console.log("lyric " + lyric);
        setCurrentlyric(lyric.lines);
        setLoadingLyrics(false);
        console.log("playbackPos " + playbackPos);
        if (playbackPos !== null) {
          console.log(playbackPos);
          lyric.seek(playbackPos); // millseconds, no need /1000, 100 load lyric time
        }
        else {
          lyric.seek(1500); // 歌曲暂停就不要播放歌词了
        }
      })
  }

  // bug:切换歌曲行数事件响应多次
  const handler = ({ lineNum, txt }) => {
    // this hanlder called when lineNum change
    // console.log("lineNum "+ lineNum);
    setCurrentlyricLineNum(lineNum);
    if (scrollView !== null && scrollView.current !== null) {
      scrollView.current.scrollTo({
        y: (lyricOnelineHeight + lyricOnelineMarginTop) * lineNum, // 15 text height, 20:margin
        animated: true
      })
    }
  }


  return (
    <ImageBackground
      source={context.currentAudio.SongAlbumImg !== null ?
        context.currentAudio.SongAlbumImg :
        require('../../assets/images/defaultAlbum.jpg')}
      style={{ height: '100%', width: '100%', top: 0 }}
      blurRadius={12}>
      {/* darken: https://stackoverflow.com/questions/54316874/how-to-make-an-image-of-a-imagebackground-tag-darker-react-native */}
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0, 0.50)' }}>
        <View style={style.mainContainer}>
          <View style={style.topSection}>
            <Text style={{ marginTop: 20, fontSize: 18, color: 'white' }} numberOfLines={1}>
              {context.currentAudio.SongName}
            </Text>
            <Text style={{ marginTop: 5, fontSize: 14, color: 'rgba(255, 255, 255, 0.5)' }}>
              {context.currentAudio.Artist}
            </Text>
          </View>

          <View style={style.middleSection}>
            <TouchableOpacity onPress={onAlbumPress}
              hitSlop={{ top: 300, bottom: 300, left: 200, right: 200 }}>
              {
                state ? <Animated.Image
                  source={context.currentAudio.SongAlbumImg !== null ?
                    context.currentAudio.SongAlbumImg :
                    require("../../assets/images/defaultAlbum.jpg")}
                  style={[style.musicImage, animatedStyle]}>
                </Animated.Image> :
                  <ScrollView ref={scrollView}>
                    {/* block for center vertical the lyric */}
                    <View style={style.blockView} />
                    {
                      isLoadingLyrics ? null :
                        currentlyric.map((item, index) => {
                          return (
                            <Text key={index} numberOfLines={2} style={[style.lyricText, currentlyricLineNum === index ? style.lyricTextActive : style.lyricTextNormal]}>
                              {item.txt}
                            </Text>
                          )
                        })
                    }
                    <View style={style.blockView} />
                  </ScrollView>

              }

            </TouchableOpacity>
          </View>

          {/* bottom section */}
          <View style={style.bottomSection}>
            {/* songslider */}

            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <View>
                <Text style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  width: 30,
                  fontSize: 12
                }}>
                  {currentPosition ? currentPosition : calculateBarStart()}
                </Text>
              </View>
              <Slider
                style={style.progressBar}
                minimumValue={0}
                maximumValue={1}
                value={calculateSeekBar()}
                thumbTintColor="#FFFFFF"
                minimumTrackTintColor="#DDDDDD"
                maximumTrackTintColor="#FFFFFF"
                // 异步原因得先暂停，云音乐不暂停，结束时更新
                onSlidingStart={async () => {
                  if (!context.isPlaying) return;
                  try {
                    await pause(context.playingObj);
                  } catch (error) {
                    console.log('error inside onSlidingStart callback', error);
                  }
                }}
                onSlidingComplete={async value => {
                  await moveAudio(context, value);
                  setCurrentPosition(0);
                }}
                onValueChange={(value) => {
                  setCurrentPosition(millisToMinutesAndSeconds(value * playbackDuration));
                }}
              ></Slider>
              <View>
                <Text style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: 12
                }}>{calculateBarEnd()}</Text>
              </View>
            </View>

            <View style={style.bottomIconContainer}>
              <PushButton iconType={context.playOrder}
                size={26} color="white" onPress={handleOrder} />
              <PushButton iconType='PREV' size={50} onPress={handlePrevious} />
              <PushButton
                size={60}
                onPress={handlePlayPause}
                style={{ marginHorizontal: 0 }}
                iconType={context.isPlaying ? 'PAUSE' : 'PLAY'}
              />
              <PushButton iconType='NEXT' size={50} onPress={handleNext} />
              <PushButton iconType='LIST' size={21} />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default MusicPlayer;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  middleSection: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomSection: {
    borderTopColor: '#393E46',
    width: width,
    alignItems: 'center',
    flex: 1.3,
  },

  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },

  mainWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },

  musicImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#585858",
  },

  elevation: {
    elevation: 5,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },

  progressBar: {
    width: 300,
    height: 30,
    marginTop: 25,
    marginBottom: 25,
    flexDirection: 'row',
  },
  progressLevelDuraiton: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
  },

  lyricTextNormal: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 17,
  },

  lyricTextActive: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 20,
  },

  blockView: {
    width: 23,
    height: (height * 0.8 - 100) / 2,
  },

  lyricText: {
    width: width,
    height: lyricOnelineHeight, // assume 2 lines at most
    marginTop: lyricOnelineMarginTop,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    textAlignVertical: 'center', // given height align vertically
  },
});