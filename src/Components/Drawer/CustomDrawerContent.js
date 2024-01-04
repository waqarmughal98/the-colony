import React ,{useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { vh,vw } from '../../utils/ScreenSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '../../Color';
import Toast from 'react-native-toast-message';
const CustomDrawerContent = (props) => {
  useEffect(()=>{
    (async ()=>{
      const userData=await AsyncStorage.getItem("userDetail")
      const parsedUserData = JSON.parse(userData);
      setUserDetail(parsedUserData);
    })()
  }, [])
  const [userDetail, setUserDetail]=useState()
  const { navigation } = props;
  const HandleLogout= async()=>{
    try {
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('userDetail')
      navigation.toggleDrawer()
      Toast.show({
        type: 'success',
        text1: 'logout Successfully!',
        text2: 'we are moving you toward Login Screen',
        visibilityTime:700,
        topOffset:5
      });
      setTimeout(() => {
        navigation.navigate("LoginScreen");
      }, 700); 
      // Additional logout logic or navigation here
    } catch (error) {
      console.error('Error removing token:', error);
    }
 
  
  }
  return (
    <DrawerContentScrollView {...props}>
      {/* Your custom drawer content */}
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>{userDetail?.fname || ""} {userDetail?.lname || ""}</Text>
        <Text style={styles.drawerSubHeaderText}>{userDetail?.email || ""}</Text>
      </View>

      {/* Default drawer items */}
      <DrawerItemList {...props} />

      {/* Custom options */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity onPress={()=>navigation.navigate("update-password")} >
          <Text style={styles.drawerFooterText}>Update Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>HandleLogout()}>
          <Text style={styles.drawerFooterText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};



const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: Color.darkOrange,
    padding: 16,
    height:vh*35,
    marginTop:-8*vh,
    paddingHorizontal:8*vw,
    paddingTop:15*vh
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"white",

  },
  drawerSubHeaderText: {
    fontSize: 16,
    marginTop: 2,
    color:"white"
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    padding: 16,
  },
  drawerFooterText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight:"600",
    marginVertical:15
  },
});

export default CustomDrawerContent;
