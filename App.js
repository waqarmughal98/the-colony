import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/Screens/Dashboard';
import AllJobs from './src/Screens/AllJobs';
import ProblemReportReplies from './src/Screens/ProblemReportReplies';
import JobsDetail from './src/Screens/JobsDetail';
import { StatusBar } from 'react-native';
import Login from './src/Screens/Login';
import SplashScreen from './src/Screens/SpashScreen';
import ProblemReports from './src/Components/Jobs Detail/ProblemReports';
const Stack = createNativeStackNavigator();
function App() {

  const screenOptions = {
    headerStyle: { backgroundColor: '#FBA200' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    gestureEnabled: true,
  }

  StatusBar.setBarStyle('light-content');

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="SplashScreen">
      <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
