import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../../Color'
const Team = () => {
  const [loading, setLoading]=useState(true)
  const [data, setData] = useState([
    {
      label:"Quote Responsibility",
      text:"Admin test"
    },
    {
      label:"Site Manager",
      text:"Admin test"
    },
    {
      label:"Project Manager",
      text:"Admin test"
    },
    {
      label:"Projecet",
      text:"Test "
    },
    {
      label:"Team",
      text:"Admin test lkdsjlk lksadj lksadj ksald jk dsaj sadlkjdsa asldkjdsa  "
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
            data.map((item,index)=>
            <View key={index} style={styles.individualContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.text}</Text>
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
      
    
  },
  individualContainer:{
    marginTop:30
  }
})