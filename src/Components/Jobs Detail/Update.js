import { StyleSheet, Text, View , ScrollView, ActivityIndicator, Image, TextInput} from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../../Color'
const Update = () => {
  const [loading, setLoading]=useState(true)
    const data=[
        {
          heading:"Quote responsibility",
          text:"Admin test",
          date:'10-12-2023'
        },
        {
          heading:"Quote responsibility",
          text:"Admin test",
          date:'10-12-2023'
        },
        {
          heading:"Quote responsibility",
          text:"Admin test",
          date:'10-12-2023'
        },
        {
          heading:"Quote responsibility",
          text:"Admin test",
          date:'10-12-2023'
        },
        {
          heading:"Quote responsibility",
          text:"Admin test",
          date:'10-12-2023'
        },
        {
          heading:"Quote responsibility",
          text:"Admin test",
          date:'10-12-2023'
        },
        {
          heading:"Quote responsibility",
          text:"Admin test",
          date:'10-12-2023'
        },
        {
          heading:"Quote responsibility",
          text:"Admin test",
          date:'10-12-2023'
        },
        {
          heading:"Quote responsibility",
          text:"Admin test",
          date:'10-12-2023'
        },
        {
          heading:"Quote responsibility",
          text:"Admin test",
          date:'10-12-2023'
        },
    ]

     /* Remove this when fethc data */
    useEffect(()=>{
        setTimeout(() => {
           setLoading(false) 
        }, 1000);
    },[])

    
  return (
    <View style={styles.mainContainer}>
        
     {
        !loading ? 
        <View style={[styles.Container,{paddingBottom:100}]}>
            <ScrollView >
            {
                data.map((item,index)=>
                <View style={styles.individual}  key={index}>
                    <View>
                      <Image source={require('../../../assets/imgs/avator.png')} style={styles.Image} />
                    </View>
                    <View style={styles.textContainer} >
                        <Text>{item.heading}</Text>
                        <Text>{item.text}</Text>
                        <Text>{item.date}</Text>

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

export default Update

const styles = StyleSheet.create({
    mainContainer:{
       flexGrow:1  
    },
    Container:{
        height: '100%',
        backgroundColor:"white"
    },
    Indicator:
    {
         flexGrow:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        marginTop:"60%"
    },
    fetchingData:{
        color:'black',
        fontWeight:"bold"
    }
    ,individual:{
        display:"flex",
        flexDirection:"row",
        paddingHorizontal:5,
        paddingTop:5,
        borderBottomColor:"gray",
        borderBottomWidth:1,
        backgroundColor:"white"
    },
    Image:{
        width:75,
        height:75,
    },
    textContainer:{
        padding:10
    }
})