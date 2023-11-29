import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Switch,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Color from '../../Color';
import DateInput from '../Date/DateInput';

const Address = () => {
  const inputFields = [
    { label: 'Company', value: '', key: 'Company' },
    { label: 'Job Name', value: '', key: 'jobName' },
    { label: 'Job Type', value: '', key: 'jobType' },
    { label: 'Site Work Start Date', value: '', key: 'SiteWorkStartDate' },
    { label: 'Site Work End Date', value: '', key: 'SiteWorkEndDate' },
    { label: 'Category', value: '', key: 'Category' },
    { label: 'Po Number', value: '', key: 'PoNumber' },
    { label: 'Company Notes', value: '', key: 'CompanyNotes' },
    { label: 'Any Special Requirement', value: '', key: 'AnySpecialRequirement' },
    { label: 'Is a Hotel Required', value: '', key: 'hotel' },
    { label: 'Hotel Details', value: '', key: 'HotelDetails' },
    { label: 'Hotel Address', value: '', key: 'HotelAddress' },
    { label: 'Hotel PostCode', value: '', key: 'HotelPostCide' },
    { label: 'Is TM Required', value: '', key: 'tm' },
    { label: 'Enquiry Notes', value: '', key: 'EnquiryNotes' },
    { label: 'Status', value: '', key: 'Status' },
    { label: 'Topo QA Approved By', value: '', key: 'TopoQA' },
    { label: 'Utility QA Approved By', value: '', key: 'UtilityQA' },
    { label: 'Query Raised', value: '', key: 'QueryRaised' },
    { label: 'Job Info Sheet', value: '', key: 'JobInfo' },
    { label: 'Laser Scan/Drone', value: '', key: 'LaserScan' },
    { label: 'Topo Report', value: '', key: 'TopoReport' },
    { label: 'Utility Survey and Report', value: '', key: 'Survey' },
    { label: 'New Enquiry Notes', value: '', key: 'NewEnquiryNotes' },
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
          {inputFields.map((field,index) => {
            if (field.key === 'SiteWorkStartDate' || field.key === 'SiteWorkEndDate') {
              return (
                <View style={styles.inputContainer} key={index}>
                <Text style={styles.label}>{field.label}</Text>
                <DateInput/>
              </View>
              );
            }
            else if (field.key == 'hotel'){
             return (
              <View style={[styles.toggleContainer]} key={index}>
              <Text style={styles.label}>Is a Hotel Required?</Text>
              <Switch
                value={showMap}
                onValueChange={(value) => setShowMap(value)}
              />
            </View>
             )
            }
            else if (field.key == 'QueryRaised' || field.key == 'EnquiryNotes'){
              return (
                <View style={styles.inputContainer} key={index}>
                  <Text style={styles.label}>{field.label}</Text>
                  <TextInput
                    style={styles.inputTextArea}
                    multiline = {true}
                    numberOfLines = {8}
                    value={inputData[field.key]}
                    onChangeText={(text) => handleInputChange(field.key, text)}
                  />
                </View>
              )
             }
            else {
              return (
                <View style={styles.inputContainer} key={index}>
                  <Text style={styles.label}>{field.label}</Text>
                  <TextInput
                    style={styles.input}
                    value={inputData[field.key]}
                    onChangeText={(text) => handleInputChange(field.key, text)}
                  />
                </View>
              );
            }
          })}
          {/*Map View  */}
        
           {/* Buttons Container */}
          <View style={styles.buttonContainer}>
              <TouchableOpacity activeOpacity={0.6} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.button}>
              <Text style={styles.buttonText}>Move to Unallocated</Text>
              </TouchableOpacity>
          </View>
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
  input: {
    backgroundColor: 'white',
    borderRadius: 100,
    paddingVertical: 6,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  inputTextArea:{
    backgroundColor: 'white',
    borderRadius: 13,
    paddingVertical: 6,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
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
      marginTop: 30,
      paddingRight:20
      
    },
    button: {
      backgroundColor: 'black',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 10,
      marginRight:10
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
});
