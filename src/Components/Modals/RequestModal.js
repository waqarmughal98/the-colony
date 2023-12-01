import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RequestModal = ({ closeModal }) => {
  return (
    <View style={styles.modalContainer}>
      <Text>This is your modal content</Text>
      <TouchableOpacity onPress={closeModal}>
        <Text>Close Modal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
});

export default RequestModal;
