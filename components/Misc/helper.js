import AsyncStorage from '@react-native-async-storage/async-storage';

export const millisToMinutesAndSeconds = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export const storeAudioForNextOpening = async (audio, index, lastPosition) => {
    await AsyncStorage.setItem(
      'previousAudio',
      JSON.stringify({ audio: { ...audio, lastPosition }, index })
    );
};