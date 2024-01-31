import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Color from '../Color';
import DasboardTop from '../Components/Dasboard/DasboardTop';
import DashboardBottom from '../Components/Dasboard/DashboardBottom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../utils/Constant';
import Toast from 'react-native-toast-message';
import { Entypo } from '@expo/vector-icons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
function Dashboard({ navigation }) {
  const [data, setData] = useState([]);
  const [authToken, setAuthToken] = useState();
  const route = useRoute();
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: 'Dashboard',
        headerStyle: { backgroundColor: Color.darkOrange },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
          <TouchableOpacity
            onPress={() =>navigation.toggleDrawer()}
            activeOpacity={0.6}
          >
            <Entypo name="menu" size={27} color="white" />
          </TouchableOpacity>
        </View>
        ),
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate("notifications")} >
              <Ionicons name="notifications-circle-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ),
      });
    }, [navigation]);

    useEffect(()=>{
        (async ()=>{
          const Token = await AsyncStorage.getItem("token");
          setAuthToken(Token)
          if(!Token){
             navigation.navigate("LoginScreen")
          }else{
            await axios.get(URL + '/dashboard',{
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }).then((res)=>{
                setData(res.data);
              }).catch((err)=>{
                console.log(err);
            })
          }
      })()
    }, [authToken])

    // useEffect(() => {
    //   const backAction = () => {
    //     if (route.name === 'Dashboard') {
    //       Alert.alert('Hold on!', 'Are you sure you want to go back?', [
    //       {
    //         text: 'Cancel',
    //         onPress: () => null,
    //         style: 'cancel',
    //       },
    //       {text: 'YES', onPress: () => BackHandler.exitApp()},
    //     ]);
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   };
  
    //   const backHandler = BackHandler.addEventListener(
    //     'hardwareBackPress',
    //     backAction,
    //   );
  
    //   return () => backHandler.remove();
    // }, [route.name=="Dashboard"]);


    return (
      <View style={styles.mainContainer}>
        <View style={{flex:1}}>
        {/* DashBoard top section */}
        <View style={styles.DasboardTop}>
          <DasboardTop navigation={navigation} data={data}/>
        </View>
        {/* Dashboard bottom Section */}
        <View style={styles.DashboardBottom}>
          <DashboardBottom navigation={navigation} status={data}/>
        </View>
        </View>
        <Toast/>
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
      marginVertical:11
    }
})