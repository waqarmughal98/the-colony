import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Color from '../../Color';
import { vh } from '../../utils/ScreenSize';
const CalendarComponent = ({ setSelectedDate, AllDates }) => {
  const [selecteddate, setSelecteddate] = useState(null);
  const [markingDates, setMarkingDates] = useState();
  const [datesArray, setDatesArray] = useState([]);
  const onDayPress = (day) => {
    // Update the state when a date is selected
    setSelecteddate(day.dateString);
    setSelectedDate(day.dateString);
  };
  function hexToRgbA(hex, alpha) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return (
        'rgba(' +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
        ',' +
        alpha +
        ')'
      );
    }
    throw new Error('Bad Hex');
  }



  const colorsArray2 = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'white',
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'white',
  ];

  useEffect(() => {
    extractDateRange();
  }, []);

  useEffect(() => {
    if (datesArray) {
      makeMarkDates();
    }
  }, [datesArray]);

  const extractDateRange = async () => {
    AllDates.forEach((dateRange, index) => {
      const dates = generateDateRangeArray(
        dateRange[0],
        dateRange[1]
      );
      setDatesArray((pre) => [...pre, dates]);
    });
  };

  const makeMarkDates = () => {
    markedDates = {};
    datesArray.forEach((individual_array, index) => {
      individual_array.forEach((date) => {
        const resultData = checkDateInArray(date);
        console.log(resultData, 'resultData');
        var periodArray = [];
            for (var i = 0; i <= Math.max(...resultData[0]); i++) {
              if (resultData[0].includes(i)) {
                periodArray[i] = {
                  startingDay: false,
                  endingDay: false,
                  color: colorsArray2[i] || 'white',
                };
              } else {
                periodArray[i] = {
                  color: 'transparent',
                };
              }
            }

        markedDates[date] = {
          periods: periodArray,
        };
      });
    });
    setMarkingDates(markedDates);
  };

  const checkDateInArray = (dateString) => {
    var resultData = [[], 0];
    datesArray.forEach((individual_array, index) => {
      individual_array.forEach((date) => {
        if (date == dateString) {
          resultData[0].push(index);
          resultData[1] = resultData[1] + 1;
          resultData[2] = date;
        }
      });
    });
    return resultData;
  };


  function generateDateRangeArray(startDate, endDate) {
    let dateArray = [];
    let currentDate = new Date(startDate);
    let EndDate = new Date(endDate);

    while (currentDate <= EndDate) {
      let year = currentDate.getFullYear();
      let month = (currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0');
      let day = currentDate.getDate().toString().padStart(2, '0');
      let dateString = `${year}-${month}-${day}`;
      dateArray.push(dateString);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  }


  const todayBackgroundColor = hexToRgbA('#FFFFFF', 0.5);

  return markingDates ? (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        hideExtraDays={true}
        enableSwipeMonths={true}
        theme={{
          selectedDayBackgroundColor: 'white',
          selectedDotColor: 'white',
          arrowColor: 'black',
          monthTextColor: 'black',
          textDisabledColor: 'black',
          dayTextColor: 'black',
          textSectionTitleDisabledColor: 'black',
          todayBackgroundColor: todayBackgroundColor,
          todayTextColor: 'black',
          textDayFontWeight: '800',
          textDayStyle: { fontSize: 15, fontWeight: '800' },
          calendarBackground: Color.darkOrange,
          textSectionTitleColor: 'black',
          selectedDayTextColor:'white',

        }}
        markingType="multi-period"
        markedDates={markingDates}
      />
    </View>
  ) : (
    <View
      style={{
        height: vh * 45,
        backgroundColor: Color.darkOrange,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: '500' }}>
        Loading Calendar...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Color.darkOrange,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
  },
  selecteddate: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default CalendarComponent;
