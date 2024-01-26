import { StyleSheet, Text, View ,ScrollView, ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../../Color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { URL } from '../../utils/Constant'
const Team = ({ data }) => {
  const [loading, setLoading]=useState(true)
  const [items, setItems] = useState()

  useEffect(()=>{
    (async ()=>{
      const authToken = await AsyncStorage.getItem('token');
      await axios.get(URL + '/team/' + data.task_projectid, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).then((res)=>{
        const response = res.data;
        setItems([{
          label:"Quote Responsibility",
          value: response?.qoute_responsible,
        },{
          label:"Site Manager",
          value: response?.site_manager
        },{
          label:"Project Manager",
          value: response?.project_manager
        },{
          label:"Project Owner",
          value: response?.job_owner
        },{
          label:"Team",
          value: response?.team
        }])

      }).catch((err)=>{
        console.log(err)
      })
    })()
  }, [])

  /* Remove this when fetch data */
  useEffect(()=>{
    setTimeout(() => {
      setLoading(false) 
    }, 1000);
  },[])
    
  return (
    <View>
     {
      !loading ? 
        <View style={styles.Container}>
          <ScrollView   showsVerticalScrollIndicator={false}>
          {
            items.map((item,index)=>
            <View key={index} style={styles.individualContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.label=="Project Manager" || item.label=="Site Manager" ?`${item.value.first_name} ${item.value.last_name}`:item.value}</Text>
              </View>
            </View>)
          }
          </ScrollView>
        </View>
      :
        <View style={styles.Indicator}>
          <ActivityIndicator size="large" color={"black"} />
          <Text style={styles.fetchingData}>Fetching Data</Text>
        </View>
     }
    </View>
  )
}

export default Team

const styles = StyleSheet.create({
  Container:{
    height: '100%',
    paddingHorizontal:30,
    paddingBottom:50,
    backgroundColor:Color.brightOrange
  },
  Indicator:{
    height: '90%',
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center"
  },
  fetchingData:{
    color:'black',
    fontWeight:"bold"
  },
  label:{
    fontSize:16,
    fontWeight:"400",
    marginLeft:15
  },
  textContainer:{
    backgroundColor:"white",
    borderRadius:100,
    paddingVertical:10,
    display:"flex",
    justifyContent:"center",
    alignContent:"center",
    width:"100%",
    paddingHorizontal:20,
    marginTop:8,
  },
  text:{
    color:'black',
  },
  individualContainer:{
    marginTop:30
  }
})