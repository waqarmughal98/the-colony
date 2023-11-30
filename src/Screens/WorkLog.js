import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import { vw,vh } from '../utils/ScreenSize';
import { MaterialIcons } from '@expo/vector-icons';
import Color from '../Color';
const WorkLog = () => {

  const [selectedTitle, setSelectedTitle] = useState("Un-Categorised");
  const data=[
    {
        jobName:"Halo therapy",
        company: "Sevent Trent"
    },
    {
        jobName:"Halo therapy",
        company: "Sevent Trent"
    },
    {
        jobName:"Halo therapy",
        company: "Sevent Trent"
    },
    {
        jobName:"Halo therapy",
        company: "Sevent Trent"
    },
    {
        jobName:"Halo therapy",
        company: "Sevent Trent..."
    },
    {
        jobName:"Halo therapy",
        company: "Sevent ...... Trent"
    },
    {
        jobName:"Halo therapy",
        company: "Sevent Trent"
    },
]

  const options = [
    {
      img: require('../../assets/imgs/ic_project_severn_trent.png'),
      title: "Un-Categorised",
    },
    {
      img: require('../../assets/imgs/commercial.png'),
      title: "Commericial",
    },
    {
      img: require('../../assets/imgs/ic_private_project.png'),
      title: "Private",
    },
    {
      img: require('../../assets/imgs/ic_project_severn_trent.png'),
      title: "Severn Trent",
    },
  ];


  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.card]}
        onPress={() => setSelectedTitle(item.title)}
      >
        <Image style={styles.cardImage} source={item.img} />
        <Text style={[styles.cardTitle]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Horizontal FlatList */}
      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Display selected card title */}
      <View style={styles.selectedCardContainer}>
        <Text style={styles.selectedCardText}>{selectedTitle}</Text>
      </View>

         {/* Header */}
         <View style={styles.containerHeader}>
            <Text style={styles.text}>Job Name</Text>
            <Text style={[styles.text2]}>Company</Text>
          </View>
          {/* All Data */}
          <View>
            <ScrollView>
              {
                data.map((item,index)=>
                {
                    return(
                        <TouchableOpacity onPress={()=>navigation.navigate("jobs-detail",{items: item})} activeOpacity={0.6} key={index}>
                            <View style={[styles.individual,{backgroundColor:index%2==0 ? '#D2CBBC' : '#F2F1CF'}]}>
                            <Text style={styles.dataText}>{item.jobName}</Text>
                            <Text style={styles.dataText2}>{item.company}</Text> 
                            <MaterialIcons name={'keyboard-arrow-right'} size={28} color="black" />
                            </View>
                        </TouchableOpacity>
                    )
                })
              }
            </ScrollView>
          </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    paddingTop: 20,
  },
  flatListContainer: {
    paddingHorizontal: 5,
  },
  card: {
    width: vw*45,
    height: vh*20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor:Color.brightOrange
  },
  cardImage: {
    width: vw*25,
    height: vh*10,
    resizeMode: 'contain',
  },
  cardTitle: {
    marginTop: 5,
    color:"white"
  },
  selectedCardContainer: {
    backgroundColor: 'black',
    padding: 10,
    marginTop: 20,
    paddingHorizontal:20,
    height:50,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center"
  },
  selectedCardText: {
    color: 'white',
    fontSize: 17,
    textAlign:"left"
  },
  containerHeader:{
    backgroundColor:"#B1B1B1",
    height:45,
    display:"flex",
    flexDirection:"row",
    paddingHorizontal:20,
    alignItems:"center"
},
text:{
    fontSize:16,
    color:'black',
    fontWeight:'bold',
    flex:0.25
},
text2:{
    fontSize:16,
    color:'black',
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

});

export default WorkLog;
