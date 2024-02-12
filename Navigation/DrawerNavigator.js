import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../src/Components/Drawer/CustomDrawerContent';
import MainStackNavigator from './MainStack';
import { useContext, useEffect } from 'react';
import { ContextProvider } from '../src/Global/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();

const DrawerNavigator=()=>{
  const { setLOGINSTATE  } = useContext(ContextProvider);
  useEffect(() => {
    (async()=>{
      const authToken = await AsyncStorage.getItem("token");
      if (authToken && authToken !== "") {
        setLOGINSTATE(true)
      }
    })()  
  }, []);
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Main"  options={{drawerLabel:"Back to Dashboard", headerShown:false}} component={MainStackNavigator} />
      </Drawer.Navigator>
    )
}

export default DrawerNavigator