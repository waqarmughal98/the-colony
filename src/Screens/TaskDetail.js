import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import Color from "../Color";
import Toast from "react-native-toast-message";
import { vw, vh } from "../utils/ScreenSize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "../utils/Constant";
import { ContextProvider } from "../Global/Context";
const TaskDetail = ({ navigation, route }) => {
  const { items, Alldata, screenName } = route.params;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { setUpdation } = useContext(ContextProvider);

  useEffect(() => {
    setData([
      {
        label: "Company",
        value: items.client_company_name,
      },
      {
        label: "Task",
        value: items.project_title,
      },
      {
        label: "Status",
        value: items?.task_status - 1,
        selectoptions: true,
      },
      {
        label: "Start Date",
        value: items?.project_date_start,
      },
      {
        label: "End Date",
        value: items?.project_date_due,
      },
      {
        label: "Priority",
        value: items?.task_priority,
      },
    ]);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log(screenName, "screenName....");
  }, [screenName, items]);

  const options = [
    "New (Unassigned)",
    "Not Started",
    "In Progress",
    "On Hold",
    "Query Resolved",
    "Query Raised",
    "Completed",
  ];

  const selectOption = async (value, index) => {
    const updatedData = data.map((el) =>
      el.label == "Status" ? { ...el, value: index } : el
    );
    setData(updatedData);
  };

  const updateTask = async () => {
    const statusObject = await data?.find((item) => item?.label === "Status");
    const authToken = await AsyncStorage.getItem("token");
    console.log(items?.task_id, "task_id");
    await axios
      .post(
        URL + "/update-task/" + items?.task_id,
        {
          task_status: statusObject?.value + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Task Updated Successfully!",
          visibilityTime: 1000,
          topOffset: 5,
          style: {
            width: 100 * vw,
          },
        });
        setUpdation((pre) => [...pre]);
        setTimeout(() => {
          navigation.navigate(screenName, { Task: data, items: Alldata });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function stripHtmlTags(str) {
    return (str || "N/A").replace(/<[^>]*>/g, "");
  }
  return (
    <View style={styles.mainContainer}>
      {!loading ? (
        <View style={styles.Container}>
          <ScrollView>
            {data.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <Text style={styles.label}>{option.label}</Text>
                {option.selectoptions ? (
                  <SelectDropdown
                    data={options}
                    buttonStyle={{
                      backgroundColor: "white",
                      height: vh * 5,
                      width: vw * 45,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "row",
                    }}
                    dropdownStyle={{ marginTop: -(vh * 4), fontSize: 12 }}
                    buttonTextStyle={{ fontSize: 15 }}
                    renderDropdownIcon={(isOpened) => {
                      return (
                        <FontAwesome
                          style={{ marginLeft: 4 }}
                          name={isOpened ? "chevron-up" : "chevron-down"}
                          color={"#5A5A5A"}
                          size={14}
                        />
                      );
                    }}
                    defaultValue={options[option.value]}
                    onSelect={(selectedItem, index) => {
                      selectOption("Status", index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                ) : (
                  <Text style={styles.value}>{option.value}</Text>
                )}
              </View>
            ))}
            <View
              style={[
                styles.optionContainer,
                { flexDirection: "column", alignItems: "flex-start", gap: 10 },
              ]}
            >
              <Text style={styles.label}>Task Description: </Text>
              <Text style={styles.value}>
                {stripHtmlTags(items.task_description)}
              </Text>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.TextContainer}>
                <Text style={styles.text1}>Assigned</Text>
              </View>
              <View>
                <ScrollView>
                  {items?.assigned.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          styles.individual,
                          {
                            backgroundColor:
                              index % 2 == 0 ? "#D2CBBC" : "#F2F1CF",
                          },
                        ]}
                      >
                        <Text
                          style={styles.dataText}
                        >{`${item.first_name} ${item.last_name}`}</Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnContainer}
              activeOpacity={0.6}
              onPress={updateTask}
            >
              <Text style={styles.submitTxt} onPress={updateTask}>
                Update
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <Toast />
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

export default TaskDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  Container: {
    height: "100%",
    backgroundColor: "#EFE5DC",
  },
  Indicator: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: vh * 37,
  },
  fetchingData: {
    color: "black",
    fontWeight: "bold",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },

  value: {
    fontSize: 16,
  },
  optionText: {
    color: "black",
  },
  bottomContainer: {
    paddingHorizontal: 20,
  },
  text1: {
    fontSize: 16,
    paddingHorizontal: 15,
  },
  TextContainer: {
    marginTop: 20,
    height: 45,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: Color.brightOrange,
  },
  dataText: {
    fontSize: 14,
    color: "black",
    flex: 0.4,
  },
  dataText2: {
    fontSize: 14,
    color: "black",
    flex: 0.6,
    textAlign: "center",
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
  btnContainer: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12 * vh,
    marginTop: 3 * vh,
    marginHorizontal: 5 * vw,
    height: 45,
    borderRadius: 10,
  },
  submitTxt: {
    color: "white",
    fontSize: 17,
  },
});
