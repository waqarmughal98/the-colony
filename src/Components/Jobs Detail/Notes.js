import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from "react-native";
import React, { useState, useEffect } from "react";
import Color from "../../Color";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "../../utils/Constant";
const windowHeight = Dimensions.get("window").height;

const Notes = ({ data ,noteitem}) => {
  const headerOption = ["Title", "Description", "Date"];
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
      const authToken = await AsyncStorage.getItem("token");
      await axios.post(URL + "/notes/search", {}, {
          params: {
            project_id: data?.project_id,
            noteresource_type: "project",
            noteresource_id: data?.project_id,
          },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      ).then((res) => {
        setNotes(res.data.notes.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      });
    })();
  }, [noteitem]);

  // useEffect(()=>{
  //   const currentDate = new Date();
  //   console.log(noteitem)
  //   const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  //   if(noteitem){
  //     setNotes((preData)=>[...preData,{ note_title:noteitem.noteTitle, note_created:formattedDate , note_description : noteitem.noteDisc }])
  //   }
  //  },[noteitem])

  return (
    <>
      {!loading ? (
        <View style={styles.container}>
          <View style={styles.header}>
            {headerOption.map((item, index) => (
              <Text
                style={[
                  styles.headerText,
                  { textAlign: index == 2 ? "right" : "left" },
                ]}
                key={index}
              >
                {item}
              </Text>
            ))}
          </View>
          <View style={styles.notesDataContaier}>
            <ScrollView contentContainerStyle={styles.mainContainer}>
              <View style={{paddingBottom:300}}>
              {notes.map((item, index) => (
                <View style={styles.individualRow} key={index}>
                  <Text style={styles.containerText}>{item.note_title}</Text>
                  <Text style={styles.containerText2}>
                    {item.note_description}
                  </Text>
                  <View style={styles.containerText3Container}>
                    <Text style={styles.containerText3}>
                      {item.note_created.slice(0, 10)}
                    </Text>
                  </View>
                </View>
              ))}
              </View>
              <Text>{/* For space */}</Text>
            </ScrollView>
          </View>
        </View>
      ) : (
        <View style={styles.Indicator}>
          <ActivityIndicator size="large" color={"black"} />
          <Text style={styles.fetchingData}>Fetching Data</Text>
        </View>
      )}
    </>
  );
};

export default Notes;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerText: {
    color: Color.darkOrange,
    fontFamily: "Sommet-Regular",
    flex: 1,
  },
  notesDataContaier: {
    height: windowHeight,
    backgroundColor: "white",
  },
  individualRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    paddingHorizontal: 15,
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  containerText: {
    flex: 1,
    fontFamily: "Sommet-Regular",
  },
  containerText2: {
    color: Color.darkOrange,
    fontFamily: "Sommet-Regular",
    flex: 1,
  },
  containerText3: {
    flex: 1,
    textAlign: "right",
    marginRight: "auto",
    fontFamily: "Sommet-Regular",
  },
  containerText3Container: {
    flex: 1,
    fontFamily: "Sommet-Regular",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Indicator: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60%",
  },
  fetchingData: {
    color: "black",
    fontFamily: "Sommet-Black",
  },
});
