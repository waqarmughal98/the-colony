import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../../Color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
const Team = ({ data }) => {
  const [loading, setLoading]=useState(true)

  useEffect(()=>{
    // (async ()=>{
    //   const authToken = await AsyncStorage.getItem('token');
    // })()
  }, [])

  const [items, setItems] = useState([{
      label:"Quote Responsibility",
      value: data?.qoute_responsible,
    },{
      label:"Site Manager",
      value: data?.site_manager
    },{
      label:"Project Manager",
      value: data?.project_manager
    },{
      label:"Project",
      value: data?.job_owner
    },{
      label:"Team",
      value: data?.team
    }
  ])

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
          {
            items.map((item,index)=>
            <View key={index} style={styles.individualContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.value}</Text>
              </View>
            </View>)
          }
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