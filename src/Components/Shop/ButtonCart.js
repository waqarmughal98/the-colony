import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RoundedButton = ({ onPress, iconName, buttonText, price }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <FontAwesome name={iconName} size={20} color="#FFF" style={styles.icon} />
      <Text style={styles.buttonText}>{buttonText}</Text>
      <Text style={styles.buttonText}>{price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'orange',
    borderRadius: 15,
    height: 60,
    padding: 10,
  },
  icon: {
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RoundedButton;
