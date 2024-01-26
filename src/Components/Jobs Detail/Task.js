import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import React,{useState, useEffect} from 'react'
import { URL } from '../../utils/Constant';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskContainer from '../Tasks/TaskContainer';


const Tasks = ({navigation, data,screenName}) => {
    const [loading, setLoading]=useState(true)
    const[item, setItem] = useState([])

    
    useEffect(()=>{
      (async ()=>{
        const authToken = await AsyncStorage.getItem("token");
        axios.get(URL + '/task/all',{
          params:{
            taskresource_type: "project",
            taskresource_id: data.project_id
          },
          headers: {
              Authorization: `Bearer ${authToken}`
          }
        }).then((res)=>{
          setItem(res.data.tasks.data);
            setLoading(false)
        }).catch((err)=>{
            console.log(err);
        })
      })()
    },[data])
    
  return (
    <View>
    {
     !loading ?
      <View>
        <TaskContainer screenName={"jobs-detail"} navigation={navigation} allData={data} data={item}/>
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