import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
const MyNotes = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#EEE5DC' }}>
      <View style={styles.maiNContainer}>
        <View style={styles.header}>
          <Text style={styles.txt}>Assigned User: John Doe</Text>
          <Text style={styles.txt}>Stated Data: 02-25-2024</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.containerTop}>
            <MaterialCommunityIcons
              name="calendar-edit"
              size={29}
              color="black"
            />
            <Text style={styles.txt2}>My Notes</Text>
          </View>
          <TextInput
            placeholder="Write text.."
            style={styles.input}
            multiline={true}
            textAlignVertical="top"
            selectionColor={'#382504'}
          />
          <View style={styles.fileContainer}>
            {Array(5)
              .fill(0)
              .map((item, index) => {
                return (
                  <View key={index} style={styles.individualMain}>
                    <View style={styles.individual}>
                      <View style={styles.individualLeft}>
                        <View style={styles.numContainer}>
                          <Text style={styles.num}>{index + 1}</Text>
                        </View>
                        <Text style={styles.txt5}>
                          Digital Marketing Agency
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.icon}>
                        <MaterialCommunityIcons
                          name="delete-outline"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.smTxt}>
                      Lorem Ipsum is simply dummy text of the printing
                      and typesetting industry. Lorem Ipsum has been
                      the industry's standard dummy text ever since
                      the 1500s
                    </Text>
                    <View style={styles.dateWrapper}>
                      <Text style={styles.date}>02-25-2024</Text>
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyNotes;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#382504',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  maiNContainer: {
    flex: 1,
    paddingBottom: 70,
  },
  txt: {
    color: 'white',
    fontSize: 12,
  },
  container: {
    padding: 17,
    gap: 17,
    backgroundColor: '#EEE5DC',
    flex: 1,
  },
  containerTop: {
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
  },
  txt2: {
    fontSize: 15,
    fontWeight: '600',
  },
  fileContainer: {
    gap: 15,
  },

  individualMain: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  individual: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-betweem',
    alignItems: 'center',
  },
  txt5: {
    fontSize: 13,
  },
  individualLeft: {
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
  },
  icon: {
    marginLeft: 'auto',
  },
  numContainer: {
    backgroundColor: 'black',
    borderRadius: 100,
    height: 20,
    width: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  num: {
    color: 'white',
    fontWeight: '500',
    fontSize: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 9,
    fontSize: 13,
    borderWidth: 1,
    borderColor: 'lightgray',
    height: 120,
  },
  smTxt: {
    fontSize: 11,
    color: 'gray',
    marginVertical: 5,
  },
  dateWrapper: {
    backgroundColor: '#FBA81A',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 'auto',
  },
  date: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
});
