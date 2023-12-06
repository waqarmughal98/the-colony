import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Button, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { vh,vw } from '../../utils/ScreenSize';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
const ImagePickerFiles = ({setData,index,data}) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setData((prevData) => {
        const newData = [...prevData]; // Create a shallow copy of the array
        const updatedImages = [...newData[index]?.images || []]; // Create a shallow copy of the images array

        updatedImages.push(result.assets[0].uri); // Add the new image URI to the images array

        // Update the images array in the object at the specified index
        newData[index] = {
          ...newData[index],
          images: updatedImages,
        };

        return newData; // Return the updated array
      });
    }
  };


  const handleRemoveImage = () => {
    setImage(null);
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