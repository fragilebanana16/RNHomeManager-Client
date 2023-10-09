import React, { Component, createContext } from 'react';
import { Text, View, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';
import { Songs } from '../constants/songs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { storeAudioForNextOpening } from '../components/Misc/helper'
import { play, pause, resume, playNext } from "../components/Misc/AudioController"

export const AudioContext = createContext();
export class AudioProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        audioFiles: [],
        permissionError: false,
        dataProvider: new DataProvider((r1, r2) => r1 !== r2), // rerender only when row1 != row2
        playingObj: null,
        soundObjStatus: null,
        currentAudio: {}, // model
        isPlaying: false,
        currentAudioIndex: null,
        playbackPos: null,
        playbackDuration: null,
        playOrder: "RANDOM",
      }

      this.totalTracksCount = 0;
    }
    
    loadPreviousAudio = async () => {
      let previousAudio = await AsyncStorage.getItem('previousAudio');
      let currentAudio;
      let currentAudioIndex;
  
      if (previousAudio === null) {
        currentAudio = this.state.audioFiles[0]; // default first
        currentAudioIndex = 0;
      } else {
        previousAudio = JSON.parse(previousAudio);
        currentAudio = previousAudio.audio;
        currentAudioIndex = previousAudio.index;
      }
  
      this.setState({ ...this.state, currentAudio, currentAudioIndex });
    };

    // getAudioFiles = async () => {
    //     const { dataProvider, audioFiles } = this.state;
    //     let media = await MediaLibrary.getAssetsAsync({
    //       mediaType: 'audio',
    //     });
    //     media = await MediaLibrary.getAssetsAsync({
    //       mediaType: 'audio',
    //       first: media.totalCount,
    //     });

    //     this.setState({
    //       ...this.state,
    //       audioFiles: Songs,
    //     });

    //     // // this.totalAudioCount = media.totalCount;
    
    //     this.setState({
    //       ...this.state,
    //       dataProvider: dataProvider.cloneWithRows(audioFiles),
    //     });
    //   };

    getAudioFiles = async () => {
      const { dataProvider, audioFiles } = this.state;
      // let media = await MediaLibrary.getAssetsAsync({
      //   mediaType: 'audio',
      // });
      // media = await MediaLibrary.getAssetsAsync({
      //   mediaType: 'audio',
      //   first: media.totalCount,
      // });
      // this.totalAudioCount = media.totalCount;
  

      this.setState({
        ...this.state,
        dataProvider: dataProvider.cloneWithRows([ // have to be like this
          ...audioFiles,
          ...Songs, // array
        ]),
        audioFiles: [...audioFiles, ...Songs],
      });

      this.totalTracksCount = Songs.length;
    };

    onPlaybackStatusUpdate = async playbackStatus => {
      if (playbackStatus !== null && playbackStatus.isLoaded && playbackStatus.isPlaying) {
        this.updateState(this, {
              playbackPos: playbackStatus.positionMillis, 
              playbackDuration: playbackStatus.durationMillis,
          })
      }

      if (playbackStatus.didJustFinish) {
          console.log("didJustFinish");
          let nextAudioIndex = 0;
          switch (this.state.playOrder) {
            case "RANDOM":
              nextAudioIndex = Math.floor(Math.random() * this.state.totalTracksCount);
              break;
            case "LOOP":
              nextAudioIndex = this.state.currentAudioIndex;
              break;
            default:
              nextAudioIndex = this.state.currentAudioIndex + 1;
              break;
          }

          // there is no next audio to play or the current audio is the last
          if (nextAudioIndex >= this.totalAudioCount) {
              this.state.playingObj.unloadAsync();
              this.updateState(this, {
              soundObjStatus: null,
              currentAudio: this.state.audioFiles[0],
              isPlaying: false,
              currentAudioIndex: 0,
              playbackPosition: null,
              playbackDuration: null,
              });

              return await storeAudioForNextOpening(this.state.audioFiles[0], 0);
          }
          // otherwise we want to select the next audio
          const audio = this.state.audioFiles[nextAudioIndex];
          const status = await playNext(this.state.playingObj, audio.SongUri);
          this.updateState(this, {
              soundObjStatus: status,
              currentAudio: audio,
              isPlaying: true,
              currentAudioIndex: nextAudioIndex,
          });
          return await storeAudioForNextOpening(audio, nextAudioIndex);
      }
  }

    componentDidMount() {
      // 创建时不要为空，需要放前面，否则getAudioFiles为空?
      if (this.state.playingObj === null) {
        this.setState({ ...this.state, playingObj: new Audio.Sound() });
      }

      this.getAudioFiles();
      // this.getPermission();

    }

    updateState = (prevState, newState = {}) => {
      this.setState({...prevState, ...newState});
    }
  
    render() {
        const { audioFiles, dataProvider, permissionError,
          playingObj, soundObjStatus, currentAudio, isPlaying,
        currentAudioIndex, playbackPos, playbackDuration, playOrder} = this.state;

        // if (permissionError)
        //     return (
        //         <View
        //         style={{
        //             flex: 1,
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //         }}
        //         >
        //         <Text style={{ fontSize: 25, textAlign: 'center', color: 'red' }}>
        //             It looks like you haven't accept the permission.
        //         </Text>
        //         </View>
        //     );

        return (
            <AudioContext.Provider value={{audioFiles ,dataProvider,
             playingObj, soundObjStatus, currentAudio, 
             isPlaying, currentAudioIndex, 
             updateState: this.updateState,
             loadPreviousAudio: this.loadPreviousAudio,
             totalTracksCount: this.totalTracksCount,
             playbackPos, playbackDuration,
             onPlaybackStatusUpdate : this.onPlaybackStatusUpdate,
             playOrder,}}>
            {this.props.children}
            </AudioContext.Provider>
        );
    }
  }
  
  export default AudioProvider;