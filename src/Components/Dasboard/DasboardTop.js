import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import calenderimg from "../../../assets/imgs/latest.png";
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { vh, vw } from "../../utils/ScreenSize";

const DashboardTopItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate(item.screen, { item: item })}
    >
      <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
        <View style={styles.containerIcon}>
          {item.iconType == "material" && (
            <MaterialIcons name={item.iconName} size={38} color="white" />
          )}
          {item.iconType == "ant" && (
            <AntDesign name={item.iconName} size={38} color="white" />
          )}
          {item.iconType == "entypo" && (
            <Entypo name={item.iconName} size={38} color="white" />
          )}
        </View>
        <View style={styles.containerText}>
          <Text style={styles.number}>{item.number}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DashboardTop = ({ navigation }) => {
  const data = [
    {
      img: calenderimg,
      number: "7",
      title: "My Jobs",
      color: "#FFC001",
      iconName: "calendar-today",
      iconType: "material",
      screen: "All-Job",
    },
    {
      img: calenderimg,
      number: "7",
      title: "New - Tasks",
      color: "#B8780C",
      iconName: "pluscircleo",
      iconType: "ant",
      screen: "tasks",
      ScreenTitle:"Task In Pending",
    },
    {
      img: calenderimg,
      number: "0",
      title: "Task - In Progress",
      color: "#774F07",
      iconName: "arrow-with-circle-right",
      iconType: "entypo",
      screen: "tasks",
      ScreenTitle:"Task In Progress",
    },
    {
      img: calenderimg,
      number: "10",
      title: "Requests",
      color: "#382504",
      iconName: "clockcircleo",
      iconType: "ant",
      screen: "All-Job",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {data.map((item, index) => (
          <DashboardTopItem key={index} navigation={navigation} item={item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: vh * 40
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 6,
  },
  itemContainer: {
    margin: 6,
    height: vh*18.5,
    width: vw * 45,
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
    padding: 17,
  },
  number: {
    color: "white",
    fontSize: 22,
  },
  title: {
    color: "white",
    fontSize: 20,
  },
  containerIcon: {
    display: "flex",
    marginLeft: "auto",
  },
  containerText: {
    display: "flex",
    flexDirection: "column",
    marginTop: "auto",
  },
});

export default DashboardTop;
