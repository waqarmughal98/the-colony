import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { vh,vw } from '../../utils/ScreenSize'
const NoteModal = () => {
    const [Title,setTitle]=useState("")
    const [Discription, setDiscription] = useState();
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading} >Add My Notes</Text>
      <View>
            <Text style={styles.label}>Title</Text>
            <TextInput value={Title} style={styles.titleInput}  onChangeText={(text)=>setTitle(text)} />
        </View >
      <View>
            <Text style={styles.label}>Discrition</Text>
            <TextInput value={Discription} multiline={true} textAlignVertical="top"  numberOfLines={6} style={styles.discInput} onChangeText={(text)=>setDiscription(text)}  />
      </View >
        <View style={styles.btnContainer}>
            <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.submitTxt}>Submit</Text>
            </TouchableOpacity>
        </View>
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
    }
})