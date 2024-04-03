import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native'
import { vw,vh } from '../utils/ScreenSize';
import { MaterialIcons,Ionicons, AntDesign } from '@expo/vector-icons';
import Color from '../Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../utils/Constant';
const WorkLog = ({navigation}) => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedTitle, setSelectedTitle] = useState("Un-Categorised");

  useEffect(()=>{
    (async()=>{
      const authToken = await AsyncStorage.getItem('token');
      await axios.get(URL + '/job-status', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).then((res)=>{
        setData(res.data.projects.data)
      }).catch((err)=>{
        console.log(err)
      })
    })()
  }, [])
  

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Work Log',
      headerStyle: { backgroundColor: Color.darkOrange },
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={{ marginLeft: 0 }}>
         <TouchableOpacity
            onPress={() =>navigation.navigate("Home",{
              screen:"Dashboard"
            })}
            activeOpacity={0.6}
          >
          <AntDesign name="arrowleft" size={24} color="white" style={{marginLeft:15}} />
          </TouchableOpacity>
      </View>
      ),
    });
  }, [navigation]);

  useEffect(()=>{
    filterJobs();
    setSelectedTitle("All Jobs");
    setFilteredData(data);
  }, [data])

  const filterJobs = (item="All Jobs")=> {
    if(item=="All Jobs"){
      setSelectedTitle(item);
      setFilteredData(data);
    }else{
      setSelectedTitle(item);
      const copyData = [...data];
      const filterDate = copyData.filter((items) => {
        return items.category_name == item;
      });
      setFilteredData(filterDate);
    }
   
  };

  const options = [
    {
      img: require('../../assets/imgs/ic_project_severn_trent.png'),
      color:"#E2445B",
      title: "Severn Trent",
    },
    {
      img: require('../../assets/imgs/commercial.png'),
      color:"#FFCA00",
      title: "Commercial",
    },
    {
      img: require('../../assets/imgs/ic_private_project.png'),
      color:"#FE158A",
      title: "Private",
    },
    {
      img: require('../../assets/imgs/ic_project_severn_trent.png'),
      color:"#30D9D6",
      title: "Un-Categorised",
    },
  ];




  return (
    <View style={styles.container}>
      {
        data.length>0 ? ( 
          <>
          <View style={styles.mainContainer}>
            {
              options && options?.map((item,index)=>{
                return (
                  <TouchableOpacity
                    style={[styles.card,{backgroundColor:item.color}]}
                    onPress={() => filterJobs(item.title)}
                    key={index}
                  >
                    <Image style={styles.cardImage} source={item.img} />
                    <Text style={[styles.cardTitle]}>{item.title}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>

        <View style={styles.selectedCardContainer}>
          <Text style={styles.selectedCardText}>{selectedTitle}</Text>
        </View>
        {/* Header */}
        <View style={styles.containerHeader}>
          <Text style={styles.text}>Job Name</Text>
          <Text style={[styles.text2]}>Company</Text>
        </View>
        {/* All Data */}
        <View style={{flex:1}}>
          <ScrollView>
            <View style={{paddingBottom:65,}}>
            {filteredData.map((item,index)=>
              {
                return(
                  <TouchableOpacity onPress={()=>navigation.navigate("jobs-detail",{items: item})} activeOpacity={0.6} key={index}>
                    <View style={[styles.individual,{backgroundColor:index%2==0 ? '#D2CBBC' : '#F2F1CF'}]}>
                      <Text style={styles.dataText}>{item.project_title}</Text>
                      <Text style={styles.dataText2}>{item.client_company_name}</Text> 
                      <MaterialIcons name={'keyboard-arrow-right'} size={28} color="black" />
                    </View>
                  </TouchableOpacity>
                )
              }
            )}
            </View>
          </ScrollView>
        </View>
        </>
        ): (
          <View style={styles.Indicator}>
          <ActivityIndicator size="large" color={"black"} />
          <Text style={styles.fetchingData}>Fetching Data</Text>
        </View>
        )
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 3.3*vw,
  },mainContainer:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    gap:3.3*vw,
    marginHorizontal:3.3*vw

  },

  card: {
    width: vw*45,
    paddingVertical:10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:Color.brightOrange
  },
  cardImage: {
    width: vw*18,
    height: vh*7,
    resizeMode: 'contain',
  },
  cardTitle: {
    marginTop: 5,
    color:"white"
  },
  selectedCardContainer: {
    backgroundColor: 'black',
    padding: 10,
    marginTop: 3.3*vw,
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
Indicator:
{
     flexGrow:1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",
    marginTop:-20,
},
fetchingData:{
    color:'black',
    fontWeight:"bold"
}
});

export default WorkLog;
