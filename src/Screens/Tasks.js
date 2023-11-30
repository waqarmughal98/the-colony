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
                setLoading(false)
            }).catch((err)=>{
                console.log(err);
            })
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