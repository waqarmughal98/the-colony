import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { vw } from '../utils/ScreenSize';
import Data from '../Components/Shop/Data';
import { FontAwesome } from '@expo/vector-icons';
import RoundedButton from '../Components/Shop/ButtonCart';

const Cart = () => {
  const confirmOrder = () => {
    console.log('Button pressed!');
  };
  const addItems = () => {
    console.log('Button pressed!');
  };
  return (
    <View style={styles.container}>
      {Data.length < 0 ? (
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <View style={styles.Maincontainer}>
              {Data.map((item) => (
                <View key={item.id} style={styles.categoryContainer}>
                  <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
                  <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                      <Text style={styles.categoryTitle}>
                        {item.title}
                      </Text>
                      <FontAwesome name="remove" size={20} color="orange" />
                    </View>
                    <Text style={styles.categoryDescription}>{item.description}</Text>
                  </View>
                </View>
              ))}
            </View>
            <RoundedButton
              onPress={confirmOrder}
              iconName="shopping-cart"
              buttonText="Confirm Order"
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image
            source={{
              uri: "https://static.oxinis.com/healthmug/image/healthmug/empty-cart.webp",
            }}
            style={styles.emptyCartImage}
          />
          <Text style={styles.emptyCartText}>No Items to show</Text>
          <RoundedButton
            onPress={addItems}
            iconName="shopping-cart"
            buttonText="Add Items"
          />
        </View>

      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingBottom: 200,
  },
  Maincontainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    gap: 3 * vw,
  },
  categoryContainer: {
    width: 110 * vw,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    flexWrap: 'wrap',
    shadowColor: 'gray',
    flexDirection: 'row',
  },
  categoryImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
    alignContent: 'space-between'
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryDescription: {
    fontSize: 12,
    // Allow text to wrap to the next line
  },
});
