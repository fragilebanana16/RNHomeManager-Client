// play audio
export const play = async (playbackObj, uri, lastPosition) => {
    try {
      console.log("uri:"+uri);
        await playbackObj.loadAsync(uri); // load first
        await playbackObj.setStatusAsync({ progressUpdateIntervalMillis:500,
          rate: 1.0, })
        return await playbackObj.playAsync();

    //   if (!lastPosition)
    //     return await playbackObj.loadAsync(
    //       { uri },
    //       { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
    //     );
  
    //   // but if there is lastPosition then we will play audio from the lastPosition
    //   await playbackObj.loadAsync(
    //     { uri },
    //     { progressUpdateIntervalMillis: 1000 }
    //   );
  
    //   return await playbackObj.playFromPositionAsync(lastPosition);
    } catch (error) {
      console.log('error inside play helper method', error.message);
    }
  };

  // pause audio
export const pause = async playbackObj => {
    try {
      return await playbackObj.setStatusAsync({
        shouldPlay: false,
      });
    } catch (error) {
      console.log('error inside pause helper method', error.message);
    }
  };

  // resume audio
export const resume = async playbackObj => {
  try {
    return await playbackObj.playAsync();
  } catch (error) {
    console.log('error inside resume helper method', error.message);
  }
};

// select another audio
export const playNext = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    return await play(playbackObj, uri);
  } catch (error) {
    console.log('error inside playNext helper method', error.message);
  }
};

export const moveAudio = async (context, value) => {
  const { soundObjStatus, isPlaying, playingObj, updateState } = context;
  if (soundObjStatus === null || !isPlaying) return;

  try {
    const status = await playingObj.setPositionAsync(
      Math.floor(soundObjStatus.durationMillis * value)
    );
    updateState(context, {
      soundObjStatus: status,
      playbackPosition: status.positionMillis,
    });

    await resume(playingObj);
  } catch (error) {
    console.log('error inside onSlidingComplete callback', error);
  }
};