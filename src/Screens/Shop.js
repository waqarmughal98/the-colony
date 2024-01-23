import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Shop/Header'
import Categories from '../Components/Shop/Categories'
import { vw } from '../utils/ScreenSize'
const Shop = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <Categories navigation={navigation} />
    </View>
  )
}
export default Shop
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5 * vw,
  }
})