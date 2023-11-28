// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

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
    <Image source={require('../../assets/imgs/logo.png')} style={styles.Image} />
      <Text style={styles.text1}>The</Text>
      <Text style={styles.text2}>Colony</Text>
    </View>
      
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:"#FAA91C",
        flex:1,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    Image:{
        height:150,
        width:150,
        borderRadius:200,
    },
    text1:{
        color:"white",
        fontSize:18
    },
    text2:{
        color:"white",
        fontSize:30
    }
})