  import {StyleSheet, Text, View, ActivityIndicator, TextInput, Switch, ScrollView, TouchableOpacity } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import Color from '../../Color';
  import { WebView } from 'react-native-webview';
  const Address = ({ data }) => {
    const inputFields = [
      { label: 'Street', value: '', key: 'street' },
      { label: 'City', value: '', key: 'city' },
      { label: 'Location Detail', value: '', key: 'locationDetail' },
      { label: 'Postcode', value: '', key: 'postcode' },
    ];


    const [inputData, setInputData] = useState({
      street: data.lead_street,
      city: data.lead_city,
      locationDetail: data.lead_state,
      postcode: data.lead_zip,
    });

    const [loading, setLoading] = useState(true);
    const [showMap, setShowMap] = useState(false);
   
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
                <WebView
                  scrollEnabled={false}
                  style={styles.map_container}
                  originWhitelist={['*']}
                  source={{ html: `<iframe width="1100" height="700" src="http://maps.google.de/maps?hl=en&q=${inputData.street} ${inputData.city} ${inputData.locationDetail} ${inputData.locationDetail} ${inputData.postcode}&ie=UTF8&t=&z=17&iwloc=B&output=embed" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0"></iframe>` }}
                />
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
      height: 190,
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
      map_container:{
      }
  });