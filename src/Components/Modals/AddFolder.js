import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios';
import { vh,vw } from '../../utils/ScreenSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { URL } from '../../utils/Constant';
const AddFolder = ({toggleModal,setData,data}) => {
    const [Folder,setFolder]=useState("")

    const handleAdd=()=>{
        if(Folder){
          
          

              (async ()=>{
                const authToken = await AsyncStorage.getItem("token");
                if(!authToken){
                   navigation.navigate("LoginScreen")
                }
           
                axios.post(URL + "/files/savefolder",{},{
                    params: {
                        folderName: Folder,
                        fileresource_type: "project",
                        fileresource_id:data?.project_id
                    },
                     headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                  }
                )
                .then((res) => {
                   console.log(res.data.token);
                    toggleModal()
                    setData((preData)=>[...preData, {
                        FolderName:Folder,
                        images:[]
                      }])
                      Toast.show({
                      type: 'success',
                      text1: 'Folder added successfully!',
                       visibilityTime:1000,
                       topOffset:5,
                    });
                })
                .catch((err) => {
                  Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Folder did not add ',
                    visibilityTime:2000
                  });
                  console.log(err);
                })

            })()

         
            
        }else{
            Alert.alert("Enter Folder Name first")
        }
    }
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading} >Create Folder</Text>
      <View>
            <TextInput value={Folder} placeholder='Write Folder Name...' multiline={true} textAlignVertical="top"  numberOfLines={5} style={styles.discInput} onChangeText={(text)=>setFolder(text)}  />
      </View >
        <TouchableOpacity  style={styles.btnContainer} activeOpacity={0.6} onPress={()=>handleAdd()}>
            <Text style={styles.submitTxt} >Save</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AddFolder

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
        marginBottom:15
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
    }
})