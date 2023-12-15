import { StyleSheet, Text, View ,Alert,ActivityIndicator} from 'react-native'
import React,{useState, useEffect} from 'react'
import TaskContainer from '../Components/Tasks/TaskContainer'
import { URL } from '../utils/Constant';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tasks = ({navigation,route}) => {
    const [loading, setLoading]=useState(true)
    const [data, setData] = useState([]);
    const { item } = route.params;
    React.useLayoutEffect(() => {
       navigation.setOptions({
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitle: item?.ScreenTitle,
        });
      }, [navigation]);

    useEffect(()=>{
        (async ()=>{
            const authToken = await AsyncStorage.getItem("token");
            if(item?.ScreenTitle == "Task In Pending"){
                axios.get(URL + '/task/all?filter_single_task_status=7', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }).then((res)=>{
                    // console.log(res.data.tasks.data, 'Task In Pending');
                    setData(res.data.tasks.data);
                    setLoading(false)
                }).catch((err)=>{
                    console.log(err);
                })
            }else if(item?.ScreenTitle == "Task In Progress"){
                axios.get(URL + '/task/all?filter_single_task_status=3', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }).then((res)=>{
                    // console.log(res.data.tasks.data, 'Task In Progress');
                    setData(res.data.tasks.data);
                    setLoading(false)
                }).catch((err)=>{
                    console.log(err);
                })
            }else{
                axios.get(URL + '/task/all', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }).then((res)=>{
                    // console.log(res.data.tasks.data, 'All Task');
                    setData(res.data.tasks.data);
                    setLoading(false)
                }).catch((err)=>{
                    console.log(err);
                })
            }
        })()
    },[])
  return (
    <View>
        {
        !loading ? 
            <View>
                <TaskContainer navigation={navigation} data={data}/>
            </View>
            :
            <View style={styles.Indicator}>
                <ActivityIndicator size="large" color={"black"} />
                <Text style={styles.fetchingData}>Fetching Data</Text>
            </View>
        }
     </View>
  )
}

export default Tasks

const styles = StyleSheet.create({
    Indicator:{
        height: '90%',
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center"
      },
})