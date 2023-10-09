import { ImagePicker } from 'expo-image-multiple-picker'
import React, { useState, useEffect, useRef } from "react";
import { View } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const MultiUploader = () => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(true)
    if (open) {
      return (
        // flex需要设置为1，否则无法显示，默认header太高只能设置marginTop打补丁，可以重写header但是接口是ts的
        <View style={{flex: 1, backgroundColor: 'rgba(23, 33, 33, 0.8)',
        justifyContent:'center', marginTop:-60}}>
        <ImagePicker
          onSave={(assets) => {
            console.log(assets);
            setOpen(false)
            navigation.goBack();
          }}
          onCancel={() => {
            console.log('[MultiUploader]no permissions or user go back')
            setOpen(false)
            navigation.goBack();
          }}
          video
          multiple
        />
        </View>
      )
    }
}
export default MultiUploader
