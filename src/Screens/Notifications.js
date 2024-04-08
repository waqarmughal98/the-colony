import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logs from '../Components/Jobs Detail/Logs'
import { vh,vw } from '../utils/ScreenSize'
const Notifications = ({navigation}) => {
  return (
    <View>
      <Logs navigation={navigation} screenName="notification" />
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
    header:{
         height:100*vh
    }
})