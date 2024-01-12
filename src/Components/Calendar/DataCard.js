import { StyleSheet, Text, View, TouchableOpacity, ScrollView , ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react';
import Color from '../../Color';
import { vh,vw } from '../../utils/ScreenSize';
import { Ionicons } from '@expo/vector-icons'; 

const DataCard = ({navigation,item,index}) => {
  return (
    <>
    {
        item?
        (
            <TouchableOpacity onPress={()=>navigation.navigate("jobs-detail",{items: item})} key={index}
             activeOpacity={0.6} >
                <View style={styles.individual}>
                    <View style={styles.individualLeft}>  
                        <Text style={styles.line}></Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.dataText}>{item.project_title.trim()}</Text>
                            <Text style={styles.dataText2}>({item.client_company_name.trim()})</Text>
                            {/* <Text style={styles.dataText2}>({item.project_date_start})</Text> */}
                        </View>
                    </View>
                    <View style={styles.individualRight}>
                        <Ionicons name="person" size={16} color="white" />
                    </View>
                </View>
            </TouchableOpacity>
        ):
        (
            <View style={styles.individual}>
            <View style={styles.individualLeft}>  
                <Text style={[styles.line,{marginRight:20}]}></Text>
                <Text  >No data found for selected date</Text>

            </View>
            <View style={styles.individualRight}>
                <Ionicons name="person" size={16} color="white" />
            </View>
        </View>
        )
    }
    </>
    
  )
}

export default DataCard

const styles = StyleSheet.create({
    text2:{
        fontSize:16,
        color:'white',
        fontWeight:'bold',
        textAlign:"center"
    },
    dataText:{
        fontSize:14,
        color:'black',
    },
    individual:{
        display:"flex",
        flexDirection:'row',
        alignItems:"center",
        paddingHorizontal:6,
        justifyContent:"space-between",
        marginBottom:10,
        borderRadius:10,
        backgroundColor:'#eee5dc',
        height:7*vh,
    },
    individualLeft:{
     display:"flex",
     flexDirection:"row",
     alignItems:"center",
     flexWrap:"wrap",

    },
    individualRight:{
        height:30,
        width:30,
        backgroundColor: Color.darkOrange,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:100,
        marginRight:6,

    },
    line:{
        height: 5*vh,
        width:3,
        borderRadius:3,
        backgroundColor:Color.darkOrange,
        marginVertical:10,
        marginRight:10
    },
    textContainer:{
        height:  5*vh,
        width:"85%",
        display:"flex",
        flexDirection:'row',
        alignItems:"center",
    }
})