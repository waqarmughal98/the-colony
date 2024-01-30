import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Color from '../../Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../../utils/Constant';
import { vh } from '../../utils/ScreenSize';
const Logs = ({data, screenName}) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([])

  /* Remove this when fethc data */
  useEffect(() => {
    (async ()=>{
      const authToken = await AsyncStorage.getItem('token');
      if(screenName == "notification" || screenName == "LatestActivity"){
        await axios.get(URL + '/notification', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }).then((res)=>{
          setItems(res.data.events.data)
          setLoading(false);
        }).catch((err)=>{
          console.log(err);
          setLoading(false);
        })
      } else{
        await axios.get(URL + '/job-activity/' + data?.project_id, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }).then((res)=>{
          setItems(res.data.logs)
          setLoading(false);
        }).catch((err)=>{
          console.log(err);
          setLoading(false);
        })
      }
    })()
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      {!loading ? (
        <View style={styles.Container}>
          {items.map((item, index) => {
            const update = item?.event_item_lang.replace(/_/g, ' ');
            return(
              <View style={[styles.individual,{backgroundColor:index%2!=0? "#F0F4F7":"#FFE6AE"}]} key={index}> 
                <View style={styles.individual_left}>
                  <Image
                    source={require('../../../assets/imgs/perosn.png')}
                    style={styles.Image}
                  />
                </View>
                <View style={styles.individual_right}>
                  <View style={styles.text1container}>
                    <Text style={styles.text1}>{screenName == "notification" ? item?.first_name : item?.creator?.first_name}</Text>
                    <Text>on {item?.event_created?.slice(0, 10)} </Text>
                  </View>
                  <Text style={styles.text2}>{update}</Text>
                  <Text style={styles.text3}>{item?.event_parent_title}</Text>
                  <View style={styles.updateBg}>
                    <Text style={[styles.text4,{ backgroundColor: index%2==0 ?"#F0F4F7": '#DEE1EC' }]}>
                      {item?.event_item_content}
                    </Text>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      ) : (
        <View style={styles.Indicator}>
          <ActivityIndicator size="large" color={'black'} />
          <Text style={styles.fetchingData}>Fetching Data</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Logs;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  Container: {
    height: '100%',
    backgroundColor: 'white',
    paddingBottom:170
  },
  Indicator: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '60%',
  },
  fetchingData: {
    color: 'black',
    fontWeight: 'bold',
  },
  individual: {
    backgroundColor: '#FFE6AE',
    paddingBottom:10,
    paddingHorizontal:20,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',

  },
  updateBg:{
    alignSelf: 'flex-start'
  },
  text4: {
    padding: 8,
    borderRadius: 5,
  },
  individual_left: {
    flex: 0.3,
    alignItems: 'center',
    marginTop: 20,
  },
  individual_right: {
    flex: 0.7,
    padding: 10,
  },
  text1container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent:"center",
    marginVertical:8,
    alignItems:"center"
  },
  text1: {
    marginRight: 5,
    color: Color.darkOrange,
  },
  text2: {
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  text3: {
    marginBottom: 8,
    color: Color.darkOrange,
  },
});
