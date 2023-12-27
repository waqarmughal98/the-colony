// Toast.js

import React, { useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Toast = ({ message, type, onHide }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      toastRef.current.slideInUp(800);

      // Automatically hide the toast after a delay
      const duration = 3000; // Adjust the duration as needed
      const timerId = setTimeout(() => {
        hideToast();
      }, duration);

      // Clear the timer when the component is unmounted or toast is manually closed
      return () => clearTimeout(timerId);
    }
  }, []);

  const hideToast = () => {
    if (toastRef.current) {
      toastRef.current.slideOutDown(800);
      // You can add more animations or customization here

      // Wait for the animation to complete before removing the component
      setTimeout(() => {
        onHide();
      }, 800);
    }
  };

  return (
    <Animatable.View ref={toastRef} style={styles.container} animation="fadeIn">
      <View style={type === 'success' ? styles.successContainer : styles.errorContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </Animatable.View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  successContainer: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  messageText: {
    color: 'white',
  },
};

export default Toast;
