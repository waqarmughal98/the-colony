
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './Navigation/DrawerNavigator';
import Context, { ContextProvider } from './src/Global/Context';
import { Platform, StatusBar } from 'react-native';
import Color from './src/Color';
import Toast from 'react-native-toast-message';
function App() {
  StatusBar.setBarStyle('light-content');
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(Color.darkOrange);
  }
  return (
    <Context>
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>
      <Toast/>
    </Context>
  );
}

export default App;
