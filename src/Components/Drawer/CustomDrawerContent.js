import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { vh,vw } from '../../utils/ScreenSize';
import Color from '../../Color';
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Your custom drawer content */}
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Mark Nisham</Text>
        <Text style={styles.drawerSubHeaderText}>mark@imaginedesings.co</Text>
      </View>

      {/* Default drawer items */}
      <DrawerItemList {...props} />

      {/* Custom options */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity >
          <Text style={styles.drawerFooterText}>Update Password</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={styles.drawerFooterText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: Color.darkOrange,
    padding: 16,
    height:vh*35,
    marginTop:-8*vh,
    paddingHorizontal:8*vw,
    paddingTop:15*vh
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"white",

  },
  drawerSubHeaderText: {
    fontSize: 16,
    marginTop: 2,
    color:"white"
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    padding: 16,
  },
  drawerFooterText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight:"600",
    marginVertical:15
  },
});

export default CustomDrawerContent;
