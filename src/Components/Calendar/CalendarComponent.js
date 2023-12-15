import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Color from '../../Color';
const CalendarComponent = ({setSelectedDate}) => {
  const [selecteddate, setSelecteddate] = useState(null);

  const onDayPress = (day) => {
    // Update the state when a date is selected
    setSelecteddate(day.dateString);
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        theme={{
          todayTextColor: "white",
          selectedDayTextColor: '#000000',
          selectedDayBackgroundColor: "white", // Selected date background color
          selectedDotColor: 'white',
          arrowColor: "white",
          monthTextColor:"white",
          dayTextColor:"black",
          textDayStyle:{fontSize:15},
          calendarBackground:Color.darkOrange
        }}
        markedDates={selecteddate ? { [selecteddate]: { selected: true } } : {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor:Color.darkOrange,
    paddingHorizontal:20,
    paddingVertical:20
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    textAlign:"center"
  },
  selecteddate: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '500',
    textAlign:"center"
  },
});

export default CalendarComponent;
