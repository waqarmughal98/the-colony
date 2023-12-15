import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { vh,vw } from '../utils/ScreenSize'
import DateInput from '../Components/Date/DateInput';
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import ImagePickerComponent from '../Components/Picker/ImagePickerComponent'
import axios from 'axios';
import { URL } from '../utils/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ReplyTicket = ({navigation,route}) => {
    const { items, jobTitle } = route.params;
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    const [data, setData] = useState({
        date: getCurrentDate(),
        Subject: "",
        Job: jobTitle,
        Problem: "",
    })

    const handleData = (value, field)=> {
        setData({...data, [field]: value})
    }

    const submitReply = async ()=>{
        const authToken = await AsyncStorage.getItem('token');
        await axios.post(URL + '/problemreports/' + items?.ticket?.ticket_id + '/postreply', {},  {
            params: {
                ticketreply_ticketid: items?.ticket?.ticket_id,
                ticketreply_text: data?.Problem,
            },
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }).then((res)=>{
            console.log(res.data);
            setData('')
        }).catch((err)=>{
            console.log(err)
        })
    }
   
    useEffect(()=>{
        console.log(items,"items....")
    },[items])
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
        fontWeight:"500"
    },
    input:{
        backgroundColor:'#DFE1ED',
        height:40,
        marginTop:5,
        borderRadius:7,
        paddingHorizontal:10,
    },
    dateInput:{
        backgroundColor:'#DFE1ED',
        height:40,
        marginTop:5,
        borderRadius:7,
        paddingHorizontal:10,
        display:"flex",
        justifyContent:"center"
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
        height:45,
        borderRadius:10,
    },
    submitTxt:{
        color:"white",
        fontSize:17,
    }
})