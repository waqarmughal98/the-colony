import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { URL } from "../utils/Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import AntDesign from "@expo/vector-icons/AntDesign";

const MyNotes = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { items } = route.params;
  const [text, SetText] = useState("");
  const [updating, setUpdating] = useState(false);
  const [editing, setEdditing] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const [year, month, day] = dateString.split("-");
    return `${month}-${day}-${year}`;
  };

  const handleEdittingEnable = () => {
    setEdditing(true);
    SetText(data?.note_description);
  };

  useEffect(() => {
    fetchNotes();
  }, [items]);

  const fetchNotes = async () => {
    console.log(items?.project_id, "project_id");
    const authToken = await AsyncStorage.getItem("token");
    axios
      .get(URL + `/task/${Number(items.project_id)}/show-mynotes`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        let notes = res.data.note;
        setData(notes);
        SetText(notes.note_description);
        console.log(items.project_id, "items.project_id");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showSimpleAlert = (title, message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(title, message);
    }
  };
  const handleAdd_UpdatedNotes = async () => {
    setUpdating(true);
    console.log("reached");
    try {
      const authToken = await AsyncStorage.getItem("token");
      await axios.post(
        URL + `/task/${Number(items.project_id)}/update-mynotes`,
        {
          task_mynotes: text,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );
      await fetchNotes();
      setUpdating(false);
      showSimpleAlert(
        "Success!",
        text ? "Notes updated successfully." : "Notes added successfully."
      );
    } catch (error) {
      console.log(error);
      setUpdating(false);
      showSimpleAlert("Error", "Failed to update notes. Try again?");
    }
  };

  return (
    <>
      <Toast />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={"black"} size={"large"} />
          <Text>Fetching Data...</Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: "#EEE5DC" }}>
          <View style={styles.maiNContainer}>
            <View style={styles.header}>
              <Text
                style={styles.txt}
              >{`Assigned User: ${items?.assigned[0]?.first_name}`}</Text>
              <Text style={styles.txt}>{`Stated Data: ${formatDate(
                items.project_date_start
              )}`}</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.containerTop}>
                <MaterialCommunityIcons
                  name="calendar-edit"
                  size={29}
                  color="black"
                />
                <Text style={styles.txt2}>My Notes</Text>
              </View>
              <TextInput
                placeholder="Write text.."
                style={styles.input}
                multiline={true}
                textAlignVertical="top"
                selectionColor={"#382504"}
                value={text}
                onChangeText={(txt) => SetText(txt)}
              />
              <TouchableOpacity
                onPress={() => handleAdd_UpdatedNotes()}
                style={styles.btn}
                activeOpacity={0.6}
              >
                <Text style={styles.btnTxt}>
                  {updating ? "Updating Notes..." : "Update Notes"}
                </Text>
              </TouchableOpacity>
              {/* <View style={styles.individualMain}>
                <View style={styles.individual}>
                  <View style={styles.individualLeft}>
                    <View style={styles.numContainer}>
                      <Text style={styles.num}>1</Text>
                    </View>
                    {data?.note_title && (
                      <Text style={styles.txt5}>
                        {data?.note_title || "N/A"}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => handleEdittingEnable()}
                    style={styles.icon}
                  >
                    <AntDesign name="edit" size={20} color="black" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.smTxt}>{data?.note_description}</Text>
                <View style={styles.dateWrapper}>
                  <Text style={styles.date}>
                    {formatDate(data?.note_updated?.slice(0, 10)) || "N/A"}
                  </Text>
                </View>
              </View> */}
              {/* <View style={styles.fileContainer}>
            {Array(5)
              .fill(0)
              .map((item, index) => {
                return (
                  <View key={index} style={styles.individualMain}>
                    <View style={styles.individual}>
                      <View style={styles.individualLeft}>
                        <View style={styles.numContainer}>
                          <Text style={styles.num}>{index + 1}</Text>
                        </View>
                        <Text style={styles.txt5}>
                          Digital Marketing Agency
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.icon}>
                        <MaterialCommunityIcons
                          name="delete-outline"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.smTxt}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s
                    </Text>
                    <View style={styles.dateWrapper}>
                      <Text style={styles.date}>02-25-2024</Text>
                    </View>
                  </View>
                );
              })}
          </View> */}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default MyNotes;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#382504",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  maiNContainer: {
    flex: 1,
    paddingBottom: 70,
  },
  txt: {
    color: "white",
    fontSize: 12,
  },
  container: {
    padding: 17,
    gap: 17,
    backgroundColor: "#EEE5DC",
    flex: 1,
  },
  containerTop: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  txt2: {
    fontSize: 15,
    fontWeight: "600",
  },
  fileContainer: {
    gap: 15,
  },

  individualMain: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  individual: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-betweem",
    alignItems: "center",
  },
  txt5: {
    fontSize: 13,
  },
  individualLeft: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
  },
  icon: {
    marginLeft: "auto",
  },
  numContainer: {
    backgroundColor: "black",
    borderRadius: 100,
    height: 20,
    width: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  num: {
    color: "white",
    fontWeight: "500",
    fontSize: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 9,
    fontSize: 13,
    borderWidth: 1,
    borderColor: "lightgray",
    minHeight: 120,
  },
  smTxt: {
    fontSize: 11,
    color: "gray",
    marginVertical: 5,
  },
  dateWrapper: {
    backgroundColor: "#FBA81A",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: "auto",
  },
  date: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: -100,
  },
  btn: {
    backgroundColor: "black",
    marginLeft: "auto",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 1000,
    marginTop: -5,
  },
  btnTxt: {
    color: "white",
  },
});
