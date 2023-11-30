import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { vh,vw } from '../../utils/ScreenSize'
const Files = () => {
  return (
    <View>
       {/* Add folder section */}
       <View style={styles.addFolder}>
          <View style={styles.left}>
            <Image source={require('../../../assets/imgs/close_folder.png')} style={styles.Image} />
            <Text style={styles.text1}>Folders</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity activeOpacity={0.6}>
              <Image source={require('../../../assets/imgs/addfile.png')} style={styles.Image} />
              <Text style={styles.text1}>Add Folders</Text>
            </TouchableOpacity>
          </View>

       </View>
    </View>
  )
}

export default Files

const styles = StyleSheet.create({
  addFolder:{
    backgroundColor:"#BD7219",
    height:vh*9,
    marginHorizontal:10,
    borderRadius:12,
    marginTop:vh*2,
    display:"flex",
    justifyContent:"center"
  },
  left:{
   display:"flex",
   flexDirection:"row",
   alignItems:"center",
   marginHorizontal:15
   

  },
  Image:{
    height:35,
    width:35,
    marginRight:5
  },
  text1:{
    color:"white",
    fontSize:16,
    fontWeight:"500"
  }
})