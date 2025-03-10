import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TaskOption = ({ navigation, route }) => {
  const { items, Alldata, screenName } = route.params;
  let data = [
    {
      title: "Tasks Information",
      bgColor: "#382504",
      iconName: "folder-information-outline",
      redirect: "task-details",
    },
    {
      title: "Files Upload",
      bgColor: "#774F07",
      iconName: "file-upload-outline",
      redirect: "fileupload",
    },
    {
      title: "My Notes",
      bgColor: "#B8780C",
      iconName: "calendar-edit",
      redirect: "mynotes",
    },
    {
      title: "My Updates",
      bgColor: "#B8780C",
      iconName: "update",
      redirect: "myupdates",
    },
  ];

  return (
    <View style={styles.mainContainer}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate(item.redirect, {
                items: items,
                screenName: screenName,
                Alldata: Alldata,
              })
            }
            style={[styles.individual, { backgroundColor: item.bgColor }]}
          >
            <View style={styles.individualLeft}>
              <MaterialCommunityIcons
                name={item.iconName}
                size={24}
                color="white"
              />
              <Text style={styles.txt}>{item.title}</Text>
            </View>
            <View style={styles.individualRight}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="white"
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TaskOption;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 17,
    gap: 17,
  },
  individual: {
    borderRadius: 10,
    padding: 15,
    paddingVertical: 19,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  individualLeft: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  txt: {
    fontSize: 13,
    color: "white",
  },
  individualRight: {
    backgroundColor: "#FBA81A",
    borderRadius: 4,
    padding: 2,
  },
});
