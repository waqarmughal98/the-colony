import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Color from '../Color';
import DasboardTop from '../Components/Dasboard/DasboardTop';
import DashboardBottom from '../Components/Dasboard/DashboardBottom';
import Footer from '../Components/Footer/Footer';
import { useNavigation } from '@react-navigation/core';
import * as SecureStore from "expo-secure-store";
function Dashboard({ navigation }) {
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: 'Dashboard',
        headerStyle: { backgroundColor: Color.darkOrange },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity activeOpacity={0.6}>
             <Ionicons name="ios-menu" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity activeOpacity={0.6}>
             <Ionicons name="ios-notifications" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ),
      });
    }, [navigation]);

    useEffect(()=>{
      let result =  SecureStore.getItemAsync("token");
      if (result) {
        Alert.alert("🔐 Here's your value 🔐 \n" + result);
      } else {
        Alert.alert('No value stored under that key.');
        navigation.navigate('Login');
      }
    }, [])
  
    return (
      <View style={styles.mainContainer}>
        <View style={{flex:1}}>
        {/* DashBoard top section */}
        <View style={styles.DasboardTop}>
          <DasboardTop navigation={navigation}/>
        </View>
        {/* Dashboard bottom Section */}
        <View style={styles.DashboardBottom}>
          <DashboardBottom navigation={navigation}/>
        </View>
        </View>
        <Footer/>
      </View>
    );
  }

export default Dashboard

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: Color.brightOrange,
    },
    DasboardTop:{
      marginVertical:10,
    },
    DashboardBottom:{
      marginVertical:7
    }
})