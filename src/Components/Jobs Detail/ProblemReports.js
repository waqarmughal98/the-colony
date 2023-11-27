import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../../Color'
const ProblemReports = () => {
  const [loading, setLoading]=useState(true)
    const data=[
        {
          heading:"Quote responsibility",
          text:"Admin test"
        }
    ]

     /* Remove this when fethc data */
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
         <Text style={{color:"black"}}>ProblemReports</Text>   
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

export default ProblemReports

const styles = StyleSheet.create({

    Container:{
        height: '100%',
        backgroundColor:Color.brightOrange
    },
    Indicator:
    {
        height: '90%',
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center"
    },
    fetchingData:{
        color:'black',
        fontWeight:"bold"
    }
})