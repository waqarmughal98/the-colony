import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Color from '../../Color'
const DashboardBottom = () => {
  const data = [
    {
      img: require('../../../assets/imgs/job_status.png'), // Update the path
      title: "Jobs Status",
      color:"#FBA200",
    },
    {
      img: require('../../../assets/imgs/task.png'), // Update the path
      title: "Tasks",
    },
    {
      img: require('../../../assets/imgs/request.png'), // Update the path
      title: "Requests",
    },
    {
      img: require('../../../assets/imgs/problem.png'), // Update the path
      title: "Problem Rep",
    },
    {
      img: require('../../../assets/imgs/latest.png'), // Update the path
      title: "Latest Activity",
    },
    {
      img: require('../../../assets/imgs/myjob.png'), // Update the path
      title: "Work Log",
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        {data.map((item, index) => (
          <TouchableOpacity activeOpacity={0.6} key={index}>
            <View style={[styles.individualContainer,{backgroundColor: item.color || 'white'}]} >
              <Image style={styles.containerImg} source={item.img}  />
              <Text style={[styles.containerTitle,{color: item.color ? 'white' : 'black' }]}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DashboardBottom

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor: Color.cream,
    marginHorizontal:13,
    marginVertical:10,
    borderRadius:10,
    height:235,
    padding:20,
  }
  ,
  subContainer:{
    display:"flex",
    flexDirection:"row",
    gap:12,
    flexWrap:"wrap"
  },
  individualContainer:{
    height:90,
    width:90,
    backgroundColor:'white',
    borderRadius:5,
    display:"flex",
    flexDirection:'column',
    justifyContent:"center",
    alignItems:"center"
  }
  ,
  containerImg:{
    height:50,
    width:50
  },
  containerTitle:{
    fontSize:12,
    textAlign:'center'
  }

})