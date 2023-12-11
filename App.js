import React, { useState, useEffect } from 'react';
import { AppState, Modal, View, Text, Button,Image } from 'react-native';
import { NavigationContainer , useNavigationState} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './src/Screens/Dashboard';
import AllJobs from './src/Screens/AllJobs';
import ProblemReportReplies from './src/Screens/ProblemReportReplies';
import JobsDetail from './src/Screens/JobsDetail';
import { StatusBar } from 'react-native';
import Login from './src/Screens/Login';
import ProblemReports from './src/Components/Jobs Detail/ProblemReports';
import WorkLog from './src/Screens/WorkLog';
import Tasks from './src/Screens/Tasks';
import TaskDetail from './src/Screens/TaskDetail';
import JobStatus from './src/Screens/JobStatus';
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import Requests from './src/Screens/Requests';
import AddRequest from './src/Screens/AddRequest';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Context from './src/Global/Context';
import CustomDrawerContent from './src/Components/Drawer/CustomDrawerContent';
import NewProblemReport from './src/Screens/NewProblemReport';
import Profile from './src/Components/Jobs Detail/Profile';
import Notifications from './src/Screens/Notifications';
import LatestActivity from './src/Screens/LatestActivity';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function App() {


  StatusBar.setBarStyle('light-content');
  const Tab = createBottomTabNavigator();
  const TabNavigator = () => (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#FBA200' },
        headerTintColor: 'white', 
        headerTitleAlign: 'center',
        tabBarActiveTintColor:"white",
        gestureEnabled: true,
        tabBarStyle: {
          height: 65,
          backgroundColor: 'black',
          paddingBottom:10,
          paddingTop:10,
          position: 'absolute',
          borderTopWidth: 0,
      },
      labelStyle: {
        fontSize: 11,
      },
      }}
    >
      <Tab.Screen
        name="WorkLog"
        component={WorkLogStackScreen}
        options={{
          tabBarLabel: 'Work Log',
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: '',
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/imgs/lb.png')}
              style={{ height: 55, width: 55, marginTop: 10 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );


  return (
    <Context>
       <NavigationContainer>
       <Drawer.Navigator initialRouteName="Dashboard"  drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Back to Dashboard" options={{
              headerShown:false,
            }} component={TabNavigator} />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
    </NavigationContainer>
    </Context>
  );
 
}

export default App;


function HomeStackScreen() {
  const navigationState = useNavigationState(state => state);
  const screenOptions = {
    headerStyle: { backgroundColor: '#FBA200' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    gestureEnabled: true,

  }
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="Login">
       {navigationState.routes[navigationState.index].name === 'Login' ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        ) : (
          <>
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
          name="latest-activity"
          component={LatestActivity}
          options={{
            title: 'Latest Activity'
          }}
        />
        <Stack.Screen
          name="notifications"
          component={Notifications}
          options={{
            title: 'Notifications'
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
        <Stack.Screen
          name="new-problem-report"
          component={NewProblemReport}
          options={{
            title: 'New Problem Report'
          }}
        />
        </>
        )}
  </Stack.Navigator>
  );
}

const WorkLogStack = createNativeStackNavigator();
function WorkLogStackScreen() {
  const screenOptions = {
    headerStyle: { backgroundColor: '#FBA200' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    gestureEnabled: true,

  }
  return (
    <WorkLogStack.Navigator  screenOptions={screenOptions} initialRouteName="work-logs">
         <WorkLogStack.Screen
          name="work-logs"
          component={WorkLog}
          options={{
            title: 'Work Logs'
          }}
        />
  </WorkLogStack.Navigator>
  );
}


