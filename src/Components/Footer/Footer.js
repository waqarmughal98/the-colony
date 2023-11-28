// Footer.js
import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';


const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      {/* Your three images */}
      <TouchableOpacity  style={styles.individual} >
         <Image source={require('../../../assets/imgs/contact.png')} style={styles.footerImage} />
         <Text style={styles.text}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.individual} >
         <Image source={require('../../../assets/imgs/lg.png')} style={styles.footerImage} />
         <Text style={styles.text}></Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.individual} >
         <Image source={require('../../../assets/imgs/profile.png')} style={styles.footerImage} />
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
    width: 27,
    height: 27,
    // Add any additional styles for your images
  },
  footerLabel: {
    color: 'white',
    // Add any additional styles for your label
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
