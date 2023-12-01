import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { vw, vh } from "../utils/ScreenSize";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Color from "../Color";
import axios from "axios";
import { URL } from "../utils/Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Requests = ({ navigation }) => {
  const [data, setData] = useState([]);
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
  }, []);

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
      {/* All items */}
      <View>
        <ScrollView>
          {filteredData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("jobs-detail", { items: item })
                }
                activeOpacity={0.6}
                key={index}
              >
                <View
                  style={[
                    styles.individual,
                    { backgroundColor: index % 2 == 0 ? "#D2CBBC" : "#F2F1CF" },
                  ]}
                >
                  <Text
                    style={styles.dataText}
                  >{`From: ${item.leave_start_date} To: ${item.leave_end_date}`}</Text>
                  <Text style={[styles.dataText2, { color: Color.darkOrange }]}>
                    {item.leave_type}
                  </Text>
                  <Text style={styles.dataText2}>{item.leave_status}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
    flex: 1,
  },
  text1: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  text2: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },

  dataText: {
    fontSize: 14,
    color: "black",
    flex: 1,
  },
  dataText2: {
    fontSize: 14,
    color: "black",
    flex: 1,
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
});

export default Requests;
