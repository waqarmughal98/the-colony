import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";
import { vw, vh } from "../utils/ScreenSize";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Color from "../Color";
import Toast from 'react-native-toast-message';
import axios from "axios";
import { URL } from "../utils/Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Requests = ({ navigation,route }) => {
  const [data, setData] = useState([]);
  const { leave }=route.params
  const [filteredData, setfilteredData] = useState([]);
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

  useEffect(() => {
    (async () => {
      const authToken = await AsyncStorage.getItem("token");
      await axios
        .get(URL + "/leave", {
          headers: {  
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          setData(res.data.leaves.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [leave]);

  useEffect(()=>{
    filterLeaves();
  }, [data])

  const [selectedTitle, setSelectedTitle] = useState("Holiday");

  const options = [
    {
      img: require("../../assets/imgs/icons_holiday.png"),
      title: "Holiday",
    },
    {
      img: require("../../assets/imgs/icons_sickness.png"),
      title: "Sickness",
    },
    {
      img: require("../../assets/imgs/icons_overtime.png"),
      title: "Overtime",
    },
  ];

  const filterLeaves = (item="Holiday") => {
    setSelectedTitle(item);
    const copyData = [...data];
    const filterDate = copyData.filter((items) => {
      return items.leave_type == item;
    });
    setfilteredData(filterDate);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.card]}
        onPress={() => filterLeaves(item.title)}
      >
        <Image style={styles.cardImage} source={item.img} />
        <Text style={[styles.cardTitle]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
    {
      data.length>0 ?
      (
        <>
         <View style={{height:15*vh}}>        
          <FlatList
          data={options}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
       </View>

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
      {/* All items */}
      <View style={{flex:1}}>
        <ScrollView >
          <View style={{paddingBottom:100}}>
          {filteredData.map((item, index) => {
            return (
              <View key={index}>
                <View
                  style={[
                    styles.individual,
                    { backgroundColor: index % 2 == 0 ? "#D2CBBC" : "#F2F1CF" },
                  ]}
                >
                  <Text
                    style={styles.dataText}
                  >{`From: ${item?.leave_start_date} To: ${item?.leave_end_date}`}</Text>
                  <Text style={[styles.dataText2, { color: Color.darkOrange }]}>
                    {item.leave_type}
                  </Text>
                  <Text style={styles.dataText2}>{item.leave_status}</Text>
                </View>
                <Toast/>
              </View>
            );
          })}
          </View>
        </ScrollView>
      </View>
      </>
      ) :
      (
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
    paddingTop: 20,
    flex:1
  },
  flatListContainer: {
    paddingHorizontal: 5,
  },
  card: {
    width: vw * 35,
    height: vh * 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    backgroundColor: Color.brightOrange,
  },
  cardImage: {
    width: vw * 15,
    height: vh * 5,
    resizeMode: "contain",
  },
  cardTitle: {
    marginTop: 5,
    color: "white",
  },
  selectedCardContainer: {
    backgroundColor: "black",
    padding: 10,
    marginTop: 20,
    paddingHorizontal: 20,
    height: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  selectedCardText: {
    color: "white",
    fontSize: 17,
    textAlign: "left",
  },
  containerHeader: {
    backgroundColor: "#B1B1B1",
    height: 45,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    flex: 0.4,
  },
  text1: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    flex: 0.3,
  },
  text2: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    flex: 0.3,
  },

  dataText: {
    fontSize: 14,
    color: "black",
    flex: 0.4,
  },
  dataText2: {
    fontSize: 14,
    color: "black",
    flex: 0.3,
    textAlign: "center",
  },
  icon: {
    flex: 1,
  },
  individual: {
    height: 45,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomColor: Color.brightOrange,
    borderBottomWidth: 1,
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

export default Requests;
