import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { vw,vh } from '../utils/ScreenSize';
import Color from '../Color';
const WorkLog = () => {
  const data = [
    {
      img: require('../../assets/imgs/ic_project_severn_trent.png'),
      title: "Un-Categorised",
    },
    {
      img: require('../../assets/imgs/commercial.png'),
      title: "Commericial",
    },
    {
      img: require('../../assets/imgs/ic_private_project.png'),
      title: "Private",
    },
    {
      img: require('../../assets/imgs/ic_project_severn_trent.png'),
      title: "Sevent Trent",
    },
  ];

  const [selectedTitle, setSelectedTitle] = useState("");

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.card]}
        onPress={() => setSelectedTitle(item.title)}
      >
        <Image style={styles.cardImage} source={item.img} />
        <Text style={[styles.cardTitle]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Horizontal FlatList */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Display selected card title */}
      <View style={styles.selectedCardContainer}>
        <Text style={styles.selectedCardText}>{selectedTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    paddingTop: 20,
  },
  flatListContainer: {
    paddingHorizontal: 5,
  },
  card: {
    width: vw*45,
    height: vh*20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor:Color.brightOrange
  },
  cardImage: {
    width: vw*25,
    height: vh*10,
    resizeMode: 'contain',
  },
  cardTitle: {
    marginTop: 5,
    color:"white"
  },
  selectedCardContainer: {
    backgroundColor: 'black',
    padding: 10,
    marginTop: 20,
    paddingHorizontal:20,
    height:50,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center"
  },
  selectedCardText: {
    color: 'white',
    fontSize: 17,
    textAlign:"left"
  },
});

export default WorkLog;
