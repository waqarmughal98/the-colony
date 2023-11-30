import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import Color from '../../Color'
import { vh, vw } from '../../utils/ScreenSize';
const DashboardBottom = ({navigation}) => {
  const data = [
    {
      img: require('../../../assets/imgs/job_status.png'), 
      screenName:"job-Status",
      title: "Jobs Status",
      color:"#FBA200",
    },
    {
      img: require('../../../assets/imgs/task.png'), 
      screenName:"tasks",
      title: "Tasks",
    },
    {
      img: require('../../../assets/imgs/request.png'), 
      screenName:"problem-reports",
      title: "Requests",
    },
    {
      img: require('../../../assets/imgs/problem.png'), 
      screenName:"problem-reports",
      title: "Problem Rep",
    },
    {
      img: require('../../../assets/imgs/latest.png'), 
      screenName:"latest-activity",
      title: "Latest Activity",
    },
    {
      img: require('../../../assets/imgs/myjob.png'), 
      screenName:"work-logs",
      title: "Work Log",
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        {data.map((item, index) => (
          <TouchableOpacity onPress={()=>navigation.navigate(item.screenName,{item:{ScreenTitle:"Tasks"}})} activeOpacity={0.6} key={index}>
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
    height:vh * 31,
    padding:5,
    justifyContent: 'center',
  }
  ,
  subContainer:{
    display:"flex",
    flexDirection:"row",
    gap:12,
    flexWrap:"wrap",
    justifyContent: "center"
  },
  individualContainer:{
    height:vh*12,
    width: vw * 26,
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