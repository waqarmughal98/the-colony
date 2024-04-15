import { StyleSheet, Text, View, TouchableOpacity , Dimensions , Image , ScrollView,ActivityIndicator} from 'react-native'
import React,{useEffect,useState} from 'react'
const { width, height } = Dimensions.get('window');
const vw = width / 100;
const vh = height / 100;
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewProblemReport from "./ViewProblemReport"
import axios from 'axios';
import { URL } from '../utils/Constant';
import Color from '../Color';
const ProblemReportReplies = ({navigation,route}) => {
  const { id, jobTitle, reply, ticket_subject, ticket_message, ticket_priority, ticket_status} = route.params;
  const ticketDetails = {
    ticket_subject: ticket_subject, 
    ticket_message: ticket_message, 
    ticket_priority: ticket_priority, 
    ticket_status: ticket_status
  }
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
  },[reply,id])
  
  return (
    <View>
      <ScrollView>
        {
          !loading ? 
          (
            <View style={styles.container}>
            <ViewProblemReport ticketDetails={ticketDetails} />
            <View style={styles.header}>
              <Text style={styles.headerText}>
                All Replies
              </Text>
            </View>
            {
              items.length > 0 ? 
              (
                items.map((item,index)=>
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
            )
              )
              :
              (
                <Text style={styles.noRecord}>No Reply Found!</Text>
              )
            
            
            }
            </View>

          )
          :
          (
            <View style={styles.Indicator}>
            <ActivityIndicator size="large" color={'black'} />
            <Text style={styles.fetchingData}>Fetching Data</Text>
          </View>
          )
        }
      
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
  },
  noRecord:{
    color: "black",
    fontSize: 19,
    flex:1,
    textAlign: "center",
    paddingVertical: vh * 0.5,
    fontWeight: "bold",
  },
  Indicator: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '70%',
  },
  fetchingData: {
    color: 'black',
    fontWeight: 'bold',
  },
  header:{
    backgroundColor:Color.darkOrange,
    padding:15,
    marginBottom:15
  },
  headerText:{
    color:'white',
    fontSize:17,
    fontWeight:'bold',
  }
})