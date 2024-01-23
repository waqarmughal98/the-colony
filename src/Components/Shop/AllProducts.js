import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { vw } from '../../utils/ScreenSize';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { URL, imageUri, productUri } from '../../utils/Constant';
import { FontAwesome5 } from '@expo/vector-icons';

const AllProducts = ({ route, navigation }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [cartProduct, setCartProduct] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [showCounter, setShowCounter] = useState(false);
  const [loading, setLoading] = useState(true);
  const productDetails = (product) => {
    navigation.navigate("Product-Detail",)
  };

  
  useEffect(() => {
    const catgoryId = route.params.categoryId
    fetchCategory(catgoryId);
    // console.log(`${URL}${productUri}`)
  }, [])

  const fetchCategory = async (id) => {
    axios.get(`${URL}${productUri}${id}`)
      .then((res) => {
        setLoading(false)
        if(res.data.data.length > 0){
          setAllProduct(res.data.data)
        }

      }).catch((error) => {
        setLoading(false)
        console.log(error)
      });
  };

  const handleProductPress = (product) => {
    const existingProductIndex = cartProduct.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      setSelectedProduct(product);
      setQuantity(cartProduct[existingProductIndex].quantity);
      setShowCounter(true);
    } else {
      setSelectedProduct(product);
      setQuantity(1);
      setShowCounter(true);
    }
  };

  const hideCounter = () => {
    setShowCounter(false);
    setSelectedProduct(null);
    setQuantity(0);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    if (quantity > 0 && selectedProduct) {
      // Check if the product already exists in the cart
      const existingProductIndex = cartProduct.findIndex(
        (product) => product.id === selectedProduct.id
      );
  
      if (existingProductIndex !== -1) {
        setCartProduct((prevCartProduct) => {
          const updatedCart = [...prevCartProduct];
          updatedCart[existingProductIndex].quantity = quantity;
          return updatedCart;
        });
      } else {
        setCartProduct((prevCartProduct) => [
          ...prevCartProduct,
          {
            id: selectedProduct.id,
            title: selectedProduct.name,
            quantity: quantity,
          },
        ]);
      }
      console.log(`Added to Cart: ${quantity} ${selectedProduct.name}`);
      hideCounter();
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      {loading?(<ActivityIndicator style={styles.NoItem}/>):
      <View style={styles.contentContainer}>
      {/* <Text style={styles.title}>All Products</Text> */}
      {allProduct.length > 0 ? (
        <View style={styles.Maincontainer}>
          {allProduct.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => productDetails(item)}>
              <View key={item.id} style={styles.categoryContainer}>
                <Image source={{ uri: imageUri + item.image }} style={styles.categoryImage} />
                <View style={{gap:5}}>
                <Text style={styles.categoryDescription}><Text style={{fontSize:12}}>Rs.</Text> {item.price}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.minOrderBulkOrderContent}>
                <View style={styles.minOrderContainer}>
                  <AntDesign name="API" size={15} color="rgba(52, 152, 219, 1)" />
                  <Text style={styles.minOrderText}> min. Quantity: {item.min_qty}</Text>
                </View>
                <View style={styles.minOrderContainer}>
                  {item.bulk_price_available > 0 ? (
                    <View style={styles.bulkOrderContainer}>
                      <FontAwesome5 name="cubes" size={15} color="red" />
                      <Text style={{ color: 'red',fontSize:12 }}> Bulk Available</Text>
                    </View>
                  ) : null}
                </View>
                </View>
                </View>
                {selectedProduct === item ? (
                  <View style={styles.counterContainer}>
                    {quantity == 1 ? (
                      <TouchableOpacity style={styles.counterButton} onPress={hideCounter}>
                        <MaterialIcons name="delete" size={24} color="black" />
                      </TouchableOpacity>
                    ) :
                      <TouchableOpacity style={styles.counterButton} onPress={decreaseQuantity}>
                        <Ionicons name="remove" size={24} color="black" />
                      </TouchableOpacity>
                    }
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity style={styles.counterButton} onPress={increaseQuantity}>
                      <Ionicons name="add" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.addbutton} onPress={() => handleProductPress(item)}>
                    <View style={styles.circleContainer}>
                      <Icon name="plus" size={20} color="#ffff" />
                    </View>
                  </TouchableOpacity>
                )}
                
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) :
        <View style={styles.NoItem}>
            <Text style={{fontSize:17}}>No item to show</Text>
        </View>
      }
    </View>
      }
      
    </ScrollView>
  );
};

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
    // textDecorationLine: 'underline',
    marginBottom: 12,
    display:"flex",
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    // height:500,
  },
  Maincontainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3 * vw,
  },
  categoryContainer: {
    width: 43 * vw,
    height: 55 * vw,

    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: 'gray',
    // alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 20 * vw,
    borderRadius: 8,
    marginBottom: 12,
    top: 12,
    alignSelf: "center"
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryDescription: {
    fontSize: 20,
    color: 'orange',
    // fontWeight: 'bold'
  },
  addbutton: {
    position: 'absolute',
    bottom: 190,
    right: 5,
    top: 0,
    padding: 5,
    borderRadius: 50,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    backgroundColor: 'orange',
    borderRadius: 50,
    elevation: 5,
  },
  counterContainer: {
    width:40 * vw,
    position: 'absolute',
    display:"flex",
    margin:'auto',
    // alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
    justifyContent: 'space-around',
    // paddingHorizontal: 5 * vw,
    // paddingVertical: 1 / 2 * vw,
    // paddingHorizontal: 1 / 8 * vw,
    marginTop: 5
  },
  counterButton: {
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  minOrderContainer: {
    // marginBottom: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  minOrderBulkOrderContent:{
    gap:3,
    // marginTop:7
  },
  bulkOrderContainer: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  minOrderText: {
    color: 'rgba(52, 152, 219, 1)',
    fontSize: 12,
  },
  NoItem:{
    display:"flex",
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    height:500,
  },
  name:{
    fontSize:16
  }
});

export default AllProducts;
