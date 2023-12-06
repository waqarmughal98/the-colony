import { StyleSheet, Text, View , ScrollView, ActivityIndicator, Image, TextInput} from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../../Color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { URL } from '../../utils/Constant'
const Update = ({data}) => {
  const [loading, setLoading]=useState(true)
  const [update, setUpdate] = useState([]);

  useEffect(()=>{
    (async ()=>{
      const param = {
        params:{
          project_id: data.project_id,
          ticketresource_type: "project",
          ticketresource_id: data.project_id,
        },
      }
      const authToken = await AsyncStorage.getItem('token');
      axios.post(URL + '/comments/search', {}, {
        param,
        headers:{
          Authorization: `Bearer ${authToken}`
        }
      }).then((res)=>{
        console.log(res.data.comments.data)
        setUpdate(res.data.comments.data)
      }).catch((err)=>{
        console.log(err)
      })
    })()
  }, [])
  
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
              update.map((item,index)=>
                <View style={styles.individual}  key={index}>
                  <View>
                    <Image source={require('../../../assets/imgs/avator.png')} style={styles.Image} />
                  </View>
                  <View style={styles.textContainer} >
                      <Text>{item.comment_text}</Text>
                      <Text>{`${item.first_name} ${item.last_name}`}</Text>
                      <Text>{item?.comment_created?.slice(0,10)}</Text>
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