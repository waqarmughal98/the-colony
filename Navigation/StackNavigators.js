import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../src/Screens/Login';
import Profile from '../src/Components/Jobs Detail/Profile';
import Dashboard from '../src/Screens/Dashboard';
import AllJobs from '../src/Screens/AllJobs';
import UpdatePassword from '../src/Screens/UpdatePassword';
import JobsDetail from '../src/Screens/JobsDetail';
import ProblemReportReplies from '../src/Screens/ProblemReportReplies';
import ProblemReports from '../src/Components/Jobs Detail/ProblemReports';
import WorkLog from '../src/Screens/WorkLog';
import LatestActivity from '../src/Screens/LatestActivity';
import Notifications from '../src/Screens/Notifications';
import Tasks from '../src/Screens/Tasks';
import TaskInProgress from '../src/Screens/TaskInProgress';
import TasksInPending from '../src/Screens/TasksInPending';
import TaskDetail from '../src/Screens/TaskDetail';
import JobStatus from '../src/Screens/JobStatus';
import Requests from '../src/Screens/Requests';
import AddRequest from '../src/Screens/AddRequest';
import NewProblemReport from '../src/Screens/NewProblemReport';
import AllProblemReports from '../src/Screens/AllProblemReports';
import ReplyTicket from '../src/Screens/ReplyTicket';
import Calender from '../src/Screens/Calender';
import { useContext } from 'react';
import { ContextProvider } from '../src/Global/Context';

const LoginStack = createNativeStackNavigator();
function LoginStackScreen() {
  const screenOptions = {
    headerStyle: { backgroundColor: '#FBA200' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    gestureEnabled: true,
  };
  return (
    <LoginStack.Navigator
      screenOptions={screenOptions}
      initialRouteName="Login"
    >
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </LoginStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
  const screenOptions = {
    headerStyle: { backgroundColor: '#FBA200' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    gestureEnabled: true,
  };
  return (
    <ProfileStack.Navigator
      screenOptions={screenOptions}
      initialRouteName="Profile"
    >
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
function HomeScreenStack() {
  const screenOptions = {
    headerStyle: { backgroundColor: '#FBA200' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    gestureEnabled: true,
  };
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
      <HomeStack.Screen
        name="All-Job"
        component={AllJobs}
        options={{
          title: 'All Jobs',
        }}
      />

      <HomeStack.Screen
        name="update-password"
        component={UpdatePassword}
        options={{
          title: 'Update Password',
        }}
      />
      <HomeStack.Screen
        name="jobs-detail"
        component={JobsDetail}
        options={{
          title: 'Job Info',
        }}
      />
      <HomeStack.Screen
        name="problem-report-replies"
        component={ProblemReportReplies}
        options={{
          title: 'Problem Report Replies',
        }}
      />
      <HomeStack.Screen
        name="problem-reports"
        component={ProblemReports}
        options={{
          title: 'Problem Reports',
        }}
      />
      <HomeStack.Screen
        name="WorkLog"
        component={WorkLog}
        options={{
          title: 'Work Logs',
        }}
      />
      <HomeStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="latest-activity"
        component={LatestActivity}
        options={{
          title: 'Latest Activity',
        }}
      />
      <HomeStack.Screen
        name="notifications"
        component={Notifications}
        options={{
          title: 'Notifications',
        }}
      />
      <HomeStack.Screen
        name="tasks"
        component={Tasks}
        options={{
          title: 'Tasks',
        }}
      />
      <HomeStack.Screen
        name="task-in-progress"
        component={TaskInProgress}
        options={{
          title: 'Tasks In Progress',
        }}
      />
      <HomeStack.Screen
        name="task-in-pending"
        component={TasksInPending}
        options={{
          title: 'Tasks In Pending',
        }}
      />
      <HomeStack.Screen
        name="task-details"
        component={TaskDetail}
        options={{
          title: 'Tasks',
        }}
      />

      <HomeStack.Screen
        name="job-Status"
        component={JobStatus}
        options={{
          title: 'Job Status',
        }}
      />

      <HomeStack.Screen
        name="requests"
        component={Requests}
        options={{
          title: 'Requests',
        }}
      />
      <HomeStack.Screen
        name="add-request"
        component={AddRequest}
        options={{
          title: 'Add Request',
        }}
      />
      <HomeStack.Screen
        name="new-problem-report"
        component={NewProblemReport}
        options={{
          title: 'New Problem Report',
        }}
      />
      <HomeStack.Screen
        name="all-problem-report"
        component={AllProblemReports}
        options={{
          title: 'All Problem Report',
        }}
      />
      <HomeStack.Screen
        name="reply-ticket"
        component={ReplyTicket}
        options={{
          title: 'Reply Ticket',
        }}
      />
      <HomeStack.Screen
        name="calender"
        component={Calender}
        options={{
          title: 'Team Calendar',
        }}
      />
    </HomeStack.Navigator>
  );
}

export { LoginStackScreen, ProfileStackScreen, HomeScreenStack };
