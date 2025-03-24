import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import TaskContainer from "../Components/Tasks/TaskContainer";
import { URL } from "../utils/Constant";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tasks = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const { Task } = route.params || {};
  const [data, setData] = useState([]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerTitle: "All Tasks",
    });
  }, [navigation]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const authToken = await AsyncStorage.getItem("token");
      const res = await axios.get(URL + "/task/all", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setData(res.data.tasks.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchTasks();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      {!loading ? (
        <View>
          <TaskContainer
            screenName={"tasks"}
            navigation={navigation}
            data={data}
          />
        </View>
      ) : (
        <View style={styles.Indicator}>
          <ActivityIndicator size="large" color={"black"} />
          <Text style={styles.fetchingData}>Fetching Data</Text>
        </View>
      )}
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  Indicator: {
    height: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
