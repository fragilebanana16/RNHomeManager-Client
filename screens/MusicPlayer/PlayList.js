import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';

const PlayList = () =>{
    return (
        <View style={{flex: 1, backgroundColor: 'rgba(123,123,123,1)'}}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.playListBanner}>
                    <Text>Favorite</Text>
                    <Text style={styles.audioCount}>
                        0 Songs
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {}}
                    style={{ marginTop: 15 }}>
                    <Text style={styles.playListBtn}>+ Add New Playlist</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>

      );
  }
  
export default PlayList;

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: 'rgba(204,204,204,1)',
    },
    playListBanner: {
      padding: 5,
      backgroundColor: 'rgba(0,204,204,0.3)',
      borderRadius: 5,
      marginBottom: 15,
    },
    audioCount: {
      marginTop: 3,
      opacity: 0.5,
      fontSize: 14,
    },
    playListBtn: {
      color: 'rgba(51,51,51,1)',
      letterSpacing: 1,
      fontWeight: 'bold',
      fontSize: 14,
      padding: 5,
    },
  });