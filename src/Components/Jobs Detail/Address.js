import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Switch,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Color from '../../Color';
import MapView, { Marker } from 'react-native-maps';

const Address = ({ data }) => {
  const inputFields = [
    { label: 'Street', value: '', key: 'street' },
    { label: 'City', value: '', key: 'city' },
    { label: 'Location Detail', value: '', key: 'locationDetail' },
    { label: 'Postcode', value: '', key: 'postcode' },
  ];

  const [inputData, setInputData] = useState(
    inputFields.reduce((acc, field) => {
      acc[field.key] = field.value;
      return acc;
    }, {})
  );

  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);

  const handleInputChange = (key, text) => {
    setInputData((prevInputData) => ({
      ...prevInputData,
      [key]: text,
    }));
  };

  /* Remove this later; this is dummy data */
  useEffect(() => {
    setInputData({
      street: 'asd',
      city: 'ads',
      locationDetail: 'dsa',
      postcode: 'dsa',
    });
  }, []); 

  /* Remove this when fetch data */
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {!loading ? (
        <View style={styles.container}>
          {inputFields.map((field) => (
            <View style={styles.inputContainer} key={field.key}>
              <Text style={styles.label}>{field.label}*</Text>
              <View style={styles.textContainer}>
                <Text style={styles.input}>{inputData[field.key]}</Text>
              </View>
            </View>
          ))}
          {/*Map View  */}
          <View style={styles.toggleContainer}>
            <Text style={styles.label}>Map View</Text>
            <Switch
              value={showMap}
              onValueChange={(value) => setShowMap(value)}
            />
          </View>

          {showMap ? (
            <View style={[styles.mapContainer]}>
              {/* Your map component goes here */}
                  <MapView
                  style={{ flex: 1, borderRadius:15 }}
                  initialRegion={{
                  latitude: 37.78825, // Replace with the initial latitude of your map
                  longitude: -122.4324, // Replace with the initial longitude of your map
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                  }}
              >
                  {/* You can add a marker if needed */}
                  <Marker
                  coordinate={{
                      latitude: 37.78825, // Replace with the marker's latitude
                      longitude: -122.4324, // Replace with the marker's longitude
                  }}
                  title="Marker Title"
                  description="Marker Description"
                  />
              </MapView>
            </View>
          ) : (
            <View style={styles.emptyMap}></View>
          )}
           {/* Buttons Container */}
          {/* <View style={styles.buttonContainer}>
              <TouchableOpacity activeOpacity={0.6} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.button}>
              <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
          </View> */}
        </View>
      ) : (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color={'black'} />
          <Text style={styles.fetchingData}>Fetching Data</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Address;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    minHeight: '100%',
    backgroundColor: Color.brightOrange,
    paddingHorizontal: 30,
    paddingBottom:250
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:"60%"
  },
  fetchingData: {
    color: 'black',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 15,
  },
  textContainer:{
    backgroundColor: 'white',
    borderRadius: 100,
    marginTop: 8,
    height:40,
    display:"flex",
    justifyContent:"center"
  },
  input: {
    paddingVertical: 6,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  mapContainer: {
    backgroundColor: 'white',
    height: 200,
    borderRadius: 10,
    overflow:"hidden"
  },
  emptyMap: {
    backgroundColor: 'white',
    height: 200,
    borderRadius: 10,
  },
  mapContainer:{
      height: 200,
      borderRadius: 10,
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 30,
      paddingHorizontal:40 
    },
    button: {
      backgroundColor: 'black',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
});