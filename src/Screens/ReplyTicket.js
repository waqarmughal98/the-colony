import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateInput from "../Components/Date/DateInput";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { URL } from "../utils/Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const ReplyTicket = ({ navigation, route }) => {
  const { items, jobTitle, id, subject, ticketDetails } = route.params;
  const [image, setImage] = useState(null);
  const [mediaLibraryStatus, setMediaLibraryStatus] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(null);
  const form = new FormData();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [data, setData] = useState({
    date: getCurrentDate(),
    Subject: subject,
    Job: jobTitle,
    Problem: "",
  });

  useEffect(() => {
    (async () => {
      const requestPermissions = async () => {
        const { status: mediaLibraryPermission } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraPermission } =
          await ImagePicker.requestCameraPermissionsAsync();

        setMediaLibraryStatus(mediaLibraryPermission);
        setCameraStatus(cameraPermission);

        if (mediaLibraryPermission !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }

        if (cameraPermission !== "granted") {
          Alert.alert("Sorry, we need camera permissions to make this work!");
        }
      };

      requestPermissions();
    })();
  }, []);

  const pickImage = async (sourceType) => {
    var result;
    if (sourceType == "gallery" && mediaLibraryStatus == "granted") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
    if (sourceType == "camera" && cameraStatus == "granted") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
    if (result) {
      setImage(result.assets[0].uri);
      const uriParts = result.assets[0].uri.split("/");
      const photo = {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: uriParts[uriParts.length - 1],
      };
      form.append("ticketreply_ticketid", id);
      form.append("ticketreply_text", data?.Problem);
      form.append("attachments", photo);
      Toast.show({
        type: "success",
        text1: "Image is ready to Upload!",
        text2: "Wait! It takes some time",
        visibilityTime: 2000,
        topOffset: 5,
      });
    }
  };

  const handleData = (value, field) => {
    setData({ ...data, [field]: value });
  };

  const submitReply = async () => {
    const authToken = await AsyncStorage.getItem("token");
    await axios
      .post(
        URL + "/problemreports/" + id + "/postreply",
        {},
        {
          params: form,
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "multipart/form-data"
          },
        }
      )
      .then((res) => {
        console.log(res);
        Toast.show({
          type: "success",
          text1: "Reply submitted successfully!",
          text2: "we are redirect you to previous screen",
          visibilityTime: 1000,
          topOffset: 5,
        });
        setTimeout(() => {
          navigation.navigate("problem-report-replies", {
            id: id,
            reply: data,
            ticketDetail: ticketDetails,
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: "error",
          text1: "Error while subitting!",
          visibilityTime: 1000,
          topOffset: 5,
        });
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View>
            <Text style={[styles.label, { marginBottom: 5 }]}>Date</Text>
            <View>
              <DateInput
                editable={true}
                style={styles.input}
                setData={setData}
                name="replyTicket"
              />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              value={data.Subject}
              style={styles.input}
              onChangeText={(text) => handleData(text, "Subject")}
            />
          </View>
          <View>
            <Text style={styles.label}>Job / Site</Text>
            <View style={styles.dateInput}>
              <Text>{data.Job}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.label}>
              Please describe the problem in detail below:
            </Text>
            <TextInput
              value={data.Problem}
              style={styles.input2}
              multiline={true}
              numberOfLines={8}
              textAlignVertical="top"
              onChangeText={(text) => handleData(text, "Problem")}
            />
          </View>
          <View>
            <Text style={styles.label}>Upload Image:</Text>
            <TouchableOpacity onPress={() => pickImage("gallery")}>
              <Ionicons
                name="images"
                size={50}
                color="#5A5A5A"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.6} onPress={submitReply}>
            <View style={styles.btnContainer}>
              <Text style={styles.submitTxt}>Reply</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

export default ReplyTicket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContainer: {
    padding: 20,
    display: "flex",
    gap: 15,
    paddingBottom: 70,
  },
  label: {
    fontSize: 15,
    fontFamily: "Sommet-Regular",
  },
  input: {
    backgroundColor: "#DFE1ED",
    height: 40,
    marginTop: 5,
    borderRadius: 7,
    paddingHorizontal: 10,
    fontFamily: "Sommet-Regular",
  },
  dateInput: {
    backgroundColor: "#DFE1ED",
    height: 40,
    marginTop: 5,
    borderRadius: 7,
    paddingHorizontal: 10,
    display: "flex",
    fontFamily: "Sommet-Regular",
    justifyContent: "center",
  },
  input2: {
    backgroundColor: "#DFE1ED",
    height: 150,
    marginTop: 5,
    fontFamily: "Sommet-Regular",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  btnContainer: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    fontFamily: "Sommet-Regular",
    borderRadius: 10,
  },
  submitTxt: {
    color: "white",
    fontFamily: "Sommet-Regular",
    fontSize: 17,
  },
});
