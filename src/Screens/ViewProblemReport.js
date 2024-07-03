import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Color from '../Color';

const ViewProblemReport = ({ ticketDetails }) => {
  return (
    <View style={styles.Container}>
      <View style={styles.subContainer}>
        <View style={styles.flexColumn}>
          <Text style={styles.label}>Subject: </Text>
          <Text style={styles.text}>
            {ticketDetails.ticket_subject || "N/A"}
          </Text>
        </View>
        <View style={styles.flexColumn}>
          <Text style={styles.label}>Message: </Text>
          <Text style={styles.text}>
            {ticketDetails.ticket_message || "N/A"}
          </Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.flexColumn}>
          <Text style={styles.label}>Priority: </Text>
          <Text style={styles.text}>
            {ticketDetails.ticket_priority || "N/A"}
          </Text>
        </View>
        <View style={styles.flexColumn}>
          <Text style={styles.label}>Status: </Text>
          <Text style={styles.text}>
            {ticketDetails.ticket_status || "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ViewProblemReport;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 15,
    backgroundColor: Color.darkOrange,
    margin: 15,
    borderRadius: 8,
    display:'flex',
    flexDirection:'column',
    gap:15,
    elevation:5
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexColumn: {
    flex: 0.5,
    flexDirection: 'column',
  },
  label: {
    fontFamily: "Sommet-Black",
    color: 'white',
    fontSize: 16,
  },
  text: {
    color: 'white',
    fontFamily: "Sommet-Regular",
  },
});
