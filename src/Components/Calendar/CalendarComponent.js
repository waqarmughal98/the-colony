import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Color from '../../Color';
const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onDayPress = (day) => {
    // Update the state when a date is selected
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        theme={{
          todayTextColor: Color.darkOrange,
          selectedDayTextColor: 'white',
          selectedDayBackgroundColor: Color.darkOrange, // Selected date background color
          selectedDotColor: 'white',
          arrowColor: Color.darkOrange,
          dayTextColor:"black"
        }}
        markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    textAlign:"center"
  },
  selectedDate: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '500',
    textAlign:"center"
  },
});

export default CalendarComponent;
