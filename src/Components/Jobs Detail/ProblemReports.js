import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity , ScrollView  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import Color from '../../Color'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../../utils/Constant';
import { vw,vh } from '../../utils/ScreenSize';
const ProblemReports = ({navigation, data,ID}) => {
  const [loading, setLoading]=useState(true)
  const [items, setItems] = useState([]);

  useEffect(()=>{
    (async ()=>{
      const authToken = await AsyncStorage.getItem('token');
      await axios.post(URL + '/problemreports', {}, {
        params:{
          project_id: data?.project_id,
          ticketresource_type: "project",
          ticketresource_id: data?.project_id,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then((res)=>{
        setItems(res.data.tickets.data)
        setLoading(false) 
      }).catch((err)=>{
        console.log(err);
      })
    })()
  },[ID])

    
  return (
    <View>    
     {
        !loading ? 
        <View style={styles.Container}>
          <View style={styles.headerContainer}> 
            <Text style={styles.text1}>Subject</Text>
            <Text style={styles.textDate}>Date</Text>
            <Text style={styles.text2}>Job Name</Text>
          </View>   
          {/* All Data */}
          <View style={styles.allData}>
            <ScrollView style={{flexGrow:1}}>
              <View style={{paddingBottom:80}}>
              {
                items.length > 0 ?  
                (
                  items?.map((item,index)=>{
                    console.log(item,"item")
                    return(
                      <TouchableOpacity onPress={()=>navigation.navigate("problem-report-replies", {id: item.ticket_id, jobTitle: item.project_title})} activeOpacity={0.6} key={index}>
                        <View style={[styles.mainIndividual,{backgroundColor:index%2==0 ? '#D2CBBC' : '#F2F1CF'}]}>
                          <View style={styles.individual}>
                            <Text style={styles.dataText}>{item.ticket_subject}</Text>
                            <Text style={styles.dataTextMiddle}>{item.project_date_start || "N/A"}</Text>
                            <Text style={styles.dataText2}>{item.project_title}</Text> 
                            <MaterialIcons name={'keyboard-arrow-right'} size={28} color="black" />
                          </View>
                          {item.ticket_status && <Text style={styles.opentext}>{item.ticket_status}</Text>}
                        </View>
                      </TouchableOpacity>
                    )
                  })
                )
                :
                (
                  <Text style={styles.noRecord}>No Record Found</Text>
                )
                
              }
              </View>
            </ScrollView>
          </View>
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
        backgroundColor:"white"
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
    },
    headerContainer:{
      backgroundColor:"black",
      height:45,
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      paddingHorizontal:20,
    },
    text1:{
      color:Color.brightOrange,
      flex:0.5,
    },
    textDate:{
      color:Color.brightOrange,
      flex:0.5,
      textAlign:'center'
    },
    text2:{
      color:Color.brightOrange,
      flex:1,
      marginLeft:10,
      textAlign:"center"
    },
    mainIndividual:{
      paddingHorizontal:20,
      borderBottomColor:Color.brightOrange,
      borderBottomWidth:1
    },
    individual:{
      height:45,
      display:"flex",
      flexDirection:'row',
      alignItems:"center",
    
  },
  dataText:{
    fontSize:14,
    color:'black',
    flex:0.4
  },
  dataTextMiddle:{
    fontSize:14,
    color:'black',
    flex:0.4,
    textAlign:'center'
  },
  dataText2:{
      fontSize:14,
      color:'black',
      flex:0.6,
      textAlign:"center"
  },
  opentext:{
    color:"#FE98A9",
    paddingBottom:7,
    marginTop:-10
  },
  allData:{
    paddingBottom:140
  },
  noRecord:{
    color: "black",
    fontSize: 22,
    width: vw * 100,
    height: vh * 100,
    textAlign: "center",
    paddingVertical: vh * 25,
    fontWeight: "bold",
  }

})