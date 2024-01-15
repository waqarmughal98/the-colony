import { StyleSheet, Text, View, TouchableOpacity, ScrollView , ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react';
import Color from '../../Color';
import { vh,vw } from '../../utils/ScreenSize';
import { Fontisto } from '@expo/vector-icons';

const HolidayCard = ({}) => {
  return (
        <View style={styles.individual}>
            <View style={styles.individualLeft}>  
                <Text style={styles.line}></Text>
                <Text style={styles.dataText}>Holiday</Text>
                <Text style={styles.dataText}>(holiday)</Text> 
            </View>
             <View style={styles.individualRight}>
             <Fontisto name="holiday-village" size={26} color="white" style={{marginRight:7}} />
             </View>
        </View>
  )
}

export default HolidayCard

const styles = StyleSheet.create({
    text2:{
        fontSize:16,
        color:'white',
        fontWeight:'bold',
        textAlign:"center"
    },
    dataText:{
        fontSize:13,
        color:'white',
    },
    individual:{
        display:"flex",
        flexDirection:'row',
        alignItems:"center",
        paddingHorizontal:6,
        justifyContent:"space-between",
        marginBottom:10,
        borderRadius:10,
        backgroundColor:'#EC1423',
        height:7*vh
    },
    individualLeft:{
     display:"flex",
     flexDirection:"row",
     alignItems:"center",
    },
  
    line:{
        height: 5*vh,
        width:4,
        borderRadius:3,
        backgroundColor:"white",
        marginVertical:10,
        marginRight:10,
    }
})