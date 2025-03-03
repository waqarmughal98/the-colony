import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { URL } from "../utils/Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const MyNotes = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { items, Alldata, screenName } = route.params;

  console.log(items, "items...........");

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const [year, month, day] = dateString.split("-");
    return `${month}-${day}-${year}`;
  };

  useEffect(() => {
    (async () => {
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
          setData(res.data.note);
          console.log(items.project_id, "items.project_id");
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [items]);

  return loading ? (
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
          />
          <View style={styles.individualMain}>
            <View style={styles.individual}>
              <View style={styles.individualLeft}>
                <View style={styles.numContainer}>
                  <Text style={styles.num}>1</Text>
                </View>
                <Text style={styles.txt5}>{data?.note_title || "N/A"}</Text>
              </View>
              {/* <TouchableOpacity style={styles.icon}>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={20}
                  color="black"
                />
              </TouchableOpacity> */}
            </View>
            <Text style={styles.smTxt}>{data?.note_description}</Text>
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>
                {data?.note_created?.slice(0, 10) || "N/A"}
              </Text>
            </View>
          </View>
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
    height: 120,
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
});
