import React,{useState} from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { vh,vw } from '../utils/ScreenSize'
import ImagePickerComponent from '../Components/Picker/ImagePickerComponent'
const NewProblemReport = () => {
    const [data, setData] = useState({
        date: "",
        Subject: "",
        Job: "",
        Problem: "",
        Status: "",
        image:""
    })

    const handleData = (value, field)=> {
        setData({...data, [field]: value})
    }
  return (
    <View style={styles.container}>
        <ScrollView>
            <View style={styles.mainContainer}>
                    <View>
                        <Text style={styles.label}>Date</Text>
                        <TextInput value={data.date} style={styles.input} onChangeText={(text)=>handleData(text, 'date')} />
                    </View>
                    <View>
                        <Text style={styles.label}>Subject</Text>
                        <TextInput value={data.Subject} style={styles.input} onChangeText={(text)=>handleData(text, 'Subject')} />
                    </View>
                    <View>
                        <Text style={styles.label}>Job / Site</Text>
                        <TextInput value={data.Job} style={styles.input} onChangeText={(text)=>handleData(text, 'Job')} />
                    </View>
                    <View>
                        <Text style={styles.label}>Please describe the problem in detail bellow:</Text>
                        <TextInput value={data.Problem} style={styles.input2} multiline={true} numberOfLines={8} textAlignVertical="top" onChangeText={(text)=>handleData(text, 'Problem')} />
                    </View>
                    <View>
                        <Text style={styles.label}>Status</Text>
                        <TextInput value={data.Status} style={styles.input} onChangeText={(text)=>handleData(text, 'Status')} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ImagePickerComponent />
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity activeOpacity={0.6}>
                            <Text style={styles.submitTxt}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
        </ScrollView>
    </View>
  )
}

export default NewProblemReport

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    },
    mainContainer:{
        padding:20,
        display:"flex",
        gap:15,
        paddingBottom:70
    },
    label:{
        fontSize:15,
        fontWeight:"500"
    },
    input:{
        backgroundColor:'#DFE1ED',
        height:40,
        marginTop:5,
        borderRadius:7,
        paddingHorizontal:10,
    },
    input2:{
        backgroundColor:'#DFE1ED',
        height:150,
        marginTop:5,
        borderRadius:7,
        paddingHorizontal:10,
        paddingVertical:10,
    },
    btnContainer:{
        backgroundColor:"black",
        display:"flex",
        justifyContent:'center',
        alignItems:"center",
        marginBottom:3*vh,
        marginTop:1.4*vh,
        height:45,
        borderRadius:10,
    },
    submitTxt:{
        color:"white",
        fontSize:17,
    }
})