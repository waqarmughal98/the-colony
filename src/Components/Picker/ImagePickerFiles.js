import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Button, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { URL } from '../../utils/Constant';
import axios from 'axios';
import { vh,vw } from '../../utils/ScreenSize';
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

    
    if (!result) {
      setImage(result.assets[0].uri);
      
      console.log(result.assets[0].uri);
      (async ()=>{
        const authToken = await AsyncStorage.getItem("token");
        if(!authToken){
           navigation.navigate("LoginScreen")
        }
   
        axios.post(URL + "/fileupload",{
          file:result.assets[0].uri
        },{
             headers: {
                Authorization: `Bearer ${authToken}`
            }
          }
        )
        .then(() => {
          // console.log(res.data.token);
          setData((prevData) => {
  
            const newData = [...prevData]; 
            const updatedImages = [...newData[index]?.images || []]; 
    
            updatedImages.push(result.assets[0].uri); 
    
    
    
            newData[index] = {
              ...newData[index],
              images: updatedImages,
            };
    
            return newData; // Return the updated array
          });
         Toast.show({
              type: 'success',
              text1: 'Image uploaded successfully!',
               visibilityTime:1000,
               topOffset:5,
            });
        })
        .catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Image not uplaoded ',
            visibilityTime:2000
          });
          console.log(err);
        })

    })()


 
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