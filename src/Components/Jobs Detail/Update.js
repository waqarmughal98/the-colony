import { StyleSheet, Text, View , ScrollView, ActivityIndicator, Image, TextInput} from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { URL } from '../../utils/Constant'
const Update = ({data,updateItem}) => {
  const [loading, setLoading]=useState(true)
  const [update, setUpdate] = useState([]);


  useEffect(()=>{
    (async ()=>{
      const authToken = await AsyncStorage.getItem('token');
      await axios.post(URL + '/comments/search', {
        
      }, {
        params:{
          project_id: data?.project_id,
          commentresource_type: "project",
          commentresource_id: data?.project_id,
        },
        headers:{
          Authorization: `Bearer ${authToken}`
        }
      }).then((res)=>{
        const responseData=res.data.comments.data.sort((a, b) => {
          const dateA = new Date(a.comment_created);
          const dateB = new Date(b.comment_created);
          return dateB - dateA;
      });
        setUpdate(responseData)
        setLoading(false) 
      }).catch((err)=>{
        console.log(err)
      })
    })()
  }, [updateItem])


  const stripHtmlTags = (html) => {
    return html?.replace(/<\/?[^>]+(>|$)/g, '') || '';
  };
    
  return (
    <View style={styles.mainContainer}>
     {
        !loading ? 
        <View style={styles.Container}>
            <ScrollView >
              <View style={[{paddingBottom:170}]}>
            {
              update.map((item,index)=>
                <View style={[styles.individual,{backgroundColor:index%2!=0? "#F0F4F7":"#FFE6AE"}]}  key={index}>
                  <View>
                    <Image source={require('../../../assets/imgs/avator.png')} style={styles.Image} />
                  </View>
                  <View style={styles.textContainer} >
                      <Text>{stripHtmlTags(item?.comment_text || "")}</Text>
                      <Text style={{fontWeight:"bold"}}>{`${item.first_name} ${item.last_name}`}</Text>
                      <Text style={{ fontStyle: 'italic'}}>{item?.comment_created?.slice(0,10)}</Text>
                  </View>
                </View>)
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

export default Update

const styles = StyleSheet.create({
    mainContainer:{
       flexGrow:1  
    },
    Container:{
        height: '100%',
        backgroundColor:"white",
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
      backgroundColor: '#FFE6AE',
      height: 100,
      marginHorizontal: 10,
      marginTop: 10,
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'row',
      padding:20,
      alignItems:"center",
    
    },
    Image:{
        width:60,
        height:60,
        borderRadius:100,
        marginLeft:-5
    },
    textContainer:{
        padding:10
    }
})