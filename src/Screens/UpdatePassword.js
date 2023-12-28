import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome5, Foundation } from '@expo/vector-icons';
import { vh } from '../utils/ScreenSize';
import Color from '../Color';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.individual, { marginTop: 20 }]}>
        <View style={styles.topIndividual}>
            <View style={styles.topArea}>
                <View style={styles.iconContainer}>
                    <FontAwesome5 style={styles.icon} name="user-lock" size={14} color="black" />
                </View>
                <Text style={styles.iconText}>Old Password</Text>
            </View>
         
        </View>
          <View style={styles.inputContainer} >
            <TextInput
            style={styles.input}
            value={oldPassword}
            onChangeText={(txt) => setOldPassword(txt)}
            secureTextEntry={!showOldPassword}
            />
            <TouchableOpacity onPress={toggleShowOldPassword}>
                <FontAwesome5 style={styles.eyeIcon} name={showOldPassword ? 'eye' : 'eye-slash'} size={16} color="black" />
            </TouchableOpacity>
          </View>
      </View>

      <View style={styles.individual}>
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

      <TouchableOpacity style={styles.btn} activeOpacity={0.6}>
        <Text style={styles.btnText}>Update Password</Text>
      </TouchableOpacity>
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