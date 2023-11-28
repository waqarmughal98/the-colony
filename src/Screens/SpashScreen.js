// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to the Login screen after two seconds
      navigation.replace('Login');
    }, 2000);

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
    <View>
      <Text>The Colony</Text>
    </View>
      
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:"#FF9300",
        flex:1
    }
})