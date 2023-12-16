import { StyleSheet, Text, View, TouchableOpacity, ScrollView , ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from '../utils/Constant';
import { vh } from '../utils/ScreenSize';
import axios from 'axios';
import { Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarComponent from '../Components/Calendar/CalendarComponent';
import DataCard from '../Components/Calendar/DataCard';
import HolidayCard from '../Components/Calendar/HolidayCard';
const Calender = ({navigation,route}) => {
    const [data, setData] = useState([]);
    const [FilteredData,setFilteredData ] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [loading, setLoading]=useState(true)

    useEffect(()=>{
        (async ()=>{
            const authToken = await AsyncStorage.getItem("token");
            console.log(authToken)
            axios.get(URL + '/job-status',{
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }).then((res)=>{
                setData(res.data.projects.data);
                setLoading(false)
            }).catch((err)=>{
                console.log(err);
            })
        })()
    },[])
    
    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setSelectedDate(formattedDate);
    }, []); 

    useEffect(()=>{
        filterData();
    }, [selectedDate])

    const filterData = ()=> {
        const copyData = [...data];
        const filterDate = copyData.filter((items) => {
            return items.project_date_start == selectedDate;
        });
        setFilteredData(filterDate);
    };

    const isSunday = (dateString) => {
        const date = new Date(dateString);
        return date.getDay() === 0;
    }

//   console.log(FilteredData,"FilteredData...")
//   console.log(selectedDate,"selectedDate...")
  return (
    <View>
        <View style={styles.container}>
        {
        !loading ? 
            <View style={styles.mainContainer}>
                <View>
                    <CalendarComponent setSelectedDate={setSelectedDate}/>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>setFilteredData(data)}   style={styles.viewAllbtn}>
                        <Fontisto name="preview" size={16} color="white" />
                        <Text style={{fontSize:14,color:"white",}}>View All</Text>
                    </TouchableOpacity>
                </View>
                
                {/* All Data */}
                <View style={styles.dataContainer}>
                {isSunday(selectedDate) && FilteredData.length==0? 
                    (
                        <HolidayCard  />
                    ) :(
                        <ScrollView>
                            <View>
                                {
                                    FilteredData.length>0 ? FilteredData?.map((item,index)=>{
                                        return(
                                            <DataCard navigation={navigation} item={item} />
                                        )
                                    }) : (
                                        <DataCard item={false} />
                                    )
                                }
                            </View>                     
                        </ScrollView>
                    )
                }               
                </View>
            </View>
        :
        <View style={styles.Indicator}>
        <ActivityIndicator size="large" color={"black"} />
        <Text style={styles.fetchingData}>Fetching Data</Text>
        </View>
    }
    </View>
 </View>
  )
}

export default Calender

const styles = StyleSheet.create({
    containerHeader:{
        backgroundColor:"black",
        height:45,
        display:"flex",
        flexDirection:"row",
        paddingHorizontal:20,
        alignItems:"center"
    },
    Indicator:{
        height: '90%',
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center"
      },
      fetchingData:{
        color:'black',
        fontWeight:"bold"
      },
    text:{
        fontSize:16,
        color:'white',
        fontWeight:'bold',
        flex:0.25
    },
    text2:{
        fontSize:16,
        color:'white',
        fontWeight:'bold',
        flex:0.75,
        textAlign:"center"
    },
    dataText:{
        fontSize:14,
        color:'black',
        flex:0.4
    },
    dataText2:{
        fontSize:14,
        color:'black',
        flex:0.6,
        textAlign:"center"
    },
    dataContainer:{
        paddingHorizontal:20,
        display:"flex",
        paddingVertical:10,
        flexGrow:1,
        paddingBottom:120,
        height:20*vh
    },
    individual:{
        height:45,
        display:"flex",
        flexDirection:'row',
        alignItems:"center",
        paddingHorizontal:20,
        marginBottom:10,
        borderRadius:10
    },
    mainContainer:{
        display:"flex",
        height:100*vh
    },
    AllData:{
        paddingBottom:100,
    },
    viewAllbtn:{
        backgroundColor:"black",
        marginHorizontal:20,
        paddingVertical:7,
        borderRadius:5,
        marginTop:10,
        paddingHorizontal:20,
        alignSelf: 'flex-start',
        display:"flex",
        flexDirection:"row",
        gap:4
    }

})