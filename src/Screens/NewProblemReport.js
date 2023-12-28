import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { vh,vw } from '../utils/ScreenSize'
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import ImagePickerComponent from '../Components/Picker/ImagePickerComponent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { URL } from '../utils/Constant';
const NewProblemReport = ({navigation,route,Data}) => {
    const { items } = route.params;
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
        Job: "",
        Problem: "",
        Status: "",
        image:""
    })

    const handleData = (value, field)=> {
        setData({...data, [field]: value})
        console.log(data);
    }

    useEffect(()=>{
        console.log(items.project_clientid,"client")
    }, [items])

    const submitProblem = async ()=>{
        if(items && data.Subject!="" && data.Problem!=""){
            const authToken = await AsyncStorage.getItem('token');
        const param = {
            params:{
                ticket_created: getCurrentDate(),
                ticket_clientid:items.project_clientid,
                ticket_projectid: items.project_id,
                ticket_subject:data.Subject,
                ticket_message:data.Problem,
                ticket_priority:"normal",
                ticket_client_visibility:"0",
                ticket_categoryid:9,
            },
        }
        axios.post(URL + '/problemreports/store', {
            params : param.params,
            headers:{
                Authorization: `Bearer ${authToken}`
            }
        }).then((res)=>{
            console.log(res.data)
            Toast.show({
                type: 'success',
                text1: 'Report Submitted Successfully',
                text2: '',
                visibilityTime:2000,
                topOffset: 5,
              });
        }).catch((err)=>{
            console.log(err)
        })}
        else{
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Kindly fill all the data',
                visibilityTime:2000,
                topOffset: 5,
              });
        }
    }

    const dataOption=['Open','On Hold','Answered','Closed']
  return (
    <View style={styles.container}>
        <ScrollView>
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.label}>Date</Text>
                    <View style={styles.dateInput} >
                        <Text >{data.date}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.label}>Subject</Text>
                    <TextInput value={data.Subject} style={styles.input} onChangeText={(text)=>handleData(text, 'Subject')} />
                </View>
                <View>
                    <Text style={styles.label}>Job / Site</Text>
                    <View style={styles.dateInput} >
                        <Text >{items.project_title}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.label}>Please describe the problem in detail bellow:</Text>
                    <TextInput value={data.Problem} style={styles.input2} multiline={true} numberOfLines={8} textAlignVertical="top" onChangeText={(text)=>handleData(text, 'Problem')} />
                </View>
                <View>
                    <Text style={styles.label}>Status</Text>
                    <SelectDropdown
                        data={dataOption}
                        buttonStyle={{height:vh*5,width:vw*90,backgroundColor:'#DFE1ED',borderRadius:10}}
                        dropdownStyle={{marginTop: -(vh*4),fontSize:12}}
                        buttonTextStyle={{fontSize:15}}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#5A5A5A'} size={14} />;
                        }}
                        defaultValue={dataOption[0]}
                        onSelect={(selectedItem, index) => {
                            (text)=>handleData(text, 'Status')
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ImagePickerComponent />
                </View>
                    <TouchableOpacity style={styles.btnContainer} activeOpacity={0.6} onPress={()=>{submitProblem()}}>
                        <Text style={styles.submitTxt}>Report Problem</Text>
                    </TouchableOpacity>
            </View> 
        </ScrollView>
                <Toast/>
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