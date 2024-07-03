import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import Color from '../Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { URL } from '../utils/Constant';
const LatestActivity = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  /* Remove this when fethc data */
  useEffect(() => {
    (async () => {
      const authToken = await AsyncStorage.getItem('token');
      await axios
        .get(URL + '/comments/list', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          setItems(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    })();
  }, []);

  const FilterData = async (Id) => {
    const authToken = await AsyncStorage.getItem('token');
    axios
      .get(URL + '/job-status', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        let filteredData = res?.data?.projects?.data?.filter(
          (item) => item?.project_id == Id
        );
        if (filteredData.length > 0) {
          navigation.navigate('jobs-detail', {
            items: filteredData[0],
            tabId: 5,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'There is no relevant data against this activity!',
             visibilityTime:1500,
             topOffset:5
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <ScrollView style={styles.mainContainer}>
        {!loading ? (
          <View style={styles.Container}>
            {items &&
              items?.map((item, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() =>
                      FilterData(item?.commentresource_id)
                    }
                    style={[
                      styles.individual,
                      {
                        backgroundColor:
                          index % 2 != 0 ? '#F0F4F7' : '#FFE6AE',
                      },
                    ]}
                    key={index}
                  >
                    <View style={styles.individual_left}>
                      <FontAwesome
                        name="commenting"
                        size={50}
                        color="lightblue"
                      />
                    </View>
                    <View style={styles.individual_right}>
                      <View style={styles.text1container}>
                        {/* <Text style={styles.text1}>{item?.comment_text}</Text> */}
                        <Text>
                          Updated on{' '}
                          {item?.comment_updated?.slice(0, 10)}{' '}
                        </Text>
                      </View>
                      <Text style={styles.text2}>
                        {item?.comment_text}
                      </Text>
                      <Text style={styles.text3}>
                        {item?.project_title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        ) : (
          <View style={styles.Indicator}>
            <ActivityIndicator size="large" color={'black'} />
            <Text style={styles.fetchingData}>Fetching Data</Text>
          </View>
        )}
      </ScrollView>
      <Toast/>
    </View>
  );
};

export default LatestActivity;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  Container: {
    height: '100%',
    backgroundColor: 'white',
    paddingBottom: 170,
  },
  Indicator: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '60%',
  },
  fetchingData: {
    color: 'black',
    fontFamily: "Sommet-Black",
  },
  individual: {
    backgroundColor: '#FFE6AE',
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  updateBg: {
    alignSelf: 'flex-start',
  },
  text4: {
    padding: 8,
    fontFamily: "Sommet-Regular",
    borderRadius: 5,
  },
  individual_left: {
    flex: 0.3,
    alignItems: 'center',
    marginTop: 15,
  },
  individual_right: {
    flex: 0.7,
    padding: 10,
  },
  text1container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    marginVertical: 8,
    alignItems: 'center',
  },
  text1: {
    marginRight: 5,
    fontFamily: "Sommet-Regular",
    color: Color.darkOrange,
  },
  text2: {
    marginBottom: 8,
    fontFamily: "Sommet-Regular",
    textTransform: 'capitalize',
  },
  text3: {
    marginBottom: 8,
    fontFamily: "Sommet-Regular",
    color: Color.darkOrange,
  },
});
