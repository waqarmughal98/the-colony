import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
// import { vh,vw } from '../utils/ScreenSize'
import DateInput from '../Components/Date/DateInput';
// import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
// import SelectDropdown from 'react-native-select-dropdown'
// import ImagePickerComponent from '../Components/Picker/ImagePickerComponent'
import axios from 'axios';
import { URL } from '../utils/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ReplyTicket = ({navigation,route}) => {
    const { items, jobTitle, id, subject, ticketDetails } = route.params;
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    const [data, setData] = useState({
        date: getCurrentDate(),
        Subject: subject,
        Job: jobTitle,
        Problem: "",
    })

    const handleData = (value, field)=> {
        setData({...data, [field]: value})
    }


    const submitReply = async ()=>{
        const authToken = await AsyncStorage.getItem('token');
        await axios.post(URL + '/problemreports/' + id + '/postreply', {},  {
            params: {
                ticketreply_ticketid: id,
                ticketreply_text: data?.Problem,
            },
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }).then((res)=>{
            Toast.show({
                type: 'success',
                text1: 'Reply  submitted successfully!',
                text2: 'we are redirect you to previous screen',
                 visibilityTime:1000,
                 topOffset:5
              });
            setTimeout(() => {
                navigation.navigate('problem-report-replies',{id:id,reply:data, ticketDetail: ticketDetails})  
            }, 1000);
            
        }).catch((err)=>{
            console.log(err)
            Toast.show({
                type: 'error',
                text1: 'Error while subitting!',
                 visibilityTime:1000,
                 topOffset:5
              });
        })
    }
   
  return (
    <View style={styles.container}>
        <ScrollView>
            <View style={styles.mainContainer}>
                <View>
                    <Text style={[styles.label,{marginBottom:5}]}>Date</Text>
                    <View>
                        <DateInput editable={true} style={styles.input}  setData={setData} name="replyTicket"   />
                    </View>
                </View>
                <View>
                    <Text style={styles.label}>Subject</Text>
                    <TextInput value={data.Subject} style={styles.input} onChangeText={(text)=>handleData(text, 'Subject')} />
                </View>
                <View>
                    <Text style={styles.label}>Job / Site</Text>
                    <View style={styles.dateInput}>
                        <Text>{data.Job}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.label}>Please describe the problem in detail bellow:</Text>
                    <TextInput value={data.Problem} style={styles.input2} multiline={true} numberOfLines={8} textAlignVertical="top" onChangeText={(text)=>handleData(text, 'Problem')} />
                </View>
                    <TouchableOpacity activeOpacity={0.6} onPress={submitReply}>
                        <View style={styles.btnContainer}>
                                <Text style={styles.submitTxt}>Reply</Text>
                        </View>
                    </TouchableOpacity>
            </View> 
        </ScrollView>
        <Toast/>
    </View>
  )
}

export default ReplyTicket

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
        fontFamily: "Sommet-Regular",
    },
    input:{
        backgroundColor:'#DFE1ED',
        height:40,
        marginTop:5,
        borderRadius:7,
        paddingHorizontal:10,
        fontFamily: "Sommet-Regular",
    },
    dateInput:{
        backgroundColor:'#DFE1ED',
        height:40,
        marginTop:5,
        borderRadius:7,
        paddingHorizontal:10,
        display:"flex",
        fontFamily: "Sommet-Regular",
        justifyContent:"center"
    },
    input2:{
        backgroundColor:'#DFE1ED',
        height:150,
        marginTop:5,
        fontFamily: "Sommet-Regular",
        borderRadius:7,
        paddingHorizontal:10,
        paddingVertical:10,
    },
    btnContainer:{
        backgroundColor:"black",
        display:"flex",
        justifyContent:'center',
        alignItems:"center",
        height:45,
        fontFamily: "Sommet-Regular",
        borderRadius:10,
    },
    submitTxt:{
        color:"white",
        fontFamily: "Sommet-Regular",
        fontSize:17,
    }
})