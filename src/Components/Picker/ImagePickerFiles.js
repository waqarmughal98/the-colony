import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../../utils/Constant';
import axios from 'axios';

const ImagePickerFiles = ({setData,index,data,items,currentIndex}) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  console.log(items[currentIndex]?.file_group_id)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if (result) {
      console.log("ok");
      setImage(result.assets[0].uri);
    
      const authToken = await AsyncStorage.getItem("token");
    
      if (!authToken) {
        navigation.navigate("LoginScreen");
        return;
      }
    
      const photo = {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
    
      const form = new FormData();
      form.append("file", photo);
      console.log(form, "form");
    
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
        
          console.log(response, "response...........");
        
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
          text1: 'Error',
          text2: 'Image not uploaded',
          visibilityTime: 2000
        });
        console.error(error);
      });
    }
    
  };



  return (
    <View>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.right}>
          <Image source={require('../../../assets/imgs/addfile.png')} style={styles.Image4} />
        </View>
      </TouchableOpacity>
    {/*   {image && (
        <TouchableOpacity style={styles.removeBtn} onPress={handleRemoveImage}>
          <View style={styles.removeContainer}>
            <Text style={styles.text2}> Remove Image</Text>
            <MaterialCommunityIcons name="delete-forever" size={20} color="white" />
          </View>
        </TouchableOpacity>
      )} */}
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
})