import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { AppState, Modal, View, Text, Button,Image,Platform} from 'react-native';
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
import TaskInProgress from './src/Screens/TaskInProgress';
import TasksInPending from './src/Screens/TasksInPending';
import TaskDetail from './src/Screens/TaskDetail';
import JobStatus from './src/Screens/JobStatus';
import { SimpleLineIcons, Ionicons,Entypo } from "@expo/vector-icons";
import Requests from './src/Screens/Requests';
import Toast from 'react-native-toast-message'
import AddRequest from './src/Screens/AddRequest';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Context from './src/Global/Context';
import CustomDrawerContent from './src/Components/Drawer/CustomDrawerContent';
import NewProblemReport from './src/Screens/NewProblemReport';
import Profile from './src/Components/Jobs Detail/Profile';
import Notifications from './src/Screens/Notifications';
import LatestActivity from './src/Screens/LatestActivity';
import AllProblemReports from './src/Screens/AllProblemReports';
import ReplyTicket from './src/Screens/ReplyTicket';
import Calender from './src/Screens/Calender';
import Color from './src/Color';
import UpdatePassword from './src/Screens/UpdatePassword';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function App() {
  
  StatusBar.setBarStyle('light-content');
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(Color.darkOrange);
  }
  return (
    <Context>
       <NavigationContainer>
        <Drawer.Navigator initialRouteName="Dashboard"  drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Back to Dashboard" options={{
                headerShown:false,
              }} component={MainStackScreen} />
          {/* Add more screens as needed */}
        </Drawer.Navigator>
        </NavigationContainer>
        <Toast/>
    </Context>
  );
 
}

export default App;


const Tab = createBottomTabNavigator();
  const TabNavigator = () => 
  {
    return(
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#FBA200' },
        headerTintColor: 'white', 
        headerTitleAlign: 'center',
        tabBarActiveTintColor:"white",
        gestureEnabled: true,
        tabBarHideOnKeyboard: true,
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
        component={WorkLog}
        options={{
          tabBarLabel: 'Work Log',
          tabBarIcon: ({ color, size,focused }) => (
            <>
            {
             focused?
             <Entypo name="briefcase"  size={size} color={color} />:
            <SimpleLineIcons name="briefcase" size={size} color={color} />
            }
            </>
          ),
        }}
      />
      
        <Tab.Screen
        name="Home"
        component={HomeScreenStack}
        options={{
          tabBarLabel: '',
          headerShown:false,
          tabBarIcon: ({ size }) => (
            <Image
              source={require('./assets/imgs/logo.png')}
              style={{ height: 50, width: 50, marginTop: 10 ,borderRadius:100,}}
            />
          ),
        }}
      />
   
    
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          // title: 'Profile',
          tabBarLabel: 'Profile',
          headerShown:false,
          tabBarIcon: ({ color, size,focused }) => (
            <Ionicons name={!focused ? "person-outline" : "person" } size={size} color={color} />
          ),
        }}
      />
      
    </Tab.Navigator>
  )}

function MainStackScreen() {
  const screenOptions = {
    headerStyle: { backgroundColor: '#FBA200' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    gestureEnabled: true,

  }
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="Dashboard">
        <Stack.Screen
          name="LoginScreen"
          component={LoginStackScreen}
          options={{ headerShown: false }}
      />
        <Stack.Screen name="Dashboard"  options={{headerShown:false}} component={TabNavigator} />
    </Stack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
function HomeScreenStack() {
  const screenOptions = {
    headerStyle: { backgroundColor: '#FBA200' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    gestureEnabled: true,

  }
  return (
    <HomeStack.Navigator screenOptions={screenOptions} initialRouteName="Dashboard">
 
       <>
          <HomeStack.Screen name="Dashboard"  component={Dashboard} />
          <HomeStack.Screen
            name="All-Job"
            component={AllJobs}
            options={{
              title: 'All Jobs'
            }}
          />
           
          <HomeStack.Screen
            name="update-password"
            component={UpdatePassword}
            options={{
              title: 'Update Password'
            }}
          />
          <HomeStack.Screen
            name="jobs-detail"
            component={JobsDetail}
            options={{
              title: 'Jobs Detail'
            }}
          />
          <HomeStack.Screen
            name="problem-report-replies"
            component={ProblemReportReplies}
            options={{
              title: 'Problem Report Replies'
            }}
          />
          <HomeStack.Screen
            name="problem-reports"
            component={ProblemReports}
            options={{
              title: 'Problem Reports'
            }}
          />
          <HomeStack.Screen
          name="WorkLog"
          component={WorkLog}
          options={{
            title: 'Work Logs'
          }}
        />

        <HomeStack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerShown:false
          }}
        />
        
          <HomeStack.Screen
            name="latest-activity"
            component={LatestActivity}
            options={{
              title: 'Latest Activity'
            }}
          />
          <HomeStack.Screen
            name="notifications"
            component={Notifications}
            options={{
              title: 'Notifications'
            }}
          />
            <HomeStack.Screen
          name="tasks"
            component={Tasks}
            options={{
              title: 'Tasks'
            }}
          />
            <HomeStack.Screen
            name="task-in-progress"
            component={TaskInProgress}
            options={{
              title: 'Tasks In Progress'
            }}
          />
            <HomeStack.Screen
            name="task-in-pending"
            component={TasksInPending}
            options={{
              title: 'Tasks In Pending'
            }}
          />
            <HomeStack.Screen
            name="task-details"
            component={TaskDetail}
            options={{
              title: 'Tasks'
            }}
          />

          <HomeStack.Screen
            name="job-Status"
            component={JobStatus}
            options={{
              title: 'Job Status'
            }}
          />

          <HomeStack.Screen
            name="requests"
            component={Requests}
            options={{
              title: 'Requests'
            }}
          />
          <HomeStack.Screen
            name="add-request"
            component={AddRequest}
            options={{
              title: 'Add Request'
            }}
          />
          <HomeStack.Screen
            name="new-problem-report"
            component={NewProblemReport}
            options={{
              title: 'New Problem Report'
            }}
          />
          <HomeStack.Screen
            name="all-problem-report"
            component={AllProblemReports}
            options={{
              title: 'All Problem Report'
            }}
          />
          <HomeStack.Screen
            name="reply-ticket"
            component={ReplyTicket}
            options={{
              title: 'Reply Ticket'
            }}
          />
          <HomeStack.Screen
            name="calender"
            component={Calender}
            options={{
              title: 'Team Calender'
            }}
          />
          </> 
        </HomeStack.Navigator>
  );
}



const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
  const screenOptions = {
    headerStyle: { backgroundColor: '#FBA200' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    gestureEnabled: true,

  }
  return (
    <ProfileStack.Navigator  screenOptions={screenOptions} initialRouteName="Profile">
         <ProfileStack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerShown:false
          }}
        />
  </ProfileStack.Navigator>
  );
}

const LoginStack = createNativeStackNavigator();
function LoginStackScreen() {
  const screenOptions = {
    headerStyle: { backgroundColor: '#FBA200' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    gestureEnabled: true,

  }
  return (
    <LoginStack.Navigator  screenOptions={screenOptions} initialRouteName="Login">
         <LoginStack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown:false
          }}
        />
  </LoginStack.Navigator>
  );
}




