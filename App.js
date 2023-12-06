import * as React from 'react';
import { Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/Screens/Dashboard';
import AllJobs from './src/Screens/AllJobs';
import ProblemReportReplies from './src/Screens/ProblemReportReplies';
import JobsDetail from './src/Screens/JobsDetail';
import { StatusBar } from 'react-native';
import Login from './src/Screens/Login';
import ProblemReports from './src/Components/Jobs Detail/ProblemReports';
import WorkLog from './src/Screens/WorkLog';
import Logs from './src/Components/Jobs Detail/Logs';
import Tasks from './src/Screens/Tasks';
import TaskDetail from './src/Screens/TaskDetail';
import JobStatus from './src/Screens/JobStatus';
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import Requests from './src/Screens/Requests';
import AddRequest from './src/Screens/AddRequest';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
function HomeStackScreen() {
  const screenOptions = {
    headerStyle: { backgroundColor: '#FBA200' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    gestureEnabled: true,
  }

 
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false, // Hide header on the Login screen
      }}
    />

    <Stack.Screen name="Dashboard"  component={Dashboard} />
    <Stack.Screen
      name="All-Job"
      component={AllJobs}
      options={{
        title: 'All Jobs'
      }}
    />
    <Stack.Screen
      name="jobs-detail"
      component={JobsDetail}
      options={{
        title: 'Jobs Detail'
      }}
    />
    <Stack.Screen
      name="problem-report-replies"
      component={ProblemReportReplies}
      options={{
        title: 'Problem Report Replies'
      }}
    />
    <Stack.Screen
      name="problem-reports"
      component={ProblemReports}
      options={{
        title: 'Problem Reports'
      }}
    />

     <Stack.Screen
      name="work-logs"
      component={WorkLog}
      options={{
        title: 'Work logs'
      }}
    />
   
     <Stack.Screen
      name="latest-activity"
      component={Logs}
      options={{
        title: 'Latest Activity'
      }}
    />
      <Stack.Screen
      name="tasks"
      component={Tasks}
      options={{
        title: 'Tasks'
      }}
    />
      <Stack.Screen
      name="task-details"
      component={TaskDetail}
      options={{
        title: 'Tasks'
      }}
    />

    <Stack.Screen
      name="job-Status"
      component={JobStatus}
      options={{
        title: 'Job Status'
      }}
    />

    <Stack.Screen
      name="requests"
      component={Requests}
      options={{
        title: 'Requests'
      }}
    />
    <Stack.Screen
      name="add-request"
      component={AddRequest}
      options={{
        title: 'Add Request'
      }}
    />
  
  </Stack.Navigator>
  );
}


  function App() {
    StatusBar.setBarStyle('light-content');
    const Tab = createBottomTabNavigator();
    const screenOptions = {
      headerStyle: { backgroundColor: '#FBA200' },
      headerTintColor: 'white',
      headerTitleAlign: 'center',
      gestureEnabled: true,
      tabBarStyle: {
        height: 65,
        backgroundColor: 'black',
        position: 'absolute',
        borderTopWidth: 0,
    },
    }
  
    return (
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName='Home'
        screenOptions={screenOptions}
          tabBarOptions={{
            activeTintColor: 'white',
            labelStyle: {
              fontSize: 11,
              marginBottom: 5,
              marginTop:-5
            },
          }}
        >
          <Tab.Screen
             options={{
              title:"Work Log",
              tabBarLabel: 'Work Log',
              tabBarIcon: ({ color, size }) => (
                <SimpleLineIcons name={'briefcase'} size={size} color={color} />
              ),
            }}
            name="WorkLog"
            component={WorkLog}
          />
          <Tab.Screen
            options={{
              tabBarLabel: '',
               headerShown:false,
              tabBarIcon: ({ color, size }) => (
                <Image source={require('./assets/imgs/lb.png')} style={{ height: 55, width: 55, marginTop:10}} />
              ),
            }}
            name="Home"
            component={HomeStackScreen}  
          />
        
        <Tab.Screen name="Profile" component={WorkLog}   options={{
              title:"Profile",
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color}  />
              ),
            }} />
      </Tab.Navigator>
      </NavigationContainer>
    );
  }
  



export default App;
