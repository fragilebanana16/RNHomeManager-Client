import 'react-native-gesture-handler';
import React from "react";
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { View } from "react-native";
import Home from "./screens/Home";
import Chat from "./screens/Chat";
import Contacts from "./screens/Contacts";
import MusicAppHome from './screens/MusicPlayer/MusicAppHome';
import AudioProvider from './context/AudioProvider';
import MusicPlayer from './screens/MusicPlayer/MusicPlayer';
import MyDrawer from './screens/Drawer';
import FileManager from './screens/FileManager';
// import Details from "./screens/Details";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MultiUploader from './components/FileUpload/MultiUploader';
import Movie from './screens/Movie/MoviePage';
import Toobox from './screens/Toolbox/Toolbox';
import SolveDetail from './screens/Toolbox/SolveDetail';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import MovieAppHome from './screens/Movie/MovieAppHome';
const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent", // 影响navi的背景，如果transparent，上一个会残留
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    RobotoBlack: require("./assets/fonts/Roboto-Black.ttf"),
    RobotoBlackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoBoldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
    RobotoItalic: require("./assets/fonts/Roboto-Italic.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoLightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoMediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoThin: require("./assets/fonts/Roboto-Thin.ttf"),
    RobotoThinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
  });

  if (!loaded) return null;

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <AudioProvider>
      <ActionSheetProvider>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Home"
          >
            <Stack.Screen name="MusicAppHomeDrawer" component={MyDrawer} options={{ animationEnabled: false }} />
            <Stack.Screen name="FileManage" component={FileManager} options={{ animationEnabled: false }} />
            <Stack.Screen name="Toolbox" component={Toobox} options={{ animationEnabled: false }} />
            <Stack.Screen name="SolveDetail" component={SolveDetail} options={{ animationEnabled: false }} />

            {/* 关闭动画，太卡了 */}
            <Stack.Screen name="Home" component={Home} options={{ animationEnabled: false }} />
            <Stack.Screen name="MultiUploader" component={MultiUploader} options={{ animationEnabled: false }} />
            <Stack.Screen name="Movie" component={Movie} options={{ animationEnabled: false }} />
            <Stack.Screen name="Chat" component={Chat} options={{ animationEnabled: false }} />
            <Stack.Screen name="MusicPlayer" component={MusicPlayer} options={{
              animationEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid
            }} />
            <Stack.Screen name="MusicAppHome" component={MusicAppHome} options={{
              animationEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }} />
            <Stack.Screen name="MovieAppHome" component={MovieAppHome} options={{
              animationEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }} />
            <Stack.Screen name="Contacts" component={Contacts}
              // https://www.youtube.com/watch?v=PvjV96CNPqM
              options={{
                animationEnabled: true,
                // 左滑打开
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
              }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ActionSheetProvider>
    </AudioProvider>
  );
};

export default App;