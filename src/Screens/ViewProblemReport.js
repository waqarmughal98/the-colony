import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ViewProblemReport = ({ ticketDetails }) => {
  return (
    <View style={styles.Container}>
      <View style={styles.flexColumn}>
        <Text>Subject: </Text>
        <Text>{ticketDetails.ticket_subject}</Text>
      </View>
    </View>
  );
};

export default ViewProblemReport;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  flexColumn: {
    flex: 1,
    flexDirection: "column",
  },
});
