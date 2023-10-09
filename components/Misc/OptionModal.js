import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const OptionModal = ({
  visible,
  currentItem,
  onClose,
  options,
  onPlayPress,
  onPlayListPress,
}) => {
  const { filename } = currentItem;
  return (
    <>
    {/* 状态栏隐藏了导致列表状态栏一直黑，这里隐藏了 */}
      <StatusBar hidden={false} /> 
      <Modal animationType={'fade'} transparent visible={visible}>
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={2}>
            {filename}
          </Text>
          <View style={styles.optionContainer}>
            <TouchableWithoutFeedback onPress={onPlayPress}>
              <Text style={styles.option}>Play</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPlayListPress}>
              <Text style={styles.option}>Add to Playlist</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(20, 20, 20, 1)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1000,
  },
  optionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 300,
    color: 'rgba(255, 255, 255, 0.3)',
  },
  option: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 10,
    letterSpacing: 1,
  },
  modalBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default OptionModal;