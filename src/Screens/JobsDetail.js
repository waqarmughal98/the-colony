import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Color from '../Color';
import Detail from '../Components/Jobs Detail/Detail';
import Team from '../Components/Jobs Detail/Team';
import Task from '../Components/Jobs Detail/Task';
import Address from '../Components/Jobs Detail/Address';
import Files from '../Components/Jobs Detail/Files';
import Update from '../Components/Jobs Detail/Update';
import Notes from '../Components/Jobs Detail/Notes';
import Logs from '../Components/Jobs Detail/Logs';
import ProblemReports from '../Components/Jobs Detail/ProblemReports';
const JobsDetail = ({route, navigation}) => {
  const { items } = route.params;

  const navbarOptions = [
    {
      id: 0,
      optionName: 'Detail',
    },
    {
      id: 1,
      optionName: 'Team',
    },
    {
      id: 2,
      optionName: 'Tasks',
    },
    {
      id: 3,
      optionName: 'Address',
    },
    {
      id: 4,
      optionName: 'Files',
    },
    {
      id: 5,
      optionName: 'Update',
    },
    {
      id: 6,
      optionName: 'Notes',
    },
    {
      id: 7,
      optionName: 'Logs',
    },
    {
      id: 8,
      optionName: 'Problem Report',
    },
  ];

  const [selectedOptionID, setSelectedOptionID] = useState(
    navbarOptions[0].id
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.navbarOption}
      onPress={() => setSelectedOptionID(item.id)}
    >
      <Text
        style={[
          styles.navbarOptionText,
          {
            color:
              item.id === selectedOptionID
                ? Color.darkOrange
                : 'white',
          },
        ]}
      >
        {item.optionName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      {/* Heading */}
      <View style={styles.heading}>
        <Text style={styles.textHeading}>{items.project_title}</Text>
      </View>
      {/* Navbar */}
      <View style={styles.navbar}>
        <FlatList
          data={navbarOptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navbarContainer}
        />
      </View>
      {/* selected component render */}
      <View>
        {selectedOptionID == 0 ? (
          <Detail data={items} />
        ) : selectedOptionID == 1 ? (
          <Team data={items} />
        ) : selectedOptionID == 2 ? (
          <Task data={items} />
        ) : selectedOptionID == 3 ? (
          <Address data={items} />
        ) : selectedOptionID == 4 ? (
          <Files data={items} />
        ) : selectedOptionID == 5 ? (
          <Update data={items} />
        ) : selectedOptionID == 6 ? (
          <Notes data={items} />
        ) : selectedOptionID == 7 ? (
          <Logs data={items} />
        ) : selectedOptionID == 8 ? (
          <ProblemReports navigation={navigation} data={items} />
        ) : null}
      </View>
    </View>
  );
};

export default JobsDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  heading: {
    backgroundColor: 'white',
    height: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textHeading: {
    fontSize: 16,
    alignItems: 'center',
    marginLeft: 20,
  },
  navbar: {
    backgroundColor: '#382504',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navbarOption: {
    paddingVertical: 10,
    borderRadius: 5,
  },
  navbarOptionText: {
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
});
