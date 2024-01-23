import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { vw } from '../utils/ScreenSize';
import Header from '../Components/Shop/Header';
import RoundedButton from '../Components/Shop/ButtonCart';
import { Ionicons } from '@expo/vector-icons';
import Categories from '../Components/Shop/Categories';

const ProductDetail = ({ navigation }) => {
    const productDetails = {
        imageUrl: 'https://cdn.britannica.com/75/181375-050-B1219B33/seeds-chia-plant-Mexico-Guatemala-Chia-coating.jpg',
        title: 'Product Title',
        price: 99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...',
        minOrderQty: 5,
    };

    const [quantity, setQuantity] = useState(0);
    const [totalBill, setTotalBill] = useState(productDetails.price);

    useEffect(() => {
        const calculatedBill = quantity * productDetails.price;
        setTotalBill(calculatedBill);
    }, [quantity]);

    const addToCart = () => {
        console.log(`Added ${quantity} items to cart. Total Bill: Rs.${totalBill}`);
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.container}>
                <Image source={{ uri: productDetails.imageUrl }} style={styles.productImage} />
                <View style={styles.minOrderContainer}>
                    <Ionicons name="add" size={24} color="rgba(52, 152, 219, 1)" />
                    <Text style={styles.minOrderText}>Minimum Order Quantity: {productDetails.minOrderQty}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{productDetails.title}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>Rs.{productDetails.price}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{productDetails.description}</Text>
                    </View>
                </View>
                <View style={styles.counterContainer}>
                    <Text style={styles.productDetail}> Select Quantity</Text>
                    <TouchableOpacity style={styles.counterButton} onPress={decreaseQuantity}>
                        <Ionicons name="remove" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity style={styles.counterButton} onPress={increaseQuantity}>
                        <Text>
                            <Ionicons name="add" size={24} color="black" />
                        </Text>
                    </TouchableOpacity>
                </View>
                <RoundedButton
                    onPress={addToCart}
                    iconName="shopping-cart"
                    buttonText={`Add To Cart`}
                    price={`Rs.${totalBill}`}
                />
                <Categories />
            </View>
        </ScrollView>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 5 * vw,
        paddingVertical: 8 * vw,

    },
    minOrderContainer: {
        borderWidth: 2,
        borderColor: 'rgba(52, 152, 219, 1)',
        backgroundColor: 'rgba(52, 152, 219, 0.5)',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row',  // Display items in a row
    },
    minOrderText: {
        color: 'rgba(52, 152, 219, 1)',
        fontSize: 16,
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
        borderRadius: 8,
    },
    detailsContainer: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    price: {
        fontSize: 16,
        color: 'orange',
        fontWeight: 'bold',
    },
    descriptionContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    description: {
        fontSize: 16,
        color: '#333',
    },
    counterContainer: {
        borderRadius: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center',
        paddingHorizontal: 5 * vw,
        paddingVertical: 2 * vw,
    },
    counterButton: {
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDetail: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    totalBill: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
