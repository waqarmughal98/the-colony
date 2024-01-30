  import {StyleSheet, Text, View, ActivityIndicator, TextInput, Switch, ScrollView, TouchableOpacity } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import Color from '../../Color';
  import MapView, { Marker } from 'react-native-maps';
  import axios from 'axios';
  import * as Location from 'expo-location';
  const Address = ({ data }) => {
    const inputFields = [
      { label: 'Street', value: '', key: 'street' },
      { label: 'City', value: '', key: 'city' },
      { label: 'Location Detail', value: '', key: 'locationDetail' },
      { label: 'Postcode', value: '', key: 'postcode' },
    ];

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [inputData, setInputData] = useState({
      street: data.lead_street,
      city: data.lead_city,
      locationDetail: data.lead_state,
      postcode: data.lead_zip,
    });

    const [loading, setLoading] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [coordinates, setCoordinates] = useState(null);

    const handleInputChange = (key, text) => {
      setInputData((prevInputData) => ({
        ...prevInputData,
        [key]: text,
      }));
    };

    /* Remove this when fetch data */
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);

    useEffect(() => {
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              inputData.city
            )}&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg`
          );  
          const { results } = response.data;
  
          if (results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            setCoordinates({ latitude: lat, longitude: lng });
          }
        } catch (error) {
          console.error('Error fetching coordinates:', error.message);
        }
      };
  
      fetchCoordinates();
    }, [inputData.city])

    useEffect(()=>{
      console.log(coordinates,"cordinates...")
    },[coordinates])


    
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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