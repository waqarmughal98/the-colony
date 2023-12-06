  import React, { useState, useEffect } from 'react';
  import { View, Image, TouchableOpacity, Button, Text, StyleSheet } from 'react-native';
  import * as ImagePicker from 'expo-image-picker';
  import { vh,vw } from '../../utils/ScreenSize';
  import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
  const ImagePickerComponent = () => {
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
      }
    };
  

    const handleRemoveImage = () => {
      setImage(null);
    };

    return (
      <View>
        <TouchableOpacity onPress={pickImage}>
          <View
            style={{
              width: vw*87,
              height: 150,
              borderWidth: 1,
              borderStyle: 'dashed',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop:20
            }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: "100%", borderRadius: 5 }}
              />
            ) : (
              <View style={styles.imgPickerContainer}>
                <Text style={styles.Text}> Please upload a screenshot of your location along with any photos to show the problem</Text>
                <Ionicons name="cloud-upload-outline" size={60} color="black" />
              </View>
            )}
          </View>
        </TouchableOpacity>
        {image && (
          <TouchableOpacity style={styles.removeBtn} onPress={handleRemoveImage}>
            <View style={styles.removeContainer}>
              <Text style={styles.text2}> Remove Image</Text>
              <MaterialCommunityIcons name="delete-forever" size={20} color="white" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  export default ImagePickerComponent;
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
    }
  })