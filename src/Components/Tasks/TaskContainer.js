import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import Color from '../../Color';
import { vh, vw } from '../../utils/ScreenSize';

const TaskContainer = ({navigation, data}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerHeader}>
        <Text style={styles.text}>Task</Text>
        <Text style={[styles.text2]}>Company Name</Text>
      </View>
      <View style={styles.dataContainer}>
        <ScrollView>
          {
            data.length > 0 ? (data.map((item,index)=>{
              return(
                <TouchableOpacity onPress={()=>navigation.navigate("task-details",{items: item})} activeOpacity={0.6} key={index}>
                  <View style={[styles.individual,{backgroundColor:index%2==0 ? '#D2CBBC' : '#F2F1CF'}]}>
                    <Text style={styles.dataText}>{item.project_title}</Text>
                    <Text style={styles.dataText2}>{item.client_company_name}</Text> 
                    <MaterialIcons name={'keyboard-arrow-right'} size={28} color="black" />
                  </View>
                </TouchableOpacity>
              )
            })
            ) : (
              <Text style={styles.noRecord}>No Record Found</Text>
            )
          }
        </ScrollView>
      </View>
    </View>
  )
}

export default TaskContainer

const styles = StyleSheet.create({
    containerHeader:{
        backgroundColor:"black",
        height:45,
        display:"flex",
        flexDirection:"row",
        paddingHorizontal:20,
        alignItems:"center"
    },
    text:{
        fontSize:16,
        color:'white',
        fontWeight:'bold',
        flex:0.25
    },
    text2:{
        fontSize:16,
        color:'white',
        fontWeight:'bold',
        flex:0.75,
        textAlign:"center"
    },
    dataText:{
        fontSize:14,
        color:'black',
        flex:0.4
    },
    dataText2:{
        fontSize:14,
        color:'black',
        flex:0.6,
        textAlign:"center"
    },
    individual:{
        height:45,
        display:"flex",
        flexDirection:'row',
        alignItems:"center",
        paddingHorizontal:20,
        borderBottomColor:Color.brightOrange,
        borderBottomWidth:1
    },
    noRecord:{
      color: "black",
      fontSize: 24,
      width: vw * 100,
      height: vh * 100,
      textAlign: "center",
      paddingVertical: vh * 25,
      fontWeight: "bold",
    }
})