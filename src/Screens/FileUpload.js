import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "../utils/Constant";
import * as ImagePicker from "expo-image-picker";

const FileUpload = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { items, Alldata, screenName } = route.params;

  useEffect(() => {
    fetchAttachments();
  }, [items]);

  const fetchAttachments = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${URL}/task/${Number(items.project_id)}/show-attachments`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );
      setData(response.data.attachments.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const pickImage = async (sourceType) => {
    let result;

    // Request permission based on source type
    if (sourceType === "gallery") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need gallery permissions to make this work!");
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
      await uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (image) => {
    setLoading(true);
    try {
      const authToken = await AsyncStorage.getItem("token");
      const formData = new FormData();

      formData.append("file", {
        uri: image.uri,
        type: "image/jpeg", // Adjust based on your needs
        name: image.uri.split("/").pop() || "image.jpg",
      });

      const response = await axios.post(
        `https://geomap.imaginedesigns.co/api/task/${Number(
          items.project_id
        )}/attach-files`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Refresh attachments after successful upload
      await fetchAttachments();
    } catch (error) {
      console.log("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const [year, month, day] = dateString.split("-");
    return `${month}-${day}-${year}`;
  };

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
              name="file-upload"
              size={29}
              color="black"
            />
            <Text style={styles.txt2}>Files Attachment</Text>
          </View>
          <View style={styles.fileUploadContainer}>
            <Text style={styles.txt4}>Updates Files</Text>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="file-upload"
                size={29}
                color="white"
              />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.btn}
                onPress={() => pickImage("gallery")}
              >
                <Text style={[styles.txt3, { color: "white" }]}>
                  Choose Files
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.btnOutline}
                onPress={() => pickImage("camera")}
              >
                <Text style={[styles.txt3, { color: "black" }]}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.smTxt}>
            Only .jpg and .png files, 500 KB max file size.
          </Text>
          <View style={styles.fileContainer}>
            {data.length === 0 ? (
              <View>
                <Text>No attachments found</Text>
              </View>
            ) : (
              data.map((item, index) => (
                <View key={index} style={styles.individual}>
                  <View style={styles.individualLeft}>
                    <Image
                      style={styles.img}
                      source={{
                        uri: `https://geomap.imaginedesigns.co/storage/files/${item.attachment_directory}/${item.attachment_filename}`,
                      }}
                    />
                    <View style={{ width: "82%" }}>
                      <Text style={styles.txt5}>
                        {item.attachment_filename}
                      </Text>
                      <Text style={styles.completedTxt}>Uploaded Complete</Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FileUpload;

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
  fileUploadContainer: {
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
    paddingVertical: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  iconWrapper: {
    backgroundColor: "#FBA81A",
    height: 50,
    width: 50,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "black",
    paddingHorizontal: 13,
    paddingVertical: 2,
    borderRadius: 100,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: "black",
  },
  btnOutline: {
    backgroundColor: "white",
    paddingHorizontal: 13,
    paddingVertical: 2,
    borderRadius: 100,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: "black",
  },
  txt3: {
    fontSize: 13,
  },
  txt4: {
    fontWeight: "500",
  },
  smTxt: {
    fontSize: 13,
    color: "gray",
  },
  fileContainer: {
    gap: 15,
  },
  img: {
    width: 35,
    height: 35,
    // objectFit: "contain",
  },
  individual: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-betweem",
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "space-between",
  },
  txt5: {
    fontSize: 13,
  },
  completedTxt: {
    fontSize: 11,
    color: "#FBA81A",
    fontWeight: "600",
  },
  individualLeft: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
  },
  icon: {
    marginTop: -2,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: -100,
  },
});
