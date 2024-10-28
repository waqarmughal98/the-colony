import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import DateInput from '../Components/Date/DateInput';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { URL } from '../utils/Constant';

const ReplyTicket = ({ navigation, route }) => {
  const { jobTitle, id, subject, ticketDetails } = route.params;
  const [mediaLibraryStatus, setMediaLibraryStatus] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileUpload, setfileUpload] = useState(false);
  const [fileData, setFileData] = useState('');
  const [imageData, setImageData] = useState();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [data, setData] = useState({
    date: getCurrentDate(),
    Subject: subject,
    Job: jobTitle,
    Problem: '',
  });


  useEffect(() => {
    const requestPermissions = async () => {
      const { status: mediaLibraryPermission } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraPermission } =
        await ImagePicker.requestCameraPermissionsAsync();

      setMediaLibraryStatus(mediaLibraryPermission);
      setCameraStatus(cameraPermission);

      if (mediaLibraryPermission !== 'granted') {
        Alert.alert(
          'Sorry, we need camera roll permissions to make this work!'
        );
      }

      if (cameraPermission !== 'granted') {
        Alert.alert(
          'Sorry, we need camera permissions to make this work!'
        );
      }
    };

    requestPermissions();
  }, []);

  console.log(data,"data")

  const pickImage = async (sourceType) => {
    let result;
    if (
      sourceType === 'gallery' &&
      mediaLibraryStatus === 'granted'
    ) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
    if (sourceType === 'camera' && cameraStatus === 'granted') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
    if (!result.canceled) {
      console.log(result.assets[0].uri);

      const uriParts = result.assets[0].uri.split('/');
      const filename = uriParts[uriParts.length - 1];
      setFileName(filename);
      const photo = {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: filename,
      };

      Toast.show({
        type: 'success',
        text1: 'Image is ready to upload!',
        text2: 'kindly wait few seconds',
        visibilityTime: 2000,
        topOffset: 5,
      });
      setImageData(photo);
      await UploadFile(photo);
    }
  };

  const UploadFile = async (photo) => {
    const photoForm = new FormData();
    photoForm.append('file', photo);
    const authToken = await AsyncStorage.getItem('token');
    fetch(`${URL}/fileupload`, {
      method: 'POST',
      body: photoForm,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        Toast.show({
          type: 'success',
          text1: 'Image uploaded successfully!',
          visibilityTime: 2000,
          topOffset: 5,
        });
        setFileData(res);
        setfileUpload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleData = (value, field) => {
    setData({ ...data, [field]: value });
  };

  const submitReply = async () => {
    const replyFormData = new FormData();
    replyFormData.append('ticketreply_ticketid', id);
    replyFormData.append('ticketreply_text', data?.Problem);
    replyFormData.append('attachments', imageData);
    const authToken = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        `${URL}/problemreports/${id}/postreply`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: replyFormData,
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Reply submitted successfully!',
          text2: 'we are redirect you to previous screen',
          visibilityTime: 1000,
          topOffset: 5,
        });

        setTimeout(() => {
          navigation.navigate('problem-report-replies', {
            id2: id,
            reply: data,
            ticketDetail: ticketDetails,
            jobTitle2: jobTitle,
            subject2: subject,
          });
        }, 1000);
      } else {
        throw new Error(
          responseData.message || 'Error while submitting!'
        );
      }
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Error while submitting!',
        visibilityTime: 1000,
        topOffset: 5,
      });
    }
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let formatedData =formatDate(date.toString().slice(0,10))
    setData((pre)=>({...pre,date:formatedData}))
    hideDatePicker();
  };

  function formatDate(input) {
    const date = new Date(input + " 2024");
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View>
            <Text style={[styles.label, { marginBottom: 5 }]}>
              Date
            </Text>
             <TouchableOpacity activeOpacity={0.6} style={[styles.input,{justifyContent:'center'}]} onPress={showDatePicker}>
                  <Text>{data.date}</Text>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
              </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              value={data.Subject}
              style={styles.input}
              onChangeText={(text) => handleData(text, 'Subject')}
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
              Please describe the problem in detail below:*
            </Text>
            <TextInput
              value={data.Problem}
              style={styles.input2}
              multiline={true}
              numberOfLines={8}
              textAlignVertical="top"
              onChangeText={(text) => handleData(text, 'Problem')}
            />
          </View>
          <View>
            <Text style={styles.label}>Upload Image:*</Text>
            <TouchableOpacity onPress={() => pickImage('gallery')}>
              <Ionicons
                name="images"
                size={50}
                color="#5A5A5A"
                style={styles.icon}
              />
            </TouchableOpacity>
            {fileName && fileUpload && <Text>{fileName}</Text>}
            {fileUpload && (
              <Text style={{ color: 'green', fontWeight: 'bold' }}>
                Image Uploaded Successfully!
              </Text>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={submitReply}
            disabled={!fileUpload || !data?.Problem}
          >
            <View
              style={[
                styles.btnContainer,
                {
                  backgroundColor:
                    !fileUpload || !data?.Problem ? 'gray' : 'black',
                },
              ]}
            >
              <Text
                style={[
                  styles.submitTxt,
                  {
                    color:
                      !fileUpload || !data?.Problem
                        ? 'darkgray'
                        : 'white',
                  }, // Change text color too if needed
                ]}
              >
                Reply
              </Text>
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
    backgroundColor: 'white',
  },
  mainContainer: {
    padding: 20,
    display: 'flex',
    gap: 15,
    paddingBottom: 70,
  },
  label: {
    fontSize: 15,
  },
  input: {
    backgroundColor: '#DFE1ED',
    height: 40,
    marginTop: 5,
    borderRadius: 7,
    paddingHorizontal: 10,
  },
  dateInput: {
    backgroundColor: '#DFE1ED',
    height: 40,
    marginTop: 5,
    borderRadius: 7,
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  input2: {
    backgroundColor: '#DFE1ED',
    height: 150,
    marginTop: 5,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  btnContainer: {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
  },
  submitTxt: {
    color: 'white',
    fontSize: 17,
  },
});
