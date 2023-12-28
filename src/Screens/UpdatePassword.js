import { StyleSheet, Text, View, TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { vh, vw  } from '../utils/ScreenSize';
import Color from '../Color';
const UpdatePassword = () => {
    const [oldPassword, setOldPassword]=useState()
    const [newPassword, setNewPassword]=useState()
  return (
    <View style={styles.mainContainer}>
        <Text style={styles.title} >Reset Password</Text>
        <View style={[styles.individual,{marginTop:20}]}>
              <View style={styles.topIndividual} >
               <View style={styles.iconContainer} >
                 <FontAwesome5 style={styles.icon}  name="user-lock" size={14} color="black" />
               </View>
               
                <Text style={styles.iconText}>Old Password</Text>
              </View>
              <TextInput style={styles.input} value={oldPassword} onChangeText={(txt)=>setOldPassword(txt)}/>
           </View>

           <View style={styles.individual}>
              <View style={styles.topIndividual} >
               <View style={styles.iconContainer} >
               <FontAwesome5 style={styles.icon}  name="user-lock" size={24} color="black" />
               </View>
                <Text style={styles.iconText}>New Password</Text>
              </View>
              <TextInput style={styles.input} value={newPassword} onChangeText={(txt)=>setNewPassword(txt)}/>
           </View>
   
    </View>
  )
}

export default UpdatePassword

const styles = StyleSheet.create({
    mainContainer:{
        padding:20,
    },
    title:{
        fontWeight:"bold",
        fontSize:19,
    },
    bottom:{
        backgroundColor:"white",
        height:70*vh,
        paddingHorizontal:30,
        zIndex:1
        
      },
      Image:{
        marginTop:-10*vh,
        height:20*vh,
        width:20*vh,
        borderColor:"white",
    
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
        marginTop:20,
        fontWeight:"bold",
        color:"#383c4a",
      
        borderBottomWidth:1,
        paddingBottom:17,
        marginTop:10*vh,
      },
      individual:{
        display:"flex",
        flexDirection:"column",
        borderRadius:10,
        borderBottomColor:"black",
        paddingBottom:10,
        marginVertical:5,
      },
      input:{
        borderBottomColor:"#d3d3d3",
        borderBottomWidth:1,
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
        borderRadius:50,
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