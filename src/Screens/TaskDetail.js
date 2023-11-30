import { StyleSheet, Text, View , ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../Color'
import { Picker } from '@react-native-picker/picker';
import { vw,vh } from '../utils/ScreenSize'
const TaskDetail = ({navigation}) => {
  const [loading, setLoading]=useState(true)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{ marginRight: 5 }}>
          <TouchableOpacity activeOpacity={0.6}>
           <Text>Update</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

     /* Remove this when fethc data */
    useEffect(()=>{
        setTimeout(() => {
           setLoading(false) 
        }, 1000);
    },[])
    
    /* Remove this data */
    const AssignData=[
        'Pete','Mark','John','Connie'
    ]
    const options=[
        {
            label:"Company",
            value:"Severn Trent"
        },
        {
            label:"Task",
            value:"Take Surve"
        },
        {
            label:"Status",
            value:"",
            selectoptions:['In Progress', 'New (Unassigned)','Not Started','On Hold','Query Resolved','Query Raised','Completed'],
        },
        {
            label:"Start Date",
            value:"04-03-2022"
        },
        {
            label:"End Date",
            value:"04-03-2022"
        },
        {
            label:"Priority",
            value:"Low"
        },

    ]
    const [selectedStatus, setSelectedStatus] = useState('');
  return (
    <View style={styles.mainContainer}>
        
     {
        !loading ? 
        <View style={styles.Container}>
              {options.map((option, index) => (
            <View key={index} style={styles.optionContainer}>
              <Text style={styles.label}>{option.label}</Text>
              {option.selectoptions && Array.isArray(option.selectoptions) ? (
                <Picker
                selectedValue={selectedStatus}
                onValueChange={(itemValue) => setSelectedStatus(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem} // Add this line for styling items
            >
                <Picker.Item label="In Progress" value="In Progress" />
                <Picker.Item label="New (Unassigned)" value="New (Unassigned)" />
                <Picker.Item label="Not Started" value="Not Started" />
                {/* Add more items as needed */}
            </Picker>
            ) : (
              <Text style={styles.value}>{option.value}</Text>
            )}
            </View>
          ))}
          
          <View style={styles.bottomContainer}>
            <View style={styles.TextContainer}>
                <Text style={styles.text1}>Assigned</Text>
            </View>

          <View>
            <ScrollView>
              {
                AssignData.map((item,index)=>
                {
                    return(
                            <View style={[styles.individual,{backgroundColor:index%2==0 ? '#D2CBBC' : '#F2F1CF'}]}>
                            <Text style={styles.dataText}>{item}</Text>
                            </View>
                    )
                })
              }
            </ScrollView>
          </View>
             
          </View>
         </View>
      :
      <View style={styles.Indicator}>
           <ActivityIndicator size="large" color={"black"} />
                <Text style={styles.fetchingData}>Fetching Data</Text>
      </View>
     }
  
    </View>
  )
}

export default TaskDetail

const styles = StyleSheet.create({
    mainContainer:{
       flex:1  
    },
    Container:{
        height: '100%',
        backgroundColor:'#EFE5DC' 
      },
    Indicator:
    {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        marginTop:vh*37
    },
    fetchingData:{
        color:'black',
        fontWeight:"bold"
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingVertical: 15,
        paddingHorizontal: 15,
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
      },
      value: {
        fontSize: 16,
      },
   
      picker: {
        width: '50%',
      },
      value: {
        fontSize: 16,
      },
      optionText:{
        color:"black"
      },
      bottomContainer:{
        paddingHorizontal:20,
      },
      text1:{
        fontSize:16,
        paddingHorizontal:15
      },
      TextContainer:{
       marginTop:20,
       height:45,
       display:"flex",
       justifyContent:"center",
       backgroundColor:'white', 
       borderTopWidth:1,
       borderTopColor:Color.brightOrange
      },
      dataText:{
        fontSize:14,
        color:'black',
        flex:0.4
    },
    dataText2:{
        fontSize:14,
        color:'black',
        flex:0.6,
        textAlign:"center"
    },
    individual:{
        height:45,
        display:"flex",
        flexDirection:'row',
        alignItems:"center",
        paddingHorizontal:20,
        borderBottomColor:Color.brightOrange,
        borderBottomWidth:1
    },
    
    picker: {
        height: 20, // Adjust the height as needed
        width: 200, // Adjust the width as needed
        backgroundColor: 'white', // Set the background color
        color: 'black', // Set the text color
      },
      pickerItem: {
        color: 'black', // Set the text color of items
      },
    
})