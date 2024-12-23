import React, { useState } from 'react';
import { View, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../../utils/Constant';
import { Entypo, Ionicons } from '@expo/vector-icons';

const ImagePickerFiles = ({ setData, index, data, items, currentIndex }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async (sourceType) => {
    let hasPermission = false;

    // Request permissions based on source type
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

    // Show alert if permissions are denied
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        `We need ${sourceType === 'gallery' ? 'media library' : 'camera'} permissions to proceed.`
      );
      return;
    }

    try {
      // Launch the appropriate image picker
      let result;
      if (sourceType === 'gallery') {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else if (sourceType === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      // Handle the result
      if (result && !result.canceled) {
        setImage(result.assets[0].uri);
        const photo = {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        };

        // Upload the image
        uploadImage(photo, result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error while selecting an image:', error);
      Alert.alert('Error', 'An error occurred while selecting the image.');
    }
  };

  const uploadImage = async (photo, uri) => {
    try {
      setLoading(true);
      Toast.show({
        type: 'info',
        text1: 'Uploading Image...',
        text2: 'Please wait',
        visibilityTime: 2000,
        autoHide: false,
        topOffset: 5,
      });

      const authToken = await AsyncStorage.getItem('token');
      const form = new FormData();
      form.append('file', photo);

      const response = await fetch(`${URL}/fileupload`, {
        method: 'POST',
        body: form,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });

      const res = await response.json();

      if (response.ok) {
        const requestData = {
          uniqueid: res.directory,
          file_name: res.filename,
          attachments: 'yes',
          fileresource_type: 'project',
          fileresource_id: data?.project_id,
          filegroup_id: items[index]?.file_group_id,
        };

        const uploadResponse = await fetch(`${URL}/files/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (uploadResponse.ok) {
          setData((prevData) => {
            const newData = [...prevData];
            const updatedImages = [...newData[index]?.images || []];
            updatedImages.push(uri);
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
        } else {
          throw new Error('Failed to upload image details');
        }
      } else {
        throw new Error(res.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error While Uploading Image',
        text2: 'Image not uploaded',
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
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
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
});
