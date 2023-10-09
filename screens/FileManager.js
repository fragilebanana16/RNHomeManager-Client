import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TextInput, SafeAreaView, FlatList, Keyboard, ImageBackground, TouchableOpacity,Dimensions } from "react-native";
import { ChatCard, NFTCard, ContactsHeader, FocusedStatusBar } from "../components";
import { COLORS, FONTS, SIZES, assets, NFTData, ContactsData } from "../constants";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MusicAppHome from "./MusicPlayer/MusicAppHome";
import CustomDrawer from "../components/Misc/CustomDrawer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar';
import { Fontisto } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

// https://docs.expo.dev/versions/latest/sdk/imagepicker/?redirected
import * as ImagePickerRaw from 'expo-image-picker';
// expo原生的不支持多选，使用https://github.com/mdjfs/expo-image-multiple-picker
import { ImagePicker } from 'expo-image-multiple-picker'
import { ceil } from "react-native-reanimated";
import client from "../api/client";
// const options={
//   title: 'Select Image',
//   type:'library',
//   options:{
//     selectionLimit:1,
//     mediaType:'photo',
//     includeBase64:false,
//   }
// }

const FileManager = () =>{
  const navigation = useNavigation();
  const [multiImagePickerOpen, setMultiImagePickerOpen] = useState(true)
  const [uri, setUri] = useState();
  const [res, setRes] = useState(null);
  const [uploadPercent, setuploadPercent] = useState();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadInfo, setUploadInfo] = useState();

  const takeShot = async() => {
    const cam = await ImagePickerRaw.launchCameraAsync();

  }

  // use another middleware to select multiple media
  const pickMultiMediaStorage = async () => {
    navigation.navigate("MultiUploader");
  };

  const pickSingleMediaStorage = async () => {
    const res = await ImagePickerRaw.requestMediaLibraryPermissionsAsync();
    if (!res.granted) {
      alert('RequestMediaLibraryPermissionsAsync:Permission Needed');
      return;
    }

    // No permissions request is necessary for launching the image library, if set in app.json
    let result = await ImagePickerRaw.launchImageLibraryAsync({
      mediaTypes: ImagePickerRaw.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1,
    });
  
    // 输出会带警告
    // https://github.com/expo/expo/issues/20977
    // "You are correct, removing the console.log got rid of the error message. That seems a bit unexpected to me."
    if (!result.canceled) {
      setUri(result.assets[0].uri);
    }

    console.log(result.assets[0]);
    setRes(result);
    // var filename = result.assets[0].uri.split('/').pop()
    // let formData = new FormData();
    // // console.log(filename);
    // // console.log(uri);

    // formData.append("videoFile", {
    //     name: filename,
    //     uri: result.assets[0].uri,
    //     type: result.assets[0].type
    // });

    // formData.append("id", "1234567");

    // try {
    //     let response = await fetch('http://192.168.0.113:19000/assets/upload', {
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         body: formData
    //     });
    //     return await response.json();
    // }
    // catch (error) {
    //     console.log('error : ' + error);
    //     return error;
    // }

  };
    // const openGallery = async () =>{
    //   try {
    //     console.log(ImagePicker.launchImageLibrary != null);
    //     const ret = await ImagePicker.launchImageLibrary(options)
    //     // await FilePicker.pick({
    //     //   presentationStyle: 'fullScreen',
    //     // })
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }


    const options = {
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
      }
    }


    const uploadMedia= async () => {

              //     console.log("onpress");
              // navigation.navigate("MultiUploader");
      setuploadPercent(0);

      if(res === null){
        alert('uploadMedia:Media Select Null');
        return;
      }

      if (uri === '') {
        alert('uploadMedia:Media Uri Empty');
        return;
      }

      const formData = new FormData();
      // 1.这里的这个key：uploaded_file要和服务端一致
      // 2.文件名不支持获取, name永远是个guid，不同于多选，多选带个filename属性，这个只有uri
      formData.append('uploaded-file', {
        name: res.assets[0].uri.split('/').pop(),
        uri: uri,
        type: 'image/jpg',
      });
  
      try {
        const res = await client.post('/api/file/upload', formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress:(progressEvent) => {
            const {loaded, total} = progressEvent;
            let percent = Math.floor(loaded * 100/ total);
            setuploadPercent(percent);
            console.log(`${percent}%`);
          }
        });

        // console.log(res.data);
  
        if (res.data.success) {
          console.log('success uploadMedia');
          setUploadSuccess(true);
          setUploadInfo(res.data.message);
          // props.navigation.dispatch(StackActions.replace('UserProfile'));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
   

  return (
    <View style={{flex: 1, backgroundColor: 'rgba(23, 33, 33, 0.8)',
    justifyContent:'center'}}>
    {/* 单文件导入，只支持单文件 */}
      <TouchableOpacity onPress={pickSingleMediaStorage}>
          <View style={{flexDirection:'row',
          marginLeft:110, 
          }}>
            <Fontisto name="file-1" size={40} color='#fff' style={{alignSelf:'center', marginLeft:2, marginRight:5}}  />
            <Text 
            style={{color:'white', fontSize:20,
            alignSelf:'center', marginLeft:10}}>Import Single</Text>
        </View>
      </TouchableOpacity>

      {/* 批量导入 */}
      <TouchableOpacity onPress={pickMultiMediaStorage}>
          <View style={{flexDirection:'row',
           marginTop:100, 
          marginLeft:110, 
          }}>
            <Ionicons name='md-file-tray-full-sharp' size={40} color='#fff' 
            style={{alignSelf:'center'}}/>
            <Text 
            style={{color:'white', fontSize:20,
            alignSelf:'center', marginLeft:10}}>Batch Import</Text>
        </View>
      </TouchableOpacity>
    {/* 拍照 */}

      <TouchableOpacity onPress={takeShot}>
          <View style={{flexDirection:'row', 
           marginTop:100, 
           marginLeft:110,
          }}>
            <Ionicons name='camera' size={40} color='#fff' 
            style={{alignSelf:'center'}}/>
            <Text 
            style={{color:'white', fontSize:20,
            alignSelf:'center', marginLeft:10}}>Take Shot</Text>
        </View>
      </TouchableOpacity>
      {/* 上传 */}
      <TouchableOpacity
          onPress={uploadMedia}
          style={{textAlign: 'center',
                  marginTop:100, 
                  marginLeft:110,
                  fontSize: 16,
                  opacity: 1, width: 200, height:50,  borderRadius:10,
                  fontWeight: 'bold',backgroundColor: (res !== null) ? 'rgba(23, 144, 33, 0.8)' : 'rgba(23, 23, 33, 0.8)',
                  }}
        >
            <View style={{flex: 1, flexDirection:'row', justifyContent:'center'}}>
              <Ionicons name='cloud-upload' size={40} color='#fff' 
              style={{alignSelf:'center'}}/>
              <Text style={{
                alignSelf:'center', 
                fontSize:20,
                color:'white',
                marginLeft:10}}>Upload Media</Text>
            </View>
      </TouchableOpacity>
      <Text style={{
                alignSelf:'center', 
                fontSize:20,
                marginTop:20,
                color:'white',
                marginLeft:10}}>{uploadSuccess ? 'Ok:'+ uploadInfo: 'Failed'}</Text>
      <Text style={{
                alignSelf:'center', 
                fontSize:20,
                marginTop:20,
                color:'white',
                marginLeft:10}}>{uploadPercent}%</Text>
                
      <Progress.Bar 
      progress={uploadPercent? uploadPercent / 100 : 0} width={200} />
      <Progress.Pie progress={0.4} size={50} />
      <Progress.Circle size={50} indeterminate={true}/>
    </View>

    
  );
}

export default FileManager