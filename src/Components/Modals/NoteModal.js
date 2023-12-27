import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity,Alert } from 'react-native'
import React,{useState} from 'react'
import { vh,vw } from '../../utils/ScreenSize'
import axios from "axios";
import { URL } from "../../utils/Constant";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
 
const NoteModal = ({data,toggleModal,saveNote}) => {
    const [Title, setTitle]=useState("")
    const [Description, setDescription] = useState("");
    const [Error,setError]=useState("")
    const handleSubmit= async()=>{
        const authToken = await AsyncStorage.getItem("token");
       if(Title!="" && Description != "")
       {
        axios.post(URL + "/notes/store", {}, {
            params: {
                project_id: data?.project_id,
                noteresource_type: "project",
                note_title:Title,
                note_description:Description,
                noteresource_id: data?.project_id,
            },
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        ).then((res) => {
            toggleModal()
            saveNote(Title,Description)
            Toast.show({
            type: 'success',
            text1: 'Note added Successfully!',
            text2: 'Great!',
             visibilityTime:2000
          });
            setError("");
        }).catch((err) => {
          console.log(err);
        });
       }else{
        if(Title==""){
            setError("Kindly Enter Title")
        }
        else if (Description==""){
            setError("Kindly Enter Description")
        }
       }
    }
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading} >Add My Notes</Text>
      <View>
            <Text style={styles.label}>Title:</Text>
            <TextInput value={Title} style={styles.titleInput}  onChangeText={(text)=>setTitle(text)} />
        </View>
      <View>
            <Text style={styles.label}>Description:</Text>
            <TextInput value={Description} multiline={true} textAlignVertical="top"  numberOfLines={6} style={styles.discInput} onChangeText={(text)=>setDescription(text)}  />
      </View>
       {Error!="" && <Text style={styles.error}>{Error}</Text>}
        <TouchableOpacity style={styles.btnContainer} activeOpacity={0.6} onPress={()=>handleSubmit()}>
            <Text style={styles.submitTxt}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}

export default NoteModal

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