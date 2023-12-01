import * as React from 'react';
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
import Footer from './src/Components/Footer/Footer';
import Requests from './src/Screens/Requests';
import AddRequest from './src/Screens/AddRequest';
const Stack = createNativeStackNavigator();
function App() {
  const screenOptions = {
    headerStyle: { backgroundColor: '#FBA200' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    gestureEnabled: true,
  }

  StatusBar.setBarStyle('light-content');

  // React.useEffect(()=>{
  //   (async function(){
  //     let result = await SecureStore.getItemAsync("token");
  //     if(result){
  //       navigation.navigate('Dashboard');
  //     }else{
  //       navigation.navigate('Login');
  //     }
  //   })()
  // },[])
  
  function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
  
            if (route.name === 'WorkLog') {
              iconName = 'briefcase';
              return <SimpleLineIcons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: '#FBA200',
            height: 75,
          },
          labelStyle: {
            fontSize: 11,
          },
        }}
      >
        <Tab.Screen name="WorkLog" component={WorkLog} options={{ title: 'WorkLog' }} />
        <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      </Tab.Navigator>
    );
  }
  

  return (
    <NavigationContainer>
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
      <Footer/>
    </NavigationContainer>
  );
}

export default App;
