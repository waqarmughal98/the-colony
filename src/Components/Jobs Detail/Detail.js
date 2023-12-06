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

const Address = ({data}) => {
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
    { label: 'Hotel Details', value: '', key: 'HotelDetails' },
    { label: 'Hotel Address', value: '', key: 'HotelAddress' },
    { label: 'Hotel PostCode', value: '', key: 'HotelPostCode' },
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
    { label: 'New Enquiry Notes', value: '', key: 'EnquiryNotes' },
  ];

  const [inputData, setInputData] = useState({
    Company: data.client_company_name,
    jobName: data.project_title,
    jobType: data.project_type,
    SiteWorkStartDate: data.project_date_start,
    SiteWorkEndDate: data.project_date_due,
    Category: data.category_name,
    PoNumber: data.project_custom_field_1,
    CompanyNotes: "",
    AnySpecialRequirement: data.lead_custom_field_1,
    hotel: "",
    HotelDetails: data.project_custom_field_2,
    HotelAddress: data.project_custom_field_3,
    HotelPostCode: data.project_custom_field_4,
    tm: data.project_custom_field_31,
    EnquiryNotes: data.lead_custom_field_47,
    Status: data.project_status,
    TopoQA: data.project_custom_field_6,
    UtilityQA: data.project_custom_field_7,
    QueryRaised: data.project_custom_field_21,
    JobInfo: data.project_description,
    LaserScan: data.project_custom_field_45,
    TopoReport: data.project_custom_field_48,
    Survey: data.project_custom_field_50,
    NewEnquiryNotes: "",
  });

  const [loading, setLoading] = useState(true);

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
                <DateInput editable={false}/>
              </View>
              );
            }
            else if (field.key == 'QueryRaised' || field.key == 'EnquiryNotes'){
              return (
                <View style={styles.inputContainer} key={index}>
                  <Text style={styles.label}>{field.label}</Text>
                  <Text style={styles.inputTextArea}>{inputData[field.key]}</Text> 
                </View>
              )
             }
            else {
              return (
                <View style={styles.inputContainer} key={index}>
                  <Text style={styles.label}>{field.label}</Text>
                  <View style={styles.textContainer}>
                     <Text style={styles.input}>{inputData[field.key]}</Text>
                  </View>
                </View>
              );
            }
          })}
 
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
    height:40,
    display:"flex",
    justifyContent:"center",
    borderRadius: 100,
    marginTop: 8,
  },
  input: { 
    paddingVertical: 6,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  inputTextArea:{
    backgroundColor: 'white',
    borderRadius: 13,
    paddingVertical: 6,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 8,
    height:150
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
