import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
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

  const { item, status } = route.params;

  useEffect(() => {
    console.log(status, 'statusstatusstatus');
  }, [status]);

  /* Remove this when fethc data */
  useEffect(() => {
    (async () => {
      const authToken = await AsyncStorage.getItem("token");
      await axios
        .get(URL + "/job-status", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          setData(res.data.projects.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.mainContainer}>
      {!loading ? (
        <View style={styles.Container}>
            <ScrollView>
                <View style={styles.allData} >
                   {
                    status.map((item,index)=>
                    <TouchableOpacity key={index} activeOpacity={0.6} onPress={()=>navigation.navigate("All-Job",{screenName:"jobStatus"})} style={styles.individual}>
                      <View style={styles.left}>
                        <Text style={styles.leftText1}>JobStatus</Text>   
                        <Text style={styles.leftText2}>Assigned to me : 4</Text> 
                      </View>
                      <View style={styles.right}>   
                        <Text style={styles.rightText}>2</Text> 
                      </View>  
                    </TouchableOpacity> 
                )
                   }
                </View>
              ))}
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
