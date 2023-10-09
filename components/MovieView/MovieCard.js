import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions,TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import { useNavigation ,useTheme} from '@react-navigation/native';
import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av';
const {width, height} = Dimensions.get('window');
const MovieCard = (props)=>{
    const navigation = useNavigation();
    const {colors} = useTheme()
    const textcolor = colors.iconColor
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("videoplayer", { videoId: props.videoId, title: props.title })}
        >
            <View style={{ marginBottom: 10 }}
            >
                {/* <Image
                    source={require('../../assets/images/app4.jpeg') }
                    style={{
                        width: "100%",
                        height: 190
                    }}

                /> */}

                <VideoPlayer
                    style={{
                        width: width,
                        height: 190
                    }}

                    videoProps={{
                        shouldPlay: false,
                        resizeMode: ResizeMode.CONTAIN,
                        // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
                        source: {
                            uri: `http://192.168.0.100:8000/api/videoStream/video/${props.videoName}`,
                        },
                    }}
                />
                <View style={{
                    flexDirection: "row",
                    margin: 5
                }}>
                    <MaterialIcons name="account-circle" size={40} color="#212121" />
                    <View
                        style={{
                            marginLeft: 10
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            width: Dimensions.get("screen").width - 50,
                            color: textcolor

                        }}
                            ellipsizeMode="tail"
                            numberOfLines={2}
                        >{props.title}</Text>
                        <Text style={{
                            color: textcolor
                        }}>{props.channel}</Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>

    )
}

export default MovieCard