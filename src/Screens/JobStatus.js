import { StyleSheet, Text, View , ScrollView, ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import { vh,vw } from '../utils/ScreenSize'
import Color from '../Color'
const JobStatus = () => {
  const [loading, setLoading]=useState(true)
  

     /* Remove this when fethc data */
    useEffect(()=>{
        setTimeout(() => {
           setLoading(false) 
        }, 1000);
    },[])
    
    const data=[0,0,0,0]
  return (
    <View style={styles.mainContainer}>
        
     {
        !loading ? 
        <View style={styles.Container}>
            <ScrollView>
                <View style={styles.allData} >
                   {
                    data.map((item,index)=>
                         <View key={index} style={styles.individual}>
                            <View style={styles.left}>
                                <Text style={styles.leftText1}>JobStatus</Text>   
                                <Text style={styles.leftText2}>Assigned to me : 4</Text> 
                            </View>
                            <View style={styles.right}>   
                                <Text style={styles.rightText}>2</Text> 
                            </View>  
                        </View> 
                     )
                   }
                </View>
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

export default JobStatus

const styles = StyleSheet.create({
    mainContainer:{
       flex:1 
    },
    Container:{
        flex:1,
        backgroundColor:Color.brightOrange
    },
    Indicator:
    {
         flexGrow:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        marginTop:vh*37
    },
    fetchingData:{
        color:'black',
        fontWeight:"bold"
    },
    individual:{
        backgroundColor: 'white',
        marginHorizontal:15,
        borderRadius:7,
        height:9*vh,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:15
    },
    allData:{
        display:"flex",
        gap:15,
        marginTop:15
    },
    leftText1:{
        fontSize:16,
        fontWeight:"600"
    },
    leftText2:{
        fontSize:12
    },
    right:{
        height:35,
        width:35,
        backgroundColor: Color.brightOrange,
        borderRadius:20,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'center'
    },
    rightText:{
   
         fontSize:16,
         fontWeight:"bold",
    
    }
})