import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { vw } from '../utils/ScreenSize'
import Header from '../Components/Shop/Header'
import Categories from '../Components/Shop/Categories'
import AllProducts from '../Components/Shop/AllProducts'
const CategoryProduct = ({route, navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <AllProducts navigation={navigation} route={route}/>
    </View>
  )
}
export default CategoryProduct
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5 * vw,
  }
})