import { StyleSheet, Text, View, TouchableOpacity , Dimensions , Image } from 'react-native'
import React,{useEffect,useState} from 'react'
const { width, height } = Dimensions.get('window');
const vw = width / 100;
const vh = height / 100;
import Color from '../Color'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../utils/Constant';
const ProblemReportReplies = ({navigation,route}) => {
  const { id } = route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading]=useState(true)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{ marginRight: 5 }}>
          <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate("new-problem-report")}>
           <Text style={{color:"white"}}>Reply</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  useEffect(()=>{
    (async ()=>{
 
      const authToken = await AsyncStorage.getItem('token');
      await axios.get(URL + '/problemreports/show/'+id, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then((res)=>{
        setItems(res.data.replies)
      }).catch((err)=>{
        console.log(err);
      })
    })()

    setTimeout(() => {
       setLoading(false) 
    }, 1000);
  },[id])

  useEffect(()=>{
    console.log(items,"items.....")
  },[items])



  
  return (
    <View>
       {
        items.map((item,index)=>
        <View style={styles.individual}>
            <View style={styles.left}>
            {/* Change the img */}
            <Image source={require('../../assets/imgs/avator.png')} style={styles.Image} />
            </View>
            <View style={styles.right}>
              <Text style={styles.text}>{`by ${item.first_name} on ${item.ticketreply_created.slice(0,10)}`}</Text>
              <Text style={styles.text}>{item.ticketreply_text}</Text>
            </View>
        </View>
     )
       }
    </View>
  )
}

export default ProblemReportReplies

const styles = StyleSheet.create({
  individual:{
    backgroundColor:'#D2CBBC',
    width:vw*100,
    height:80,
    borderBottomColor:"gray",
    borderBottomWidth:1,
    display:"flex",
    flexDirection:'row'
  },
  Image:{
    height:50,
    width:50,
    borderRadius:100
  },
  left:{
    flex:0.25,
    justifyContent:"center",
    alignItems:"center",
  },
  right:{
    flex:0.75,
    justifyContent:"center"
  },
  text:{
    fontSize:16,
    fontWeight:"700",
    color:"#625E57"
  }
})