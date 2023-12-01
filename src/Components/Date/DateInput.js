import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { vw } from '../../utils/ScreenSize';
const DateInput = ({editable}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate !== undefined) {
      setDate(selectedDate);
    }
  };

  const showDatePickerContainer = () => {
    setShowDatePicker(true);
  };
  
 
  return (
    editable?(
     <TouchableOpacity activeOpacity={0.6} onPress={showDatePickerContainer} style={{marginTop:-10}}>
        <View style={styles.container}>
        {/* Left side: Date value */}
        <Text style={styles.dateValue}>{date.toDateString()}</Text>
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
    )
   :
   (
    <View style={styles.container}>
    {/* Left side: Date value */}
    <Text style={styles.dateValue}>{date.toDateString()}</Text>
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal:20,
    width:vw*88,
    marginLeft: -8,
    alignSelf:"center"
  },
  dateValue: {
    fontSize: 14,
  },
  calendarIcon: {
    marginLeft: 10,
  },
});

export default DateInput;
