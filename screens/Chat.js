import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TextInput, SafeAreaView, FlatList, Keyboard } from "react-native";
import io from "socket.io-client"
import { AppIcon, NFTCard, HomeHeader, FocusedStatusBar, CircleButton } from "../components";
import { COLORS, FONTS, SIZES, assets, NFTData, AppHomeData } from "../constants";
// Stack.Screen默认自带route, navigation参数
const Chat = ({ route, navigation }) =>{
  // 带括号声明:不用es6的话只能route.params.item
  const { item } = route.params;
  const [state, setState] = useState("");

    useEffect(()=>{
        // connect to server
        this.socket = io("http://192.168.0.100:3000");
        this.socket.on('update', () => setState('Goooood'));
    }, []);

    const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardStatus('Keyboard Shown');
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardStatus('Keyboard Hidden');
        inputRef.current.blur();
        });

        return () => {
        showSubscription.remove();
        hideSubscription.remove();
        };
    }, []);

    const inputRef = useRef();
    const submitChatMessage = () => {
        this.socket.emit("chat_message", state.chatMessage);
        setState({chatMessage: ""});
        inputRef.current.focus();
    };

    const changeText = (chatMessage) => {
        setState({chatMessage: chatMessage});
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
          <FocusedStatusBar backgroundColor='rgba(255,0,0, 0.50)'/>
          <View
            style={{
              backgroundColor: COLORS,
              padding: SIZES.font,
            }}
          >
          <View style={{ width: 45, height: 45 }}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
              left={100}
            />

          <Text
            style={{
              fontSize: SIZES.font,
              fontFamily: FONTS.semiBold,
              color: COLORS.primary,
            }}
          >
            {item.name}
          </Text>

            <CircleButton
              imgUrl={assets.left}
              handlePress={() => navigation.goBack()}
              left={15}
             
            />
          </View>

          {/* talk to my pc ctrl */}
          <View style={{ marginTop: SIZES.font }}>
            <View 
              style={{
                width: "100%",
                borderRadius: SIZES.font,
                backgroundColor: COLORS.gray,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: SIZES.font,
                paddingVertical: SIZES.small - 2,
                top: (keyboardStatus === 'Keyboard Hidden') ? 690 : 340,
              }}
            >
                <TextInput
                placeholder="Send Messages"
                style={{ flex: 1 }}
                onChangeText={(msg) => changeText(msg)}
                onSubmitEditing={(event) => submitChatMessage()}
                value={state.chatMessage}
                // enter auto open keyboard
                ref={inputRef}
                // onLayout={()=> inputRef.current.focus()}
                // show keyboard always
                blurOnSubmit={false}
                onPress
                />
                <Text >{keyboardStatus}</Text>
            </View>
          </View>
    </View>

</SafeAreaView>
);
}

export default Chat