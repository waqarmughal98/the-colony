import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Color from '../../Color';
const CalendarComponent = ({setSelectedDate,AllDates}) => {
  const [selecteddate, setSelecteddate] = useState(null);

  const onDayPress = (day) => {
    // Update the state when a date is selected
    setSelecteddate(day.dateString);
    setSelectedDate(day.dateString)
  };
  function hexToRgbA(hex, alpha){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
        c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+ alpha +')';
    }
    throw new Error('Bad Hex');
  }

 markedDates = {};
 const colorsArray=generateRandomColors(AllDates.length)
  AllDates.forEach((dateRange,index) => {
      
      const dates = generateDateRangeArray(dateRange[0], dateRange[1]);
          dates.forEach((date) => {
              markedDates[date] = {
                  periods: [
                { startingDay: date== dateRange[0] ?true: false, endingDay: date==dateRange[1]?true:false, color: colorsArray[index] },
                  ]
              };
          });
  });

  function generateRandomColors(length) {
    const colors = [];
    const hexChars = '0123456789ABCDEF';

    for (let i = 0; i < length; i++) {
        let color = '#';
        for (let j = 0; j < 6; j++) {
            color += hexChars[Math.floor(Math.random() * 16)];
        }
        colors.push(color);
    }

    return colors;
}

  function generateDateRangeArray(startDate, endDate) {
    let dateArray = [];
    let currentDate = new Date(startDate);
   let EndDate=new Date(endDate)

    while (currentDate <= EndDate) {
        let year = currentDate.getFullYear();
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        let day = currentDate.getDate().toString().padStart(2, '0');
        let dateString = `${year}-${month}-${day}`;
        dateArray.push(dateString);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}

  console.log(AllDates,"alldates")

  const todayBackgroundColor = hexToRgbA('#FFFFFF', 0.5);
  const markColor = hexToRgbA('#FFFFFF', 0.6);
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        hideExtraDays={true}
        enableSwipeMonths={true}
        theme={{
          selectedDayTextColor: '#000000',
          selectedDayBackgroundColor: "white", // Selected date background color
          selectedDotColor: 'white',
          arrowColor: "black",
          monthTextColor:"black",
          textDisabledColor:"black",
          dayTextColor:"black",
          textSectionTitleDisabledColor:"black",
          todayBackgroundColor: todayBackgroundColor,
          todayTextColor:"black",
          textDayFontWeight:"800",
          textDayStyle:{fontSize:15,fontWeight:"800"},
          calendarBackground:Color.darkOrange,
          textSectionTitleColor:"black",
          dayTextColor:"black"
   
        }}
        markingType="multi-period" 
        markedDates={markedDates}
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
