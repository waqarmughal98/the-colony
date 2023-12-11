import { StyleSheet,TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import {Ionicons } from '@expo/vector-icons';
const Profile = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({

      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
        <TouchableOpacity
          onPress={() =>navigation.navigate("Dashboard")}
          activeOpacity={0.6}
        >
         <Ionicons name="ios-arrow-back-sharp" size={24} color="white" style={{marginLeft:12}} />
        </TouchableOpacity>
      </View>
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})