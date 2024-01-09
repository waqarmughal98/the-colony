import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { vh } from '../../utils/ScreenSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; // Import icons from Expo vector icons
import { URL } from '../../utils/Constant';

const FileModal = ({ toggleModal, setData, data }) => {
  const [folder, setFolder] = useState('');
  const [selectedType, setSelectedType] = useState('gallery');

  const handleAdd = () => {
    if (folder) {
      (async () => {
        const authToken = await AsyncStorage.getItem('token');
        if (!authToken) {
          navigation.navigate('LoginScreen');
        }

        const params = {
          filefolder_name: folder,
          fileresource_type: 'project',
          fileresource_id: data?.project_id,
        };

        axios
          .post(URL + '/filegroups/savefolder', {}, { params, headers: { Authorization: `Bearer ${authToken}` } })
          .then((res) => {
            console.log(res.data.token);
            toggleModal();
            setData((preData) => [
              ...preData,
              {
                FolderName: folder,
                images: [],
              },
            ]);
            Toast.show({
              type: 'success',
              text1: 'Folder added successfully!',
              visibilityTime: 1000,
              topOffset: 5,
            });
          })
          .catch((err) => {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Folder did not add ',
              visibilityTime: 2000,
            });
            console.log(err);
          });
      })();
    } else {
      Alert.alert('Enter Folder Name first');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Create Folder</Text>
      <View>
        <TextInput
          value={folder}
          placeholder="Write Folder Name..."
          multiline={true}
          textAlignVertical="top"
          numberOfLines={5}
          style={styles.discInput}
          onChangeText={(text) => setFolder(text)}
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setSelectedType('gallery')}>
          <AntDesign name={selectedType === 'gallery' ? 'folderopen' : 'folder1'} size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedType('camera')}>
          <MaterialIcons name={selectedType === 'camera' ? 'photo-camera' : 'photo-library'} size={30} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btnContainer} activeOpacity={0.6} onPress={handleAdd}>
        <Text style={styles.submitTxt}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FileModal;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 19,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
  },
  discInput: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  btnContainer: {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1 * vh,
    marginTop: 2.4 * vh,
    height: 45,
    borderRadius: 10,
  },
  submitTxt: {
    color: 'white',
    fontSize: 17,
  },
});
