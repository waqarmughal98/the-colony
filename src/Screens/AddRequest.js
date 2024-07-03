import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Color from "../Color";
import { vw, vh } from "../utils/ScreenSize";
import { FontAwesome } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import Toast from "react-native-toast-message";
import DateInput from "../Components/Date/DateInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "../utils/Constant";
import { useNavigation } from "@react-navigation/native";
import { ContextProvider } from "../Global/Context";
const AddRequest = () => {
  const { setUpdation, selectedRequestCategory } = useContext(ContextProvider);
  const [leave, setLeave] = useState({
    leave_title: "Leave",
    leave_start_date: new Date().toDateString(),
    leave_end_date: new Date().toDateString(),
    leave_reason: "",
    leave_type: selectedRequestCategory,
    day_to_taken: "",
    department: "",
  });
  const navigation = useNavigation();
  const updateLeave = (value, field) => {
    setLeave({ ...leave, [field]: value });
  };

  const validations = () => {
    return Object.values(leave).every((item) => item != "");
  };
  const submitRequest = async () => {
    if (validations() == true) {
      const authToken = await AsyncStorage.getItem("token");
      await axios
        .post(
          URL + "/leave",
          {},
          {
            params: leave,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => {
          Toast.show({
            type: "success",
            text1: "Request Added Successfully!",
            text2: "we are redirect you to previous screen",
            visibilityTime: 1000,
            topOffset: 5,
          });
          setTimeout(() => {
            navigation.navigate("requests", { leave: leave });
          }, 1000);
          setUpdation((pre) => [...pre, leave]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Toast.show({
        type: "error",
        text1: "kindly fill all the form fields!",
        topOffset: 5,
        visibilityTime: 1500,
      });
    }
  };

  const data = ["Holiday", "Sickness", "Overtime"];
  /* Check this data */
  const departmentData = [
    "Office",
    "Topo Surveyor",
    "Utilities Surveyor",
    "CAD Team",
  ];
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.fieldsContainer}>
          <View>
            <Text style={styles.label}>Request Type*</Text>
            <SelectDropdown
              data={data}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    style={{ marginRight: 4 }}
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#5A5A5A"}
                    size={16}
                  />
                );
              }}
              buttonStyle={{
                backgroundColor: "white",
                height: vh * 5,
                width: "100%",
                borderRadius: 10,
              }}
              dropdownStyle={{ marginTop: -(vh * 4) }}
              buttonTextStyle={{ fontSize: 15 }}
              /* Change the default value */
              defaultValue={leave.leave_type}
              style={{ backgroundColor: "white", height: 20 }}
              onSelect={(selectedItem, index) => {
                updateLeave(selectedItem, "leave_type");
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          {/* <View>
                    <Text style={styles.label}>Reason Title*</Text>
                    <TextInput value={leave.leave_title} style={styles.dayInput} onChangeText={(text)=>updateLeave(text, 'leave_title')} />
                </View> */}
          <View>
            <Text style={styles.label}>Brief Description*</Text>
            <TextInput
              value={leave.leave_reason}
              multiline={true}
              textAlignVertical="top"
              numberOfLines={6}
              style={styles.reasonInput}
              onChangeText={(text) => updateLeave(text, "leave_reason")}
            />
          </View>
          <View>
            <Text style={styles.label}>Start Date*</Text>
            <DateInput editable={true} setLeave={setLeave} name="startDate" />
          </View>
          <View>
            <Text style={styles.label}>End Date*</Text>
            <DateInput editable={true} setLeave={setLeave} name="endDate" />
          </View>
          <View>
            <Text style={styles.label}>Days to be taken*</Text>
            <TextInput
              value={leave.day_to_taken}
              style={styles.dayInput}
              onChangeText={(text) => updateLeave(text, "day_to_taken")}
            />
          </View>
          <View>
            <Text style={styles.label}>Department*</Text>
            <SelectDropdown
              data={departmentData}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    style={{ marginRight: 4 }}
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#5A5A5A"}
                    size={16}
                  />
                );
              }}
              buttonStyle={{
                backgroundColor: "white",
                height: vh * 5,
                width: "100%",
                borderRadius: 10,
              }}
              dropdownStyle={{ marginTop: -(vh * 4) }}
              buttonTextStyle={{ fontSize: 15 }}
              /* Change the default value */
              defaultValue={leave.department}
              style={{ backgroundColor: "white", height: 20 }}
              onSelect={(selectedItem, index) => {
                updateLeave(selectedItem, "department");
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.btnContainer}
            activeOpacity={0.6}
            onPress={submitRequest}
          >
            <Text style={styles.submitTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

export default AddRequest;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.brightOrange,
  },
  fieldsContainer: {
    paddingHorizontal: 5 * vw,
    paddingBottom: 6 * vh,
    width: 100 * vw,
    display: "flex",
    gap: 2.5 * vh,
    marginTop: 4 * vh,
  },
  label: {
    fontSize: 16,
    fontFamily: "Sommet-Regular",
    marginBottom: 10,
  },
  reasonInput: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
  },
  dayInput: {
    height: 45,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  btnContainer: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7 * vh,
    marginTop: 1.4 * vh,
    height: 45,
    borderRadius: 10,
  },
  submitTxt: {
    color: "white",
    fontSize: 17,
    fontFamily: "Sommet-Regular",
  },
});
