import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button , StyleSheet, Image, TextInput, SafeAreaView, FlatList, Keyboard, ImageBackground, TouchableOpacity,Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get('window');
import VideoPlayer from 'expo-video-player'
import { Video, ResizeMode } from 'expo-av';
const MoviePlayList = () =>{
  const navigation = useNavigation();
  return (
      <View style={{ flex: 1, backgroundColor: 'rgba(23, 33, 33, 0.8)', }}>
          <Text style={{ fontSize: 25, color: 'white' }}>PlayList</Text>
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

export default MoviePlayList