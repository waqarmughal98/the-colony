import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logs from '../Components/Jobs Detail/Logs'
import { vh,vw } from '../utils/ScreenSize'
const Notifications = () => {
  return (
    <View>
      <Logs screenName="notification" />
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
    header:{
         height:100*vh
    }
})