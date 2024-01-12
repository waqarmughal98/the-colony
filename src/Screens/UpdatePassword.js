import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome5, Foundation } from '@expo/vector-icons';
import { vh } from '../utils/ScreenSize';
import Color from '../Color';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { URL } from "../utils/Constant";

const UpdatePassword = ({navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isvalidation=()=>{
    if(newPassword=='' || confirmPassword==''){
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'kindly enter password',
         visibilityTime:1000,
         topOffset:5,
      });
    
      return false
    }
    else if (newPassword!=confirmPassword){
      Toast.show({
        type: 'error',
        text1: 'Password not match!',
        text2: 'kindly check your passwords',
         visibilityTime:1000,
         topOffset:5,
      });
      return false
    }

    return true
    }


  const UpdatePass=()=>{
    if(isvalidation()==true){
      (async () => {
        const authToken = await AsyncStorage.getItem("token");
        await axios.post(URL + "/update-password", {
          password: newPassword,
          password_confirmation: newPassword,
        }, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        ).then((res) => {
          Toast.show({
            type: 'success',
            text1: 'Password Updated Successfully!',
            text2: 'We are redirecting to Dashboard',
            visibilityTime:500,
            topOffset:5,
          });
          setTimeout(() => {
            navigation.navigate("Dashboard")
          }, 500);
         
        }).catch((err) => {
          console.log(err);
        });
      })();
    }
    
  }

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.individual, { marginTop: 20 }]}>
        <View style={styles.topIndividual}>
          <View style={styles.topArea}>
            <View style={styles.iconContainer}>
              <Foundation style={styles.icon} name="lock" size={20} color="black" />
            </View>
            <Text style={styles.iconText}>New Password</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={(txt) => setNewPassword(txt)}
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity onPress={toggleShowNewPassword}>
            <FontAwesome5 style={styles.eyeIcon} name={showNewPassword ? 'eye' : 'eye-slash'} size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.individual}>
        <View style={styles.topIndividual}>
          <View style={styles.topArea}>
            <View style={styles.iconContainer}>
              <Foundation style={styles.icon} name="lock" size={20} color="black" />
            </View>
            <Text style={styles.iconText}>Confirm Password</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={(txt) => setConfirmPassword(txt)}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={toggleShowConfirmPassword}>
            <FontAwesome5 style={styles.eyeIcon} name={showConfirmPassword ? 'eye' : 'eye-slash'} size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.btn} onPress={UpdatePass} activeOpacity={0.6}>
        <Text style={styles.btnText}>Update Password</Text>
      </TouchableOpacity>
      <Toast/>
    </View>
  );
};

export default UpdatePassword;



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
      inputContainer:{
        borderBottomColor:"#d3d3d3",
        borderBottomWidth:1,
        display:"flex",
        alignItems:'center',
        flexDirection:"row",
        alignItems:"center",
        paddingBottom:5
      },
      input:{
        flex:1
      },
      topIndividual:{
         display:"flex",
         flexDirection:"row",
         alignItems:"center",
         justifyContent:"space-between",
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
      },
      btn:{
        backgroundColor:Color.darkOrange,
        borderRadius:20,
        paddingVertical:10,
        marginHorizontal:30,
        marginTop:20
      },
      btnText:{
        textAlign:"center",
        color:"white",
        fontWeight:"bold",
        fontSize:15
      },
      topArea:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center'
      }
})