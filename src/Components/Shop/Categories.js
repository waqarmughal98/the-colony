import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { vw } from '../../utils/ScreenSize';
import Data from './Data'
import { category, categoryUri, imageUri } from '../../utils/Constant';
import axios from 'axios';
import { URL } from '../../utils/Constant'
import RoundedButton from './ButtonCart';
const Categories = ({ navigation }) => {
  const handleCategoryPress = (product) => {
    navigation.navigate("Category-Product",{categoryName: product.value,categoryId:product.id.toString()})
  };
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetchCategory();
    console.log(category, "category")
  }, [])

  const fetchCategory = async () => {
    axios.get(`${URL}${categoryUri}`)
      .then((res) => {
        setCategory(res.data.data)
      }).catch((error) => {
        console.log(error)
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
        <View style={styles.LoginComponent}>
          <View style={styles.LoginComponentText}>
            <Text style={{fontSize:17}}>Log in or Sign Up</Text>
            <Text>Log in to place an order</Text>
          </View>
          <View style={styles.LoginComponentBtn}>
            <TouchableOpacity>
              <Text>Let's Go</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text style={styles.title}>Categories</Text> */}
        <View style={styles.Maincontainer}>
          {category.length > 0 && category?.map((item) => (
            <TouchableOpacity key={item.id} style={styles.categoryContainer} onPress={() => handleCategoryPress(item)}>
              <Image source={{ uri: imageUri + item.image }} style={styles.categoryImage} />
              <Text style={styles.categoryTitle}>{item.value}</Text>
              <Text style={styles.categoryDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};


export default Categories;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,

  },
  contentContainer: {
    paddingVertical: 10,
    paddingBottom: 230,
  },
  title: {
    fontSize: 16,
    color: '#4b4c4c',
    fontWeight:"bold",
    // textDecorationLine: 'underline',
    marginBottom: 10,
    textAlign:"center",
    paddingBottom:8,
  },
  Maincontainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3 * vw,

  },
  categoryContainer: {
    width: 43 * vw,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: 'gray',
  },
  categoryImage: {
    width: 130,
    height: 130,
    borderRadius: 8,
    resizeMode: 'contain',
    alignSelf: "center"
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#666',
  },
  LoginComponent:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:20,
    borderColor:'orange',
    borderWidth:1,
    borderRadius:10,
    paddingVertical:15,
    marginBottom:25,
    backgroundColor:'#EBEDEF'
  },
  LoginComponentBtn:{
    backgroundColor:"orange",
    display:"flex",
    justifyContent:'center',
    paddingHorizontal:20,
    paddingVertical:15,
    borderRadius:10
  },
  LoginComponentText:{
    // display:'flex',
    gap:8,
  }
});
