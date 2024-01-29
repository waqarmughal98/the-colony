import React, { useState, useEffect } from 'react';
import { View,Alert, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../../utils/Constant';
import { Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const ImagePickerFiles = ({setData,index,data,items,currentIndex}) => {
  const [image, setImage] = useState(null);
  const [mediaLibraryStatus, setMediaLibraryStatus] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(null);
  useEffect(() => {
    (async () => {
      const requestPermissions = async () => {
        const { status: mediaLibraryPermission } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraPermission } = await ImagePicker.requestCameraPermissionsAsync();
  
        setMediaLibraryStatus(mediaLibraryPermission);
        setCameraStatus(cameraPermission);
  
        if (mediaLibraryPermission !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
  
        if (cameraPermission !== 'granted') {
          Alert.alert('Sorry, we need camera permissions to make this work!');
        }
      };
  
      requestPermissions();
    })();
  }, []);

  
  console.log(items[currentIndex]?.file_group_id)

  const pickImage = async (sourceType) => {
    
    // No permissions request is necessary for launching the image library
    var result 
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
    
      const authToken = await AsyncStorage.getItem("token");
    
      if (!authToken) {
        navigation.navigate("LoginScreen");
        return;
      }
    
      console.log(result.assets[0].uri,"log....")
      console.log(result,"result....")
      console.log(result.uri,"uri....")
      const uriParts = result.assets[0].uri.split('/');

      const photo = {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: uriParts[uriParts.length - 1],
      };
    
      const form = new FormData();
      form.append("file", photo);
      console.log(form, "form");
     
      Toast.show({
        type: 'success',
        text1: 'Image is ready to Upload!',
        text2: 'Wait! It takes some time',
        visibilityTime: 2000,
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
        console.log(res, "res...");
    
        const authToken = await AsyncStorage.getItem("token");

        const requestData = {
          uniqueid: res.directory,
          file_name: res.filename,
          attachments: "yes",
          fileresource_type: "project",
          fileresource_id: data?.project_id,
          filegroup_id: items[currentIndex]?.file_group_id,
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