import { StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';
import React, { useState, useEffect } from 'react'
import Color from '../../Color';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../../utils/Constant';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Notes = ({data}) => {
  const headerOption = ['Title', 'Description', 'Date'];
  const [loading, setLoading]=useState(true)
  const [notes, setNotes] = useState([]);

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
      axios.post(URL + '/notes/search', {}, {
        param,
        headers:{
          Authorization: `Bearer ${authToken}`
        }
      }).then((res)=>{
        console.log(res.data.notes.data)
        setNotes(res.data.notes.data)
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
    <>
      {!loading ? (
        <View style={styles.container}>
          <View style={styles.header}>
            {headerOption.map((item, index) => (
              <Text
                style={[
                  styles.headerText,
                  { textAlign: index == 2 ? 'right' : 'left' },
                ]}
                key={index}
              >
                {item}
              </Text>
            ))}
          </View>
          <View style={styles.notesDataContaier}>
          <ScrollView contentContainerStyle={styles.mainContainer}>
            {notes.map((item, index) => (
              <View style={styles.individualRow} key={index}>
                <Text style={styles.containerText}>{item.note_title}</Text>
                <Text style={styles.containerText2}>{item.note_description}</Text>
                <View style={styles.containerText3Container}>
                  <Text style={styles.containerText3}>{item.note_created}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          </View>
        </View>
      ) : (
        <View style={styles.Indicator}>
          <ActivityIndicator size="large" color={'black'} />
          <Text style={styles.fetchingData}>Fetching Data</Text>
        </View>
      )}
    </>
  );
};

export default Notes;

const styles = StyleSheet.create({
    mainContainer: {
    flexGrow: 1,
  },

  header: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerText: {
    color: Color.darkOrange,
    flex: 1,
  },
  notesDataContaier: {
    height: windowHeight,
    backgroundColor: "white"

  },
  individualRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  containerText: {
    flex: 1,
  },
  containerText2: {
    color: Color.darkOrange,
    flex: 1,
  },
  containerText3: {
    flex: 1,
    textAlign: 'right',
    marginRight: 'auto',
  },
  containerText3Container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',
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
});
