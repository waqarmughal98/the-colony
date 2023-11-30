// Footer.js
import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Ionicons , SimpleLineIcons} from '@expo/vector-icons';

const Footer = ({navigation}) => {
  return (
    <View style={styles.footerContainer}>
      {/* Your three images */}
      <TouchableOpacity  style={styles.individual} >
         <SimpleLineIcons name="briefcase" size={20} color="white" />
         <Text style={styles.text}>WorkLog</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.individual} >
         <Image source={require('../../../assets/imgs/lg.png')} style={styles.footerImage} />
         <Text style={styles.text}></Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.individual} >
       <Ionicons name="person-outline" size={20} color="white" />
         <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    padding: 10,
    height:75,
  },
  footerImage: {
    width: 35,
    height: 35,
  },
  footerImageleft: {
    width: 30,
    height: 30,
  },
  footerLabel: {
    color: 'white',
  },
  individual:{
    display:"flex",
    flexDirection:'column',
    justifyContent:"center",
    alignItems:'center'
  }
  ,
  text:{
    color:"white",
    fontSize:11
  }
});

export default Footer;
