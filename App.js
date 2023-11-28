import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/Screens/Dashboard';
import AllJobs from './src/Screens/AllJobs';
import ProblemReportReplies from './src/Screens/ProblemReportReplies';
import JobsDetail from './src/Screens/JobsDetail';
import { StatusBar } from 'react-native';
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
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
