import React, { useState, useEffect } from 'react';
import { View,Alert, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../../utils/Constant';
import { Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const ImagePickerFiles = ({setData,index,data,items,currentIndex}) => {
  console.log(currentIndex,"currentIndex")
  console.log(index,"index")
  const [image, setImage] = useState(null);
  const [mediaLibraryStatus, setMediaLibraryStatus] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(null);
  const [loading , setLoading] = useState(false);

  const pickImage = async (sourceType) => {
    let hasPermission = false;

  if (sourceType === 'gallery') {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      const { status: requestStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      hasPermission = requestStatus === 'granted';
    } else {
      hasPermission = true;
    }
  } else if (sourceType === 'camera') {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== 'granted') {
      const { status: requestStatus } = await ImagePicker.requestCameraPermissionsAsync();
      hasPermission = requestStatus === 'granted';
    } else {
      hasPermission = true;
    }
  }

  if (!hasPermission) {
    Alert.alert(
      'Permission Required',
      `We need ${sourceType === 'gallery' ? 'media library' : 'camera'} permissions to proceed.`
    );
    return; // Exit if permissions are not granted
  }

    // No permissions request is necessary for launching the image library
    let result;
    if(sourceType=="gallery" && mediaLibraryStatus=="granted"){
      result= await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
    }
    if(sourceType=="camera" && cameraStatus=="granted"){
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
    

    if (result) {
      setImage(result.assets[0].uri);
      const photo = {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      const form = new FormData();
      form.append("file", photo);
      setLoading(true)
      Toast.show({
        type: 'info',
        text1: 'Uploading Image...',
        text2: 'Please wait',
        visibilityTime: 2000,
        autoHide: false, // Prevents auto-hide while loading
        topOffset: 5,
      });
      fetch(`${URL}/fileupload`, {
        method: "POST",
        body: form,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then((response) => response.json())
      .then(async (res) => {
        const authToken = await AsyncStorage.getItem("token");

        const requestData = {
          uniqueid: res.directory,
          file_name: res.filename,
          attachments: "yes",
          fileresource_type: "project",
          fileresource_id: data?.project_id,
          filegroup_id: items[index]?.file_group_id,
        };
        
        try {
          const response = await axios.post(`${URL}/files/upload`, requestData, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            },
          });
          setData((prevData) => {
            const newData = [...prevData];
            const updatedImages = [...newData[index]?.images || []];
            updatedImages.push(result.assets[0].uri);
            newData[index] = {
              ...newData[index],
              images: updatedImages,
            };
            return newData;
          });
        
          Toast.show({
            type: 'success',
            text1: 'Image uploaded successfully!',
            visibilityTime: 1000,
            topOffset: 5,
          });
        } catch (error) {
          console.error(error);
          Toast.hide();
        }
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Error While Uploading Image',
          text2: 'Image not uploaded',
          visibilityTime: 2000
        });
        console.error(error);
        Toast.hide();
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => pickImage('camera')}>
        <Entypo name="camera" size={20} color="#5A5A5A" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pickImage('gallery')}>
        <Ionicons name="images" size={20} color="#5A5A5A" style={styles.icon} />
      </TouchableOpacity>
</View>
  );
};

export default ImagePickerFiles;
const styles = StyleSheet.create({
  imgPickerContainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:'center'
  },
  Text:{
    fontWeight:"600",
    textAlign:"center",
    marginVertical:10,
  },
  removeContainer:{
    display:"flex",
    flexDirection:'row'
  },
  removeBtn:{
    backgroundColor:"black",
    display:"flex",
    flexDirection:'row',
    justifyContent:"center",
    alignContent:'center',
    paddingVertical:6,
    borderRadius:5
  },
  text2:{
    fontSize:15,
    color:"white",
    marginRight:3
  },
  Image4:{
    height:25,
    width:25,
  },
  container:{
    display:"flex",
    flexDirection:"row",
    gap:10,
    alignItems:"center"
  }
})