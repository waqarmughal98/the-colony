import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { vw } from '../../utils/ScreenSize';
const DateInput = ({editable,name,setLeave, dateValue,setData}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate !== undefined) {
      setDate(selectedDate);
      setLeave((preData) => {
        if (name === "startDate") {
          return {
            ...preData,
            leave_start_date: selectedDate,
          };
        } else if (name === "endDate") {
          return {
            ...preData,
            leave_end_date: selectedDate,
          };
        } else {
          return preData; // If name is neither "startDate" nor "endDate", return the unchanged state
        }
      });
      setData((predata)=>({
        ...predata,date: selectedDate,
      }))
    }
  };

  const showDatePickerContainer = () => {
    setShowDatePicker(true);
  };
 
  return (
    editable?(
      <TouchableOpacity activeOpacity={0.6} onPress={showDatePickerContainer} style={{marginTop:-10 }}>
        <View style={[styles.container,{borderRadius: 10,width:vw*90,backgroundColor: name=="replyTicket" ? '#DFE1ED' : "white"}]}>
          {/* Left side: Date value */}
          <Text style={styles.dateValue}>{date?.toDateString()}</Text>
          {/* Right side: Calendar icon */}   
            <AntDesign name="calendar" size={22} color="black" />
          {/* Date Picker */}
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              textColor="red"
              accentColor='yellow'
              themeVariant='dark'
            />
          )}
        </View>
      </TouchableOpacity>
    ):(
    <View style={[styles.container,{borderRadius: 40, marginHorizontal:  60, width:vw*86,backgroundColor: "white"}]}>
      {/* Left side: Date value */}
      <Text style={styles.dateValue}>{dateValue}</Text>
      {/* Right side: Calendar icon */}   
        <AntDesign name="calendar" size={22} color="black" />
      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          textColor="red"
          accentColor='yellow'
          themeVariant='dark'
        />
      )}
    </View>
   )
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
    alignSelf:"center",
  },
  dateValue: {
    fontSize: 14,
  },
  calendarIcon: {
    marginLeft: 10,
  },
});

export default DateInput;
