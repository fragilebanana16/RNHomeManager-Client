import React, { useState, useEffect, useRef, Component } from "react";
import { TouchableOpacity, StyleSheet, Dimensions,StatusBar, ScrollView} from "react-native";
import { ImageBackground, View, Text, Image, TextInput, SafeAreaView, FlatList, Keyboard, Animated, Easing } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import { AudioContext } from "../../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview"; // solve performance issue
import AudioListItem from "../../components/Misc/AudioListItem";
import OptionModal from "../../components/Misc/OptionModal";
// import { play,pause,resume,playNext,selectAudio} from '../misc/audioController';
import { Audio } from 'expo-av';
import { Songs } from "../../constants/songs";
import { play, pause, resume, playNext } from "../../components/Misc/AudioController"
import MusicPlayer from "./MusicPlayer";
import { SIZES } from '../../constants/theme';
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';
import { storeAudioForNextOpening } from '../../components/Misc/helper'
export class AudioList extends Component {
    static contextType = AudioContext;
    constructor(props) {
        super(props);
        this.state = {
          optionModalVisible: false,
        };
        this.currentItem = {};
    }

    componentDidMount() {
        this.context.loadPreviousAudio();
    }
//     <ScrollView>
//     {this.context.audioFiles.map(item => 
//     <Text style={{padding: 10}} key={item.id}>
//         {item.filename}
//     </Text>)}
//     </ScrollView>

    layoutProvider = new LayoutProvider(index => {
        // 第一个是播放全部
        if (index === 0) {
            return 'PlayHeader';
        }else {
            return 'audio';
        }
    }, (type, dim) => {
        switch (type) {
            case 'audio':
              dim.width = Dimensions.get('window').width;
              dim.height = 70;
              break;
            case 'PlayHeader':
                dim.width = Dimensions.get('window').width;
                dim.height = 117; // 调整表头同步修改这里高度，保证header和首个高度和下一个间距相等
                break;
            default:
              dim.width = 0;
              dim.height = 0;
          }
    })

    rowRenderer = (type, item, index, extendedState) => {
        const {totalTracksCount} = this.context; // AudioList.contextType在这里是未定义的
        return (     
        <View>
        { 
            (0===index) ? 
            (   
                <View style={{flexDirection: "row", alignItems:'center', paddingLeft:12}}>
                    <View style={{alignItems:'center', paddingLeft:10}}>
                        <FontAwesome name="play-circle" size={28} color="white" />
                    </View>
                    <View style={{flexDirection: "row", alignItems:'center',justifyContent:'space-evenly'}}>
                        <Text style={{fontSize:16, color:'rgba(255, 255, 255, 0.8)', 
                            margin:10,
                            paddingLeft:14}}>
                            Play All
                        </Text>
                        <Text style={{fontSize:14, color:'rgba(255, 255, 255, 0.5)', 
                            left:-5,
                            textAlign: 'left'}}>
                            {`(${totalTracksCount} tracks)`}
                        </Text>
                    </View>
                </View>
            )
            : null}

            <AudioListItem 
            title={item.SongName} 
            artist={item.Artist} 
            album={item.SongAlbumImg} 
            isPlaying={extendedState.isPlaying}
            duration={item.FileSize}
            activeListItem={this.context.currentAudioIndex === index}
            onAudioPress={() => this.handleAudioPress(item)}
            onOptionPress={() => {
                this.currentItem = item;
                this.setState({...this.state, optionModalVisible: true });
            }}>
            </AudioListItem>
        </View>
        )
    }

 

    handleAudioPress = async audio => {
        this.props.navigation.navigate('MusicPlayer'); // define in app.js first
        const {soundObjStatus, playingObj, audioFiles,
             currentAudio, updateState, currentAudioIndex, 
             onPlaybackStatusUpdate} = this.context;


        if (null === soundObjStatus) {
            // await selectAudio(audio, this.context);
            console.log("press audio");
            const playBackObj = new Audio.Sound();
            
            // 不能带空格，否则MD5校验失败
            // await playBackObj.loadAsync(audioUri);
            // const status = await playBackObj.playAsync();
            const status = await play(playBackObj, audio.SongUri, 3);
            const index = audioFiles.indexOf(audio);
            updateState(this.context, 
            {
                playingObj: playBackObj, 
                soundObjStatus: status, 
                currentAudio: audio,
                isPlaying: true,
                currentAudioIndex: index,
            });

            playBackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
            // return this.setState({...this.state, 
            //     playingObj: playBackObj, 
            //     soundObjStatus: status, 
            //     currentAudio: audio.SongUri});

            return storeAudioForNextOpening(audio, index);
        }

        // pause
        if (undefined !== soundObjStatus && soundObjStatus.isLoaded && soundObjStatus.isPlaying
            && currentAudio.UUID === audio.UUID) {
            const status = await pause(playingObj);
            console.log("pause audio");
            return updateState(this.context, 
            {
                soundObjStatus: status, 
                isPlaying: false,
            });

            // return this.setState({...this.state, 
            //     soundObjStatus: status, 
            // });
        }

        // resume
        if (undefined !== soundObjStatus && soundObjStatus.isLoaded && !soundObjStatus.isPlaying 
            && currentAudio.UUID === audio.UUID) {
            console.log("resume audio");
            const status = await resume(playingObj);
            return updateState(this.context, 
            {
                soundObjStatus: status, 
                isPlaying: true,
            });
            // return this.setState({...this.state, 
            //     soundObjStatus: status, 
            // });
        }

        // select another audio
        if (undefined !== soundObjStatus && soundObjStatus.isLoaded && 
            currentAudio.UUID !== audio.UUID) {
            console.log("select another audio");
            const status = await playNext(playingObj, audio.SongUri);
            const index = audioFiles.indexOf(audio);
            return updateState(this.context, 
            {
                currentAudio: audio,
                soundObjStatus: status,
                isPlaying: true,
                currentAudioIndex: index,
            });
        }

      };

    render(){
        return(
  
            <SafeAreaView style={{ flex: 1}}>
                <StatusBar hidden={false} translucent backgroundColor="transparent" />
                    <AudioContext.Consumer>
                        {
                            /* component is not allowed, need function 
                        AudioContext.Provider的value给的是object，这里{dataProvider}才能拿到其中的对象
                        */
                        }
                        {({dataProvider, isPlaying}) =>{
                        if (!dataProvider._data.length) return null;
                        return (
                            <View style={{ flex: 1, top:3}}>
                                <RecyclerListView  
                                    style={{marginBottom:50}} // 和全局的miniplayer高度一致
                                    dataProvider={dataProvider}
                                    layoutProvider={this.layoutProvider}
                                    rowRenderer={this.rowRenderer}
                                    extendedState={{isPlaying}}>
                                </RecyclerListView>

                                <OptionModal 
                                    onClose={() => this.setState({ ...this.state, optionModalVisible: false })}
                                    visible={this.state.optionModalVisible}
                                    currentItem={this.currentItem}
                                    onPlayPress={() => console.log('Playig audio')}
                                    onPlayListPress={() => {
                                    this.context.updateState(this.context, {
                                        addToPlayList: this.currentItem,
                                    });
                                    this.props.navigation.navigate('PlayList');
                                    }}
                                    // options={[
                                    // {
                                    //     title: 'Add to playlist',
                                    //     onPress: this.navigateToPlaylist,
                                    // },
                                    // ]}
                                    // 
                                    // onClose={() =>
                                    // this.setState({ ...this.state, optionModalVisible: false })
                                    // }
                                    // visible={this.state.optionModalVisible}
                                />
                            </View>

                            )
                        }}
                    </AudioContext.Consumer>
        </SafeAreaView>

    )}
  }

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(33, 33, 33, 1)',
    },
})

export default AudioList;
