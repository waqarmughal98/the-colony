import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity,Alert } from 'react-native'
import React,{useState} from 'react'
import { vh,vw } from '../../utils/ScreenSize'
import axios from "axios";
import { URL } from "../../utils/Constant";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
 
const UpdateModal = ({data,toggleModal,setUdateItem}) => {
    const [Update,setUpdate]=useState("")
    const [Error,setError]=useState("")
    const handleSubmit= async()=>{
        const authToken = await AsyncStorage.getItem("token");
       if(Update!="")
       {
        axios.post(URL + "/comments/store", {}, {
            params: {
              project_id: data?.project_id,
              commentresource_type: "project",
              comment_text:Update,
              commentresource_id: data?.project_id,
            },
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        ).then((res) => {
            toggleModal()
            Toast.show({
            type: 'success',
            text1: 'Update added Successfully!',
            text2: 'Great!',
             visibilityTime:2000
          });
          setUdateItem(Update)
            setError("");
        }).catch((err) => {
          console.log(err);
        });
       }else{
        setError("Kindly enter some update test")
       }
    }
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading} >Add Update</Text>
      <View>
            <TextInput value={Update} placeholder='Write an Update...' multiline={true} textAlignVertical="top"  numberOfLines={14} style={styles.discInput} onChangeText={(text)=>{setUpdate(text); setError("")}}  />
      </View >
       {Error!="" && <Text style={styles.error}>{Error}</Text>}
        <TouchableOpacity style={styles.btnContainer} activeOpacity={0.6} onPress={()=>handleSubmit()}>
            <Text style={styles.submitTxt}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}

export default UpdateModal

const styles = StyleSheet.create({
    mainContainer:{
        width:"100%",
        paddingHorizontal:20
    },
    heading:{
        fontSize:19,
        color:"white",
        fontWeight:"700",
        textAlign:"center",
        marginBottom:10
    },
    label:{
        fontSize:16,
        marginBottom:10,
        
    },
    discInput:{
        width:"100%",
        backgroundColor:"white",
        borderRadius:10,
        padding:12,
    },
    titleInput:{
        height:45,
        width:"100%",
        backgroundColor:"white",
        borderRadius:10,
        paddingHorizontal:15,
        marginBottom:15
    },
    btnContainer:{
        backgroundColor:"black",
        display:"flex",
        justifyContent:'center',
        alignItems:"center",
        marginBottom:1*vh,
        marginTop:2.4*vh,
        height:45,
        borderRadius:10,
    },
    submitTxt:{
        color:"white",
        fontSize:17,
    },
    error:{
        textAlign:"center",
        marginTop:10,
        marginBottom:-10,
        color:"white"
    }
})