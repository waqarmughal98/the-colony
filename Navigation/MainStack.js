import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { ContextProvider } from '../src/Global/Context';
import Login from '../src/Screens/Login';
import TabNavigator from './TabNavigator';

const MainStack = createNativeStackNavigator();
const MainStackNavigator = () => {
  const { LoginState } = useContext(ContextProvider);
  return (
    <MainStack.Navigator initialRouteName='LoginScreen'>
      <>
        {LoginState == false ? (
            <MainStack.Screen
              name="LoginScreen"
              component={Login}
              options={{ headerShown: false }}
            />
        ) : (
            <MainStack.Screen
              name="Tabs"
              component={TabNavigator}
              options={{headerShown:false}}
            />
        )}
      </>
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
