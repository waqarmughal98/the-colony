import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { vh, vw } from '../../utils/ScreenSize';
import { Dimensions } from 'react-native';
const DateInput = ({editable,name,setLeave, dateValue,setData}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { width, height } = Dimensions.get('window');
  const isTablet = width > 800 || height > 800;
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

  function formatDate(inputDate) {
    const dateParts = inputDate.split(' ');
    const day = dateParts[2];
    const month = dateParts[1];
    const monthMap = {
        "Jan": "January",
        "Feb": "February",
        "Mar": "March",
        "Apr": "April",
        "May": "May",
        "Jun": "June",
        "Jul": "July",
        "Aug": "August",
        "Sep": "September",
        "Oct": "October",
        "Nov": "November",
        "Dec": "December"
    };
    const formattedDate = `${day} ${monthMap[month]}`;
    return formattedDate;
}
 
  return (
    editable?(
      <TouchableOpacity activeOpacity={0.6} onPress={showDatePickerContainer} style={{marginTop:-10 }}>
        <View style={[styles.container,{borderRadius: 10,width:isTablet? vw*95: vw*90,backgroundColor: name=="replyTicket" ? '#DFE1ED' : "white"}]}>
          {/* Left side: Date value */}
          <Text style={styles.dateValue}>{  formatDate(date?.toDateString())  }</Text>
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
              firstDayOfWeek={1} 
            />
          )}
        </View>
      </TouchableOpacity>
    ):(
    <View style={[styles.container,{borderRadius: 40, marginHorizontal:20, width:'100%',backgroundColor: "white"}]}>
      <Text style={styles.dateValue}>{dateValue}</Text>
        <AntDesign name="calendar" size={22} color="black" />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          textColor="red"
          accentColor='yellow'
          themeVariant='dark'
          firstDayOfWeek={1}

          
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
