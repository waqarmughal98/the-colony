import { StyleSheet,TouchableOpacity, Text, View,Image } from 'react-native'
import React from 'react'
import {Foundation,Zocial,Ionicons } from '@expo/vector-icons';
import Color from '../../Color';
import { vh, vw  } from '../../utils/ScreenSize';

const Profile = ({navigation}) => {

  return (
    <View style={styles.mainContainer}>
       <View style={styles.top}>
       <View style={{ marginHorizontal: 20 ,marginTop:5*vh,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          <TouchableOpacity
            onPress={() =>navigation.navigate("Dashboard")}
            activeOpacity={0.6}
          >
          <Ionicons name="ios-arrow-back-sharp" size={24} color="white" style={{marginLeft:12}} />
          </TouchableOpacity>
          <Text style={{fontWeight:"bold",color:"white",textAlign:"center",fontSize:20}}>Profile</Text>
          <Ionicons name="md-person-sharp" size={20} color="white" />
        </View>
       </View>
       <View style={styles.bottom}>
          <View style={styles.imgContainer}>
            <Image source={require('../../../assets/imgs/lb.png')} style={styles.Image} />
            <Text style={styles.markTitle}>Mark Nisham</Text>
          </View>
          <Text style={styles.text2}>Personal Details:</Text>
          <View style={styles.infoContainer}>
             <View style={styles.individual}>
              <Zocial name="email" size={24} color="white" />
              <Text style={styles.text3}>mark@imaginedesigns.co</Text>
             </View>
             <View style={styles.individual}>
               <Foundation name="telephone" size={26} color="white" />
                <Text style={styles.text3}>0321 1646523</Text>
             </View>
          </View>

     
       </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  mainContainer:{
    display:"flex",
    flexDirection:"column"
  },
  top:{
    height:
  36*vh,
    backgroundColor:Color.darkOrange
  },
  bottom:{
    backgroundColor:"white",
    height:78*vh,
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    marginTop:-10*vh,
    paddingHorizontal:20
  
    
  },
  Image:{
    marginTop:-10*vh,
    height:20*vh,
    width:20*vh,
    borderColor:"white",
    borderWidth:2.2*vh,
    borderRadius:2000,
  },
  markTitle:{
    fontSize:20,
    fontWeight:"bold",
    color:"#383c4a"
  },
  imgContainer:{
    alignSelf:"center",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
  },
  text2:{
    fontSize:17,
    marginTop:20,
    fontWeight:"bold",
    color:"#383c4a"
  },
  individual:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:Color.darkOrange,
    borderRadius:10,
    height:8*vh,
    paddingHorizontal:20,
       // Shadow properties for iOS
       shadowColor: "black",
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.3,
       shadowRadius: 4,
   
       // Elevation for Android
       elevation: 2,
  },
  text3:{
     fontSize:18,
     color:"white",
     marginLeft:20
  },
  infoContainer:{
  display:"flex",
  gap:20,
  marginVertical:20
  }
})