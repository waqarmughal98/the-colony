import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React,{useState} from 'react'
import { vh,vw } from '../../utils/ScreenSize'
const AddFolder = ({toggleModal,setData}) => {
    const [Folder,setFolder]=useState("")

    const handleAdd=()=>{
        if(Folder){
          
            setData((preData)=>[...preData, {
                FolderName:Folder,
                images:[]
              }])
              toggleModal()
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