import { StyleSheet, Text, View , ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import Color from '../Color'
// import { Picker } from '@react-native-picker/picker';
import { vw,vh } from '../utils/ScreenSize'
import { Picker } from '@react-native-picker/picker'
const TaskDetail = ({navigation , route}) => {
  const { items } = route.params;
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
        console.log(items)
    },[])
    
    /* Remove this data */
    const AssignData=[
        'Pete','Mark','John','Connie'
    ]
    const options=[
        {
            label:"Company",
            value: items.client_company_name
        },
        {
            label:"Task",
            value: items.project_title
        },
        {
            label:"Status",
            value: "0",
            selectoptions:true,
        },
        {
            label:"Start Date",
            value:items.project_date_start
        },
        {
            label:"End Date",
            value:items.project_date_due
        },
        {
            label:"Priority",
            value:items.task_priority
        },

    ]
    const data=['New (Unassigned)', 'Not Started', 'In Progress', 'On Hold','Query Resolved','Query Raised','Completed']
    const [selectedStatus, setSelectedStatus] = useState(2);
  return (
    <View style={styles.mainContainer}>
     {
      !loading ? 
      <View style={styles.Container}>
        {options.map((option, index) => (
          <View key={index} style={styles.optionContainer}>
            <Text style={styles.label}>{option.label}</Text>
           
            {option.selectoptions ? (
              <SelectDropdown
              data={data}
              buttonStyle={{backgroundColor:"white",height:vh*5,width:vw*45,display:"flex",flexDirection:"row",justifyContent:"row"}}
              dropdownStyle={{marginTop: -(vh*4)}}
              buttonTextStyle={{fontSize:15,alignSelf:"right"}}
              /* Change the default value */
              defaultValue={data[0]}
              style={{backgroundColor:"white",height:20,}}
              onSelect={(selectedItem, index) => {
                setSelectedStatus(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
  
                return item
              }}
            />
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
                items?.assigned.map((item,index)=>{
                  return(
                    <View key={index} style={[styles.individual,{backgroundColor:index%2==0 ? '#D2CBBC' : '#F2F1CF'}]}>
                        <Text style={styles.dataText}>{`${item.first_name} ${item.last_name}`}</Text>
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
        flex:1,
        width: '40%',
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
        color: '#000', // Set the text color
      },
      pickerItem: {
        color: 'black', // Set the text color of items
        fontSize: 12
      },
    
})