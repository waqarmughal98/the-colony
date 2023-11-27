import { StyleSheet, Text, View } from 'react-native'
import React from 'react',
import MapView, { Marker } from 'react-native-maps';
  

const Map = () => {
  return (
   {/* Your map component goes here */}
   <MapView
   style={{ flex: 1 }}
   initialRegion={{
   latitude: 37.78825, // Replace with the initial latitude of your map
   longitude: -122.4324, // Replace with the initial longitude of your map
   latitudeDelta: 0.0922,
   longitudeDelta: 0.0421,
   }}
>
   {/* You can add a marker if needed */}
   <Marker
   coordinate={{
       latitude: 37.78825, // Replace with the marker's latitude
       longitude: -122.4324, // Replace with the marker's longitude
   }}
   title="Marker Title"
   description="Marker Description"
   />
</MapView>
  )
}

export default Map

const styles = StyleSheet.create({})