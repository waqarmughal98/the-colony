import { StyleSheet, Text, View, TouchableOpacity , Dimensions , Image } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window');
const vw = width / 100;
const vh = height / 100;
const ProblemReportReplies = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{ marginRight: 5 }}>
          <TouchableOpacity activeOpacity={0.6}>
           <Text>Reply</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  
  return (
    <View>
      <View style={styles.individual}>
         <View style={styles.left}>
          {/* Change the img */}
          <Image source={require('../../assets/imgs/avator.png')} style={styles.Image} />
         </View>
         <View style={styles.right}>
           <Text style={styles.text}>by Mark on 2023-11-03</Text>
           <Text style={styles.text}>new reply</Text>
         </View>
      </View>
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