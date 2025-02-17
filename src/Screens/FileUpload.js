import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
const FileUpload = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#EEE5DC' }}>
      <View style={styles.maiNContainer}>
        <View style={styles.header}>
          <Text style={styles.txt}>Assigned User: John Doe</Text>
          <Text style={styles.txt}>Stated Data: 02-25-2024</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.containerTop}>
            <MaterialCommunityIcons
              name="file-upload"
              size={29}
              color="black"
            />
            <Text style={styles.txt2}>Files Attachement</Text>
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
              >
                <Text style={[styles.txt3, { color: 'white' }]}>
                  Choose Files
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.btnOutline]}
              >
                <Text style={[styles.txt3, { color: 'black' }]}>
                  Camera
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.smTxt}>
            Only .jpg and .png files, 500 max file size.
          </Text>
          <View style={styles.fileContainer}>
            {Array(5)
              .fill(0)
              .map((item, index) => {
                return (
                  <View key={index} style={styles.individual}>
                    <View style={styles.individualLeft}>
                      <Image
                        style={styles.img}
                        source={require('../../assets/app-icon.png')}
                      />
                      <View>
                        <Text style={styles.txt5}>
                          Digital Marketing Agency
                        </Text>
                        <Text style={styles.completedTxt}>
                          Uploaded Complete
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.icon}>
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={20}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FileUpload;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#382504',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  maiNContainer: {
    flex: 1,
    paddingBottom: 70,
  },
  txt: {
    color: 'white',
    fontSize: 12,
  },
  container: {
    padding: 17,
    gap: 17,
    backgroundColor: '#EEE5DC',
    flex: 1,
  },
  containerTop: {
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
  },
  txt2: {
    fontSize: 15,
    fontWeight: '600',
  },
  fileUploadContainer: {
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 10,
    paddingVertical: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  iconWrapper: {
    backgroundColor: '#FBA81A',
    height: 50,
    width: 50,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'black',
    paddingHorizontal: 13,
    paddingVertical: 2,
    borderRadius: 100,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  btnOutline: {
    backgroundColor: 'white',
    paddingHorizontal: 13,
    paddingVertical: 2,
    borderRadius: 100,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  txt3: {
    fontSize: 13,
  },
  txt4: {
    fontWeight: '500',
  },
  smTxt: {
    fontSize: 13,
    color: 'gray',
  },
  fileContainer: {
    gap: 15,
  },
  img: {
    width: 35,
    height: 35,
    objectFit: 'contain',
  },
  individual: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-betweem',
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  txt5: {
    fontSize: 13,
  },
  completedTxt: {
    fontSize: 11,
    color: '#FBA81A',
    fontWeight: '600',
  },
  individualLeft: {
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
  },
  icon: {
    marginTop: -2,
  },
});
