import { StyleSheet,TouchableOpacity, ImageBackground,Text, View,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import {Foundation,Zocial,Ionicons,AntDesign } from '@expo/vector-icons';
import Color from '../../Color';
import { StatusBar } from 'react-native';
import { vh, vw  } from '../../utils/ScreenSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = ({navigation}) => {
  const [userDetail, setUserDetail]=useState()
  useEffect(()=>{
    (async ()=>{
     const userData=await AsyncStorage.getItem("userDetail")
     const parsedUserData = JSON.parse(userData);
     setUserDetail(parsedUserData);
  })()
}, [])

useEffect(()=>{
  // console.log(userDetail,"userDetail")
},[userDetail])
  return (
    <ImageBackground source={require('../../../assets/imgs/Bg.png')} style={styles.backgroundImage}>
    <StatusBar translucent backgroundColor="transparent" />
    <View style={styles.mainContainer}>
       <View style={styles.top}>
       <View style={{ marginHorizontal: 20 ,marginTop:5*vh,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          <TouchableOpacity
            onPress={() =>navigation.navigate("Home",{
              screen:"Dashboard"
            })}
            activeOpacity={0.6}
          >
          <AntDesign name="arrowleft" size={24} color="white" style={{marginLeft:12}} />
          </TouchableOpacity>
          <Text style={{fontWeight:"400",color:"white",textAlign:"center",fontSize:20}}>Profile</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate("notifications")} >
              <Ionicons name="notifications-circle-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <View style={styles.imgContainer}>
            <Image source={require('../../../assets/imgs/mark.png')} style={styles.Image} />
            <Text style={styles.markTitle}>{userDetail?.fname} {userDetail?.lname}</Text>
          </View>
       </View>
       <View style={styles.bottom}>
         
          <Text style={styles.text2}>Personal Details:</Text>
          <View style={styles.infoContainer}>
             <View style={styles.individual}>
               <View style={styles.topIndividual} >
                <View style={styles.iconContainer} >
                  <Zocial name="email" style={styles.icon} size={18} color="black" />
                </View>
                 <Text style={styles.iconText}>Email</Text>
               </View>
              <Text style={styles.text3}>{userDetail?.email}</Text>
            </View>
            
             <View style={styles.individual}>
               <View style={styles.topIndividual} >
                <View style={styles.iconContainer} >
                <Foundation name="telephone"  tyle={styles.icon}  size={22} color="black" />
                </View>
                 <Text style={styles.iconText}>Phone</Text>
               </View>
              <Text style={styles.text3}>{userDetail?.phone}</Text>
            </View>
          </View>

     
       </View>
    </View>
    </ImageBackground>
  )
}

export default Profile

const styles = StyleSheet.create({
  mainContainer:{
    display:"flex",
    flexDirection:"column"
  },
  top:{
    height:30*vh,
    zIndex:2
  },
  bottom:{
    backgroundColor:"white",
    height:70*vh,
    paddingHorizontal:30,
    zIndex:1
    
  },
  markTitle:{
    fontSize:22,
    fontWeight:"400",
    color:"white",
    marginLeft:20,
    marginTop:5*vh
  },
  imgContainer:{
    alignSelf:"center",
    display:"flex",
    flexDirection:"row",
    alignItems: "center",
    position: "absolute",
    top:12*vh,
    zIndex:100
  },
  Image:{
    width: 22*vh,
    height:22*vh,
    borderRadius:500
  },
  text2:{
    fontSize:17,
    fontWeight:"bold",
    color:"#383c4a",
    borderBottomColor:"black",
    borderBottomWidth:1,
    paddingBottom:17,
    marginTop:10*vh,
  },
  individual:{
    display:"flex",
    flexDirection:"column",
    borderRadius:10,
    paddingHorizontal:10,
    borderBottomColor:"#d3d3d3",
    borderBottomWidth:1,
    paddingBottom:20
  },
  topIndividual:{
     display:"flex",
     flexDirection:"row",
     alignItems:"center",
  },
  icon:{
       
  },
  iconContainer:{
    backgroundColor:Color.darkOrange,
    height:30,
    width:30,
    borderRadius:50,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginRight:10
  },
  iconText:{
    fontSize:16
  },
  text3:{
     fontSize:15,
     color:"black",
    marginTop:10 
  },
  infoContainer:{
  display:"flex",
  gap:20,
  marginVertical:20
  }
})