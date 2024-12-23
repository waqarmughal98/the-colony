import { StyleSheet, Text, View , TouchableOpacity, Image,ScrollView,ActivityIndicator } from 'react-native'
import React,{useEffect, useState} from 'react'
import { vh,vw } from '../../utils/ScreenSize'
import Modal from "react-native-modal";
import AddFolder from '../Modals/AddFolder'
import Color from '../../Color';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import ImagePickerFiles from '../Picker/ImagePickerFiles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../../utils/Constant';
const Files = ({data}) => {
  const [items, setItems]=useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFileModalVisible, setFileModalVisible] = useState(false);
  const [currentIndex, setcurrentIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [FolderName,setFolderNames] =useState([])
  const [FileName,setFileName] =useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  const [folderData, setFolderData] = useState()
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOpen=(ind)=>{
    if(ind==currentIndex){
      setcurrentIndex(null)
    }else{
      setcurrentIndex(ind)
    }
  }
  

  useEffect(() => {
    (async () => {
      const authToken = await AsyncStorage.getItem("token");
      if (!authToken) {
        navigation.navigate("LoginScreen");
      }
     const ID=data?.project_id
      try {
        const response = await fetch(
          `${URL}/files?source=ext&ref=list&fileresource_type=project&fileresource_id=${ID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        const FolderData=data.folders.data;
        setFolderData(FolderData)
        const FilesData=data.files.data;
        const newData=FolderData.map((item,index)=>{
          const relatedFiles= FilesData.filter((i)=>{
           return i.file_group_id==item.file_group_id 
          })
            return {
              ...item,images:  relatedFiles
            }
        })
        setItems(newData)
        if(data){
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [FolderName,FileName]);

  const handleImageClick = (image) => {
    setSelectedImage(image.file_directory + '/' + image.file_filename);
    setFileModalVisible(true);
  }

  
  return (
    <View>
        {
          !loading?(
        <ScrollView>
        <View style={{paddingBottom:150}}>
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
            items.map((item,index)=>
              <View key={index}>
                <View style={styles.individual}>
                  <TouchableOpacity activeOpacity={0.6} style={styles.leftBtmContainer} onPress={()=>handleOpen(index)}>
                    <View style={styles.leftBtm}>
                      <Image source={currentIndex==index?  require('../../../assets/imgs/opened_folder.png'): require('../../../assets/imgs/close_folder.png')} style={styles.Image3} />
                      <Text>{item.file_group_name}</Text>
                    </View>
                  </TouchableOpacity>
                  <View onPress={()=>handleOpen(index)} style={styles.rightBtmContainer}>
                      <ImagePickerFiles key={index} index={index} data={data} setData={setFileName} currentIndex={currentIndex} items={items}/>
                  </View>
                </View>
                {currentIndex==index && (
                  <View style={styles.imageContainer}>
                      {item.images.length>0 ? (item.images.map((image, i) => (
                        <TouchableOpacity
                        key={i}
                        onPress={() => handleImageClick(image)}
                      >
                        <View style={styles.ImageWrapper}>
                          <Image
                            source={{
                              uri: `https://geomap.imaginedesigns.co/storage/files/${image.file_directory}/${image.file_filename}`,
                            }}
                            style={styles.imageFolder}
                          />
                          <Text style={styles.fileName}>
                            {image.file_filename}
                          </Text>
                        </View>
                      </TouchableOpacity>
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
              <AddFolder toggleModal={toggleModal} data={data} items={items}   setData={setFolderNames}/> 
            
              {/* Close button */}
              <TouchableOpacity
                style={{ position: 'absolute', top: 10, right: 10 }}
                onPress={toggleModal}
              >
                <Ionicons name="close" size={27} color="white" />
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal isVisible={isFileModalVisible}  >
          <View style={{height:300,display:"flex",flexDirection:"column"}}>
                <Image
                  source={{
                    uri: `https://geomap.imaginedesigns.co/storage/files/${selectedImage}`,
                  }}
                  style={styles.modalImage}
                />
                <TouchableOpacity
                    style={{ position: 'absolute', top: -10, right: 0,backgroundColor:"white",borderRadius:5, }}
                    onPress={()=>setFileModalVisible(false)}
                  >   
                <Ionicons name="close" size={25} color="black" />
              </TouchableOpacity>
              </View>
          </Modal>

        </View>
      </ScrollView>
          ):(
            <View style={styles.indicator}>
            <ActivityIndicator size="large" color={'black'} />
            <Text style={styles.fetchingData}>Fetching Data</Text>
          </View>
          )
        }
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
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:"60%"
  },
  fetchingData: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalImage:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
  }
})