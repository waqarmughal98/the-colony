import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios';
import { vh,vw } from '../../utils/ScreenSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { URL } from '../../utils/Constant';
const AddFolder = ({toggleModal,setData,data,items}) => {
    const [Folder,setFolder]=useState("")
    const [error,setError]=useState("")


    const checkFolder=()=>{
        let result=false
         items.forEach((item)=>{
            if(item.file_group_name==Folder){
                Toast.show({
                    type:'error',
                    text1: 'Folder name already exist!',
                    text2: 'kindly change name of folder!',
                     visibilityTime:1000,
                     topOffset:5,
                  }); 
                  result= true
                  setError('Folder name already exist!')
            }
        })
        return result
    }
    const handleAdd=()=>{

        if(Folder && checkFolder()==false){

              (async ()=>{
                const authToken = await AsyncStorage.getItem("token");
                if(!authToken){
                   navigation.navigate("LoginScreen")
                }
           
                axios.post(URL + "/filegroups/savefolder",{},{
                    params: {
                        filefolder_name: Folder,
                        fileresource_type: "project",
                        fileresource_id:data?.project_id
                    },
                     headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                  }
                )
                .then((res) => {
                    toggleModal()
                    setData((preData)=>[...preData, {
                        FolderName:Folder,
                        images:[]
                      }])
                      setFolder("")
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

         
            
        }else if(Folder==""){
            Alert.alert("Enter Folder Name first")
        }
    }
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading} >Create Folder</Text>
      <View>
            <TextInput value={Folder} placeholder='Write Folder Name...' multiline={true} textAlignVertical="top"  numberOfLines={5} style={styles.discInput} onChangeText={(text)=>setFolder(text)}  />
      </View >
      {
        error && <Text style={{textAlign:"center",color:'red',fontWeight:'600',marginTop:5}}>{error}</Text>
      }
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
        fontFamily: "Sommet-Black",
        textAlign:"center",
        marginBottom:15
    },
    label:{
        fontSize:16,
        fontFamily: "Sommet-Regular",
        marginBottom:10,
        
    },
    discInput:{
        width:"100%",
        backgroundColor:"white",
        fontFamily: "Sommet-Regular",
        borderRadius:10,
        padding:12,
    },
    titleInput:{
        height:45,
        width:"100%",
        backgroundColor:"white",
        borderRadius:10,
        fontFamily: "Sommet-Regular",
        paddingHorizontal:15,
        marginBottom:15
    },
    btnContainer:{
        backgroundColor:"black",
        display:"flex",
        justifyContent:'center',
        alignItems:"center",
        marginBottom:1*vh,
        marginTop:1.2*vh,
        height:45,
        borderRadius:10,
    },
    submitTxt:{
        color:"white",
        fontFamily: "Sommet-Regular",
        fontSize:17,
    }
})