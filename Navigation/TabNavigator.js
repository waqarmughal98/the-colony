import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WorkLog from '../src/Screens/WorkLog';
import { HomeScreenStack, ProfileStackScreen } from './StackNavigators';
import { Entypo, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Image} from 'react-native';
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
          fontFamily: "Sommet-Regular",
        },
        labelStyle: {
          fontSize: 11,
          fontFamily: "Sommet-Regular",
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
          tabBarIcon: ({ }) => (
            <Image
              source={require('../assets/imgs/logo.png')}
              style={{ height: 50, width: 50, marginTop: 10 ,borderRadius:100,}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStackScreen}
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

  export default  TabNavigator