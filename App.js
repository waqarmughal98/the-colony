import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./Navigation/DrawerNavigator";
import Context from "./src/Global/Context";
import { Platform, StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import UseFont from "./src/utils/UseFont";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await UseFont();
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    };

    loadFonts();

    StatusBar.setBarStyle("light-content");
    if (Platform.OS === "android") {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <Context>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>
      <Toast/>
    </Context>
  );
}

export default App;
