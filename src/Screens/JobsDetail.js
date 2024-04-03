import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import Color from '../Color';
import Detail from '../Components/Jobs Detail/Detail';
import Team from '../Components/Jobs Detail/Team';
import Modal from "react-native-modal";
import Task from '../Components/Jobs Detail/Task';
import Address from '../Components/Jobs Detail/Address';
import Files from '../Components/Jobs Detail/Files';
import Update from '../Components/Jobs Detail/Update';
import Notes from '../Components/Jobs Detail/Notes';
import Logs from '../Components/Jobs Detail/Logs';
import ProblemReports from '../Components/Jobs Detail/ProblemReports';
import NoteModal from '../Components/Modals/NoteModal';
import Toast from 'react-native-toast-message';
import UpdateModal from '../Components/Modals/UpdateModal';
import { vw } from '../utils/ScreenSize';
const JobsDetail = ({route, navigation}) => {
  const { items ,ID,Alldata} = route.params;
  const [updateItem, setUdateItem]=useState("")
  const [noteTitle, setNoteTitle]=useState("")
  const [noteDisc, setNoteDisc]=useState("")
  const [subject, setsubject]=useState("")
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
      optionName: 'Updates',
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


  useEffect(()=>{},[])
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const saveNote=(title,disc)=>{
    setNoteDisc(disc)
    setNoteTitle(title)
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          {(selectedOptionID==5 || selectedOptionID==6   )  &&  <TouchableOpacity onPress={toggleModal} activeOpacity={0.6}>
            <AntDesign name="pluscircleo" size={24} color="white" />
          </TouchableOpacity>}
          {(selectedOptionID==8  )  &&  <TouchableOpacity onPress={()=>navigation.navigate("new-problem-report",{items:items,})} activeOpacity={0.6}>
            <AntDesign name="pluscircleo" size={24} color="white" />
          </TouchableOpacity>}
        </View>
      ),
    });
  }, [selectedOptionID]);

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
          <Task navigation={navigation} screenName={"jobs-detail"} Task={items} data={items} />
        ) : selectedOptionID == 3 ? (
          <Address data={items} />
        ) : selectedOptionID == 4 ? (
          <Files data={items}  />
        ) : selectedOptionID == 5 ? (
          <Update data={items} updateItem={updateItem} />
        ) : selectedOptionID == 6 ? (
          <Notes data={items} noteitem={{noteDisc,noteTitle}}  />
        ) : selectedOptionID == 7 ? (
          <Logs data={items} />
        ) : selectedOptionID == 8 ? (
        <ProblemReports navigation={navigation} data={items} ID={ID} />
        ) : null}
      </View>
      <Modal isVisible={isModalVisible}>
      <View style={{ height: 400, backgroundColor: Color.brightOrange, justifyContent: 'center', alignItems: 'center' ,borderRadius:20 }}>
        { selectedOptionID == 5 && <UpdateModal toggleModal={toggleModal} data={items}  setUdateItem={setUdateItem}/> }
        { selectedOptionID == 6 && <NoteModal toggleModal={toggleModal} data={items}  saveNote={saveNote} /> }
        {/* Close button */}
        <TouchableOpacity
          style={{ position: 'absolute', top: 10, right: 10 }}
          onPress={toggleModal}
        >
          <Ionicons name="close" size={27} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
    <Toast/>
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
    width: vw*100,
    backgroundColor: '#382504',
  },

  navbarContainer: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap:20,
    paddingHorizontal:10,
    
  },
  navbarOption: {
    height:50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbarOptionText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
