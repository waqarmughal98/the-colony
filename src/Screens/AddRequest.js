import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Color from '../Color'
import { vw,vh } from '../utils/ScreenSize'
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import DateInput from '../Components/Date/DateInput'
const AddRequest = () => {
    const [leave, setLeave] = useState({
        leave_title: "",
        leave_start_date: "",
        leave_end_date: "",
        leave_reason: "",
        leave_type: "",
        day_to_taken: "",
        department: "",
    })

    const handleDateChange = (e) =>{
        console.log('worked')
    }

    const updateLeave = (value, field)=> {
        setLeave({...leave, [field]: value})
        console.log(leave, field, 'value');
    }

    const data=["Holiday","Sickness","Overtime"]
    /* Check this data */
    const departmentData=["Office","Sickness","Overtime"]
  return (
    <View style={styles.mainContainer}>
        <ScrollView>
      <View style={styles.fieldsContainer}>
        <View>
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
                defaultValue={leave.leave_type}
                style={{backgroundColor:"white",height:20,}}
                onSelect={(selectedItem, index) => {
                    updateLeave(selectedItem, 'leave_type')
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return (selectedItem)  
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
                />
        </View>
        <View>
            <Text style={styles.label}>Reason Title*</Text>
            <TextInput value={leave.leave_title} style={styles.dayInput} onChangeText={(text)=>updateLeave(text, 'leave_title')} />
        </View>
        <View>
            <Text style={styles.label}>Reason*</Text>
            <TextInput value={leave.leave_reason} multiline={true} textAlignVertical="top"  numberOfLines={6} style={styles.reasonInput} onChangeText={(text)=>updateLeave(text, "leave_reason")} />
        </View>
        <View>
            <Text style={styles.label}>Start Date*</Text>
            <DateInput editable={true} handleDateChange={handleDateChange}/>
        </View>
        <View>
            <Text style={styles.label}>End Date*</Text>
            <DateInput editable={true} handleDateChange={handleDateChange}/>
        </View>
        <View>
            <Text style={styles.label}>Days to be taken*</Text>
            <TextInput value={leave.day_to_taken} style={styles.dayInput} onChangeText={(text)=>updateLeave(text, 'day_to_taken')} />
        </View>
        <View >
            <Text style={styles.label}>Department*</Text>
            <SelectDropdown
                data={departmentData}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome style={{marginRight:4}}  name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#5A5A5A'} size={16} />;
                  }}
                buttonStyle={{backgroundColor:"white",height:vh*5,width:"100%",borderRadius:10}}
                dropdownStyle={{marginTop: -(vh*4)}}
                buttonTextStyle={{fontSize:15}}
                /* Change the default value */
                defaultValue={leave.department}
                style={{backgroundColor:"white",height:20,}}
                onSelect={(selectedItem, index) => {
                    updateLeave(selectedItem, 'department')
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return (selectedItem )  
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
                />
        </View>
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
        width:"100%",
        backgroundColor:"white",
        borderRadius:10,
        padding:12
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