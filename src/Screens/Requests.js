import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import { vw,vh } from '../utils/ScreenSize';
import { MaterialIcons,AntDesign } from '@expo/vector-icons';
import Color from '../Color';
const Requests = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity onPress={()=>navigation.navigate("add-request")} activeOpacity={0.6}>
            <AntDesign name="pluscircleo" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const [selectedTitle, setSelectedTitle] = useState("Holidy");
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
      img: require('../../assets/imgs/icons_holiday.png'),
      title: "Holidy",
    },
    {
      img: require('../../assets/imgs/icons_sickness.png'),
      title: "Sickness",
    },
    {
      img: require('../../assets/imgs/icons_overtime.png'),
      title: "Overtime",
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
            <Text style={styles.text}>Date</Text>
            <Text style={[styles.text1]}>Time Off</Text>
            <Text style={[styles.text2]}>Status</Text>
          </View>
          {/* All Data */}
          <View>
            <ScrollView>
              {
                data.map((item,index)=>
                {
                    return(
                        <View  key={index}>
                            <View style={[styles.individual,{backgroundColor:index%2==0 ? '#D2CBBC' : '#F2F1CF'}]}>
                            <Text style={styles.dataText}>10-15-2023</Text>
                            <Text style={[styles.dataText2,{color:Color.darkOrange}]}>Holidy</Text> 
                            <Text style={styles.dataText2}>Pending</Text> 
                            </View>
                        </View>
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
    width: vw*35,
    height: vh*15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor:Color.brightOrange
  },
  cardImage: {
    width: vw*15,
    height: vh*5,
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
    flex:1,
},
text1:{
    fontSize:16,
    color:'black',
    fontWeight:'bold',
    textAlign:"center",
    flex:1,
},
text2:{
    fontSize:16,
    color:'black',
    fontWeight:'bold',
    textAlign:"center",
    flex:1,
},

dataText:{
    fontSize:14,
    color:'black',
    flex:1
},
dataText2:{
    fontSize:14,
    color:'black',
    flex:1,
    textAlign:"center"
},
icon:{
  flex:1,
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

export default Requests;
