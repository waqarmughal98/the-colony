import { StyleSheet, Text, View , TouchableOpacity, Image,ScrollView} from 'react-native'
import React,{useEffect, useState} from 'react'
import { vh,vw } from '../../utils/ScreenSize'
import Modal from "react-native-modal";
import AddFolder from '../Modals/AddFolder'
import Color from '../../Color';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import ImagePickerFiles from '../Picker/ImagePickerFiles';
const Files = () => {
  const [data,setData]=useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentIndex, setcurrentIndex] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(()=>{
    console.log(data,"data..")
  },[data])
  const hendleOpen=(ind)=>{
     if(ind==currentIndex)
     {
      setcurrentIndex(null)
     }
     else{
       setcurrentIndex(ind)
     }
  }

  const fileName=(text)=>{
    let pathParts = text.split("/");
    let fileName = pathParts[pathParts.length - 1];
    return fileName
  }
  return (
    <View>
       <ScrollView>
        <View style={{paddingBottom:100}}>
        {/* Add folder section */}
       <View style={styles.addFolder}>
          <View style={styles.left}>
            <Image source={require('../../../assets/imgs/close_folder.png')} style={styles.Image} />
            <Text style={styles.text}>Folders</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity activeOpacity={0.6} style={styles.addFolderContainer} onPress={toggleModal} >
              <Image source={require('../../../assets/imgs/addfile.png')} style={styles.Image2} />
              <Text style={styles.text1}>Add Folders</Text>
            </TouchableOpacity>
          </View>
       </View>
      
       {/* Folder Name */}
       <Text style={styles.nameText}>Folder Name</Text>
      
       <View style={styles.FolderMainContainer}>
        {
          data.map((item,index)=>
            <View>
                <View style={styles.individual}>
                  <TouchableOpacity activeOpacity={0.6} style={styles.leftBtmContainer} onPress={()=>hendleOpen(index)}>
                      <View style={styles.leftBtm}>
                        <Image source={currentIndex==index?  require('../../../assets/imgs/opened_folder.png'): require('../../../assets/imgs/close_folder.png')} style={styles.Image3} />
                        <Text>{item.FolderName}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.rightBtmContainer}>
                        <ImagePickerFiles index={index} data={data} setData={setData} />
                    </View>
                   
                </View>
                    { currentIndex==index && (
                      <View style={styles.imageContainer}>
                         {item.images.length>0 ?  (item.images.map((image, i) => (
                          <View style={styles.ImageWrapper}>
                            <Image key={i} source={{ uri: image }} style={styles.imageFolder} />
                            <Text style={styles.fileName}>{fileName(image)}</Text>
                          </View>
                        ))):(
                          <View style={styles.ImageWrapper}>
                            <Text>There is no image in this folder</Text>
                          </View>
                        )}
                      </View>
                    )}
            </View>
          )
        }
       </View>

       <Modal isVisible={isModalVisible}>
          <View style={{ height: 250, backgroundColor: Color.brightOrange, justifyContent: 'center', alignItems: 'center' ,borderRadius:10 }}>
              <AddFolder toggleModal={toggleModal} setData={setData}/> 
          
            {/* Close button */}
            <TouchableOpacity
              style={{ position: 'absolute', top: 10, right: 10 }}
              onPress={toggleModal}
            >
              <Ionicons name="md-close" size={27} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>
        </View>
    </ScrollView>
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
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
  },
  left:{
   display:"flex",
   flexDirection:"row",
   alignItems:"center",
   marginHorizontal:15
  },
  right:{
    display:"flex",

  },
  Image:{
    height:30,
    width:30,
    marginRight:5
  },
  Image3:{
    height:40,
    width:40,
    marginRight:15
  },
  Image4:{
    height:25,
    width:25,
  },
  Image2:{
    height:18,
    width:18,
    marginRight:5
  },
  text:{
    color:"white",
    fontSize:17,
    fontWeight:"500"
  },
  text1:{
    color:"black",
    fontSize:14,
    fontWeight:"500"
  },
  addFolderContainer:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    marginRight:10,
    backgroundColor:"white",
    borderRadius:40,
    paddingHorizontal:20,
    paddingVertical:5
  },
  FolderMainContainer:{
    paddingRight:15,
    marginVertical:20,
    display:"flex",
    gap:10
  },
  nameText:{
    fontSize:17,
    fontWeight:"600",
    borderBottomColor:"gray",
    borderBottomWidth:2,
    paddingHorizontal:15,
    paddingVertical:20,
  },
  individual:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  leftBtm:{
    display:'flex',
    flexDirection:'row',
    justifyContent:"center",
    alignItems:'center',
    paddingLeft:15
  },
  imageContainer:{
   paddingHorizontal:20,
   display:'flex',
   gap:15,
   paddingBottom:10,
 
  },
  ImageWrapper:{
    borderBottomColor:Color.darkOrange,
    borderBottomWidth:2,
    width:"100%",
    paddingBottom:15,
    paddingTop:15,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:5

  },
  imageFolder:{
    height:40,
    width:40,
    flex:0.15,
    marginRight:5
  },
  fileName:{
    fontSize:12,
    color:"#5A5A5A",
    flex:0.85
  },

})