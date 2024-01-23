import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { vh, vw } from '../../utils/ScreenSize';

const Header = () => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.6}>
        <View style={styles.mainContainer}>
          <Entypo name="location-pin" size={26} color="gray" />
          <View>
            <Text style={styles.text1}>Delivery To</Text>
            <Text style={styles.text1}>
              23 DD, Main Commercial, D..
            </Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={26}
            color="gray"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <View style={styles.searchIconContainer}>
          <Entypo name="magnifying-glass" size={24} color="gray" />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="What do you want to buy?"
            placeholderTextColor="gray"
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 2 * vh,
    display: 'flex',
    gap: 15,
    flexDirection: 'row',
  },
  text1: {
    fontSize: 14,
    color: '#5A5A5A',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 3,
    shadowColor: 'gray',
    marginBottom:16,
  },
  searchIconContainer: {
    marginRight: 10,
    paddingHorizontal: 8,
  },
  inputContainer: {
    flex: 1,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#5A5A5A',
  },
});
