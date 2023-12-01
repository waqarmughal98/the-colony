import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Color from '../Color'
import { vw,vh } from '../utils/ScreenSize'
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import DateInput from '../Components/Date/DateInput'
const AddRequest = () => {
    const [reason,setReason]=useState("")
    const [requestType, setRequestType] = useState();
    const [days, setDays] = useState();
    const [Department, setDepartment] = useState();
    const data=["Holiday","Sickness","Overtime"]
    /* Check this data */
    const departmentData=["Office","Sickness","Overtime"]
  return (
    <View style={styles.mainContainer}>
        <ScrollView>
      <View style={styles.fieldsContainer}>
        <View >
            <Text style={styles.label}>Request Type*</Text>
            <SelectDropdown
                data={data}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome style={{marginRight:4}}  name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#5A5A5A'} size={16} />;
                  }}
                buttonStyle={{backgroundColor:"white",height:vh*5,width:"100%",borderRadius:10}}
                dropdownStyle={{marginTop: -(vh*4)}}
                buttonTextStyle={{fontSize:15}}
                /* Change the default value */
                defaultValue={data[0]}
                style={{backgroundColor:"white",height:20,}}
                onSelect={(selectedItem, index) => {
                    setRequestType(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return (selectedItem )  
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
                />
        </View >
        <View>
            <Text style={styles.label}>Reason*</Text>
            <TextInput value={reason} style={styles.reasonInput} onChangeText={(text)=>setReason(text)} />
        </View >
        <View>
            <Text style={styles.label}>Start Date*</Text>
            <DateInput editable={true}/>
        </View >
        <View>
            <Text style={styles.label}>End Date*</Text>
            <DateInput editable={true}/>
        </View >
        <View>
            <Text style={styles.label}>Days to be taken*</Text>
            <TextInput value={reason} style={styles.dayInput} onChangeText={(text)=>setReason(text)} />
        </View >
        <View >
            <Text style={styles.label}>Request Type*</Text>
            <SelectDropdown
                data={departmentData}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome style={{marginRight:4}}  name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#5A5A5A'} size={16} />;
                  }}
                buttonStyle={{backgroundColor:"white",height:vh*5,width:"100%",borderRadius:10}}
                dropdownStyle={{marginTop: -(vh*4)}}
                buttonTextStyle={{fontSize:15}}
                /* Change the default value */
                defaultValue={departmentData[0]}
                style={{backgroundColor:"white",height:20,}}
                onSelect={(selectedItem, index) => {
                    setDepartment(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return (selectedItem )  
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
                />
        </View >
        <View style={styles.btnContainer}>
           <TouchableOpacity activeOpacity={0.6}>
             <Text style={styles.submitTxt}>Submit</Text>
           </TouchableOpacity>
        </View>
        
        
      </View>
      </ScrollView>
    </View>
  )
}

export default AddRequest

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:Color.brightOrange
    },
    fieldsContainer:{
        paddingHorizontal:5*vw,
        width:100*vw,
        display:"flex",
        gap:2.5*vh,
        marginTop:4*vh
    },
    label:{
        fontSize:16,
        marginBottom:10
    },
    reasonInput:{
        height:15*vh,
        width:"100%",
        backgroundColor:"white",
        borderRadius:10,
        paddingHorizontal:15
    },
    dayInput:{
        height:45,
        width:"100%",
        backgroundColor:"white",
        borderRadius:10,
        paddingHorizontal:15
    }
,btnContainer:{
    backgroundColor:"black",
    display:"flex",
    justifyContent:'center',
    alignItems:"center",
    marginBottom:3*vh,
    marginTop:1.4*vh,
    height:45,
    borderRadius:10,
},
submitTxt:{
    color:"white",
    fontSize:17,
}
})