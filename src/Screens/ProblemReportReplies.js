import { StyleSheet, Text, View, TouchableOpacity , Dimensions , Image , ScrollView} from 'react-native'
import React,{useEffect,useState} from 'react'
const { width, height } = Dimensions.get('window');
const vw = width / 100;
const vh = height / 100;
import Color from '../Color'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../utils/Constant';
const ProblemReportReplies = ({navigation,route}) => {
  const { id, jobTitle ,reply} = route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading]=useState(true)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{ marginRight: 5 }}>
          <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate("reply-ticket",{items:items[0], jobTitle: jobTitle,id:id})}>
           <Text style={{color:"white"}}>Reply</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation,items]);
  useEffect(()=>{
    (async ()=>{
      const authToken = await AsyncStorage.getItem('token');
      await axios.get(URL + '/problemreports/show/'+id, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then((res)=>{
        setItems(res.data.replies)
        setLoading(false) 
      }).catch((err)=>{
        console.log(err);
      })
    })()
  },[id,reply])
  
  console.log(id,"id...")
  console.log(items,"items....")
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
      {items.map((item,index)=>
        <View style={styles.individual} key={index}>
          <View style={styles.left}>
          {/* Change the img */}
          <Image source={require('../../assets/imgs/avator.png')} style={styles.Image} />
          </View>
          <View style={styles.right}>
            <Text style={styles.text}>{`by ${item.first_name} on ${item.ticketreply_created.slice(0,10)}`}</Text>
            <Text style={styles.text}>{item.ticketreply_text}</Text>
          </View>
        </View>
      )}
      </View>
       </ScrollView>
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
  },
  container:{
    paddingBottom:75
  }
})