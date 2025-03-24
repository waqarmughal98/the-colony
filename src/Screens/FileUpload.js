import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState, useMemo } from "react"; // Added useMemo
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "../utils/Constant";
import * as ImagePicker from "expo-image-picker";
import { vw } from "../utils/ScreenSize";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const FileUpload = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { items, Alldata, screenName } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
        type: "image/jpeg",
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

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  // Shimmer Skeleton Component with Animation (for global loading)
  const ShimmerSkeleton = () => {
    const shimmerTranslate = useSharedValue(0);

    useEffect(() => {
      shimmerTranslate.value = withRepeat(
        withTiming(1, { duration: 1000 }),
        -1, // Infinite repeat
        true // Reverse
      );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: shimmerTranslate.value * 200 - 100,
        },
      ],
    }));

    return (
      <View style={styles.skeletonContainer}>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              style={[
                styles.skeletonItem,
                { height: index % 2 === 0 ? 150 : 200 },
              ]}
            >
              <Animated.View style={[styles.shimmerLayer, animatedStyle]}>
                <LinearGradient
                  colors={["#E0E0E0", "#F0F0F0", "#E0E0E0"]}
                  style={styles.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </Animated.View>
            </View>
          ))}
      </View>
    );
  };

  // Shimmer for individual images
  const ImageWithShimmer = ({ uri, onPress }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const shimmerTranslate = useSharedValue(0);

    useEffect(() => {
      shimmerTranslate.value = withRepeat(
        withTiming(1, { duration: 1000 }),
        -1,
        true
      );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: shimmerTranslate.value * 200 - 100,
        },
      ],
    }));

    const randomHeight = Math.random() * 100 + 100;

    return (
      <TouchableOpacity onPress={onPress}>
        {imageLoading && (
          <View style={[styles.imageContainer, { height: randomHeight }]}>
            <Animated.View style={[styles.shimmerLayer, animatedStyle]}>
              <LinearGradient
                colors={["#E0E0E0", "#F0F0F0", "#E0E0E0"]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>
        )}
        <Image
          source={{ uri }}
          style={[styles.imageContainer, { height: randomHeight }]}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
      </TouchableOpacity>
    );
  };

  // Split data into two columns for masonry-like layout
  const splitDataIntoColumns = () => {
    const leftColumn = [];
    const rightColumn = [];
    data.forEach((item, index) => {
      const uri = `https://geomap.imaginedesigns.co/storage/files/${item.attachment_directory}/${item.attachment_filename}`;
      if (index % 2 === 0) {
        leftColumn.push({ uri });
      } else {
        rightColumn.push({ uri });
      }
    });
    return [leftColumn, rightColumn];
  };

  // Memoize the column split
  const [leftColumn, rightColumn] = useMemo(
    () => splitDataIntoColumns(),
    [data]
  );

  // Render Item for FlashList
  const renderItem = ({ item }) => (
    <ImageWithShimmer
      uri={item.uri}
      onPress={() => handleImagePress(item.uri)}
    />
  );

  return (
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
            {loading ? (
              <ShimmerSkeleton />
            ) : data.length === 0 ? (
              <View>
                <Text>No attachments found</Text>
              </View>
            ) : (
              <View style={styles.masonryContainer}>
                <View style={styles.column}>
                  <FlashList
                    data={leftColumn}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `left-${index}`}
                    estimatedItemSize={150}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
                <View style={styles.column}>
                  <FlashList
                    data={rightColumn}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `right-${index}`}
                    estimatedItemSize={150}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </View>
            )}
            <Modal visible={modalVisible} transparent animationType="fade">
              <View style={styles.modalContainer}>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.fullImage}
                />
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
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
    flex: 1,
  },
  masonryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: 2,
  },
  imageContainer: {
    borderRadius: 10,
    width: "100%",
    marginBottom: 4,
    backgroundColor: "#E0E0E0",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "80%",
    resizeMode: "contain",
  },
  closeBtn: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    marginTop: 10,
  },
  skeletonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  skeletonItem: {
    width: "48%",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  shimmerLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gradient: {
    width: 200,
    height: "100%",
  },
});
