import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import TaskContainer from '../Components/Tasks/TaskContainer'
import { URL } from '../utils/Constant';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tasks = ({navigation}) => {
    const [data, setData] = useState([]);

    /* Change the api this is dummy api */
    useEffect(()=>{
        (async ()=>{
            const authToken = await AsyncStorage.getItem("token");
            console.log(authToken)
            axios.get(URL + '/task/all',{
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }).then((res)=>{
                console.log('tasks', res.data.tasks.data);
                setData(res.data.tasks.data);
            }).catch((err)=>{
                console.log(err);
            })
        })()
    },[])
  return (
    <View>
      <TaskContainer navigation={navigation} data={data}/>
    </View>
  )
}

export default Tasks

const styles = StyleSheet.create({})