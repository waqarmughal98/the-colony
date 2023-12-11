import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import { vh, vw } from "../utils/ScreenSize";
import Color from "../Color";
import axios from "axios";
import { URL } from "../utils/Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
const JobStatus = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [my_projects_states, setMy_projects_states] = useState();

  const { item, status } = route.params;

  useEffect(() => {
    setMy_projects_states(status.my_projects_states)
    const resultArray = Object.entries(status.all_projects).map(([title, number]) => ({ title, number }));
    setData(resultArray)
    setLoading(false)
  }, [status]);

  const transformAndCapitalize = (inputString) => {
    const words = inputString.split('_');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWords.join(' ');
  };

  return (
    <View style={styles.mainContainer}>
      {!loading ? (
        <View style={styles.Container}>
            <ScrollView>
                <View style={styles.allData} >
                   {
                    data.map((item,index)=>
                    <TouchableOpacity key={index}   activeOpacity={0.6} onPress={()=>navigation.navigate("All-Job",{screenName:"jobStatus",status:item.title })} style={styles.individual}>
                      <View style={styles.left}>
                        <Text style={styles.leftText1}>{transformAndCapitalize(item.title)}</Text>   
                        <Text style={styles.leftText2}>{`Assigned to me : ${my_projects_states[`${item.title}`]}`}</Text> 
                      </View>
                      <View style={styles.right}>   
                        <Text style={styles.rightText}>{item.number}</Text> 
                      </View>  
                    </TouchableOpacity> 
                    )
                   }
                </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.Indicator}>
          <ActivityIndicator size="large" color={"black"} />
          <Text style={styles.fetchingData}>Fetching Data</Text>
        </View>
      )}
    </View>
  );
};

export default JobStatus;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  Container: {
    flexGrow: 1,
    backgroundColor: Color.brightOrange,
  },
  Indicator: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  fetchingData: {
    color: "black",
    fontWeight: "bold",
  },
  individual: {
    backgroundColor: "white",
    marginHorizontal: 15,
    borderRadius: 7,
    height: 9 * vh,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  allData: {
    display: "flex",
    gap: 15,
    marginTop: 15,
    paddingBottom:80
  },
  leftText1: {
    fontSize: 16,
    fontWeight: "600",
  },
  leftText2: {
    fontSize: 12,
  },
  right: {
    height: 35,
    width: 35,
    backgroundColor: Color.brightOrange,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rightText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
