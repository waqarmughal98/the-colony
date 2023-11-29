import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import Color from '../Color';
import { URL } from '../utils/Constant';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AllJobs = ({navigation}) => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        (async ()=>{
            const authToken = await AsyncStorage.getItem("token");
            console.log(authToken)
            axios.get(URL + '/task/all',{
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }).then((res)=>{
                console.log('tasks', res.data.tasks.data);
                setData(res.data.tasks.data);
            }).catch((err)=>{
                console.log(err);
            })
        })()
    },[])
    
  return (
    <View style={styles.mainContainer}>
         {/* Header */}
          <View style={styles.containerHeader}>
            <Text style={styles.text}>Job Name</Text>
            <Text style={[styles.text2]}>Company</Text>
          </View>
          {/* All Data */}
          <View style={styles.dataContainer}>
            <ScrollView>
              {
                data.map((item,index)=>
                {
                    return(
                        <TouchableOpacity onPress={()=>navigation.navigate("jobs-detail",{items: item})} activeOpacity={0.6} key={index}>
                            <View style={[styles.individual,{backgroundColor:index%2==0 ? '#D2CBBC' : '#F2F1CF'}]}>
                            <Text style={styles.dataText}>{item.task_title}</Text>
                            <Text style={styles.dataText2}>{item.project_title}</Text> 
                            <MaterialIcons name={'keyboard-arrow-right'} size={28} color="black" />
                            </View>
                        </TouchableOpacity>
                    )
                })
              }
            </ScrollView>
          </View>
      
    </View>
  )
}

export default AllJobs

const styles = StyleSheet.create({
    containerHeader:{
        backgroundColor:"black",
        height:45,
        display:"flex",
        flexDirection:"row",
        paddingHorizontal:20,
        alignItems:"center"
    },
    text:{
        fontSize:16,
        color:'white',
        fontWeight:'bold',
        flex:0.25
    },
    text2:{
        fontSize:16,
        color:'white',
        fontWeight:'bold',
        flex:0.75,
        textAlign:"center"
    },
    dataText:{
        fontSize:14,
        color:'black',
        flex:0.4
    },
    dataText2:{
        fontSize:14,
        color:'black',
        flex:0.6,
        textAlign:"center"
    },
    individual:{
        height:45,
        display:"flex",
        flexDirection:'row',
        alignItems:"center",
        paddingHorizontal:20,
        borderBottomColor:Color.brightOrange,
        borderBottomWidth:1
    },

})