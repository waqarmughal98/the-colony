import React, { useEffect, useState } from "react";
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
          <Text style={styles.number}>{item?.number}</Text>
          <Text style={styles.title}>{item?.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DashboardTop = ({ navigation, data }) => {
  const [item, setItem] = useState()
  useEffect(()=>{
    setItem([
      {
      img: calenderimg,
      number: data?.projects?.pending,
      title: "My Jobs",
      color: "#FFC001",
      iconName: "calendar-today",
      iconType: "material",
      screen: "WorkLog",
    },
    {
      img: calenderimg,
      number: data?.tasks?.new,
      title: "New - Tasks",
      color: "#B8780C",
      iconName: "pluscircleo",
      iconType: "ant",
      screen: "task-in-pending",
      ScreenTitle:"Task In Pending",
    },
    {
      img: calenderimg,
      number: data?.tasks?.in_progress,
      title: "Task - In Progress",
      color: "#774F07",
      iconName: "arrow-with-circle-right",
      iconType: "entypo",
      screen: "task-in-progress",
      ScreenTitle:"Task In Progress",
    },
    {
      img: calenderimg,
      number: data?.leaves?.new,
      title: "Requests",
      color: "#382504",
      iconName: "clockcircleo",
      iconType: "ant",
      screen: "requests",
    }])
  },[data])

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {item?.map((item, index) => (
          <DashboardTopItem key={index} navigation={navigation} data={data} item={item} />
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
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw*3,
    marginHorizontal: 6,
  },
  itemContainer: {
    height: vh*18.5,
    width: vw * 45,
    borderRadius: 10,
    padding: 17,
  },
  number: {
    color: "white",
    fontFamily: "Sommet-Black",
    fontSize: vw*7,
  },
  title: {
    color: "white",
    fontFamily: "Sommet-Regular",
    fontSize: vw*4,
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
