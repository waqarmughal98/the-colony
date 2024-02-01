import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../src/Components/Drawer/CustomDrawerContent';
import MainStackNavigator from './MainStack';
const Drawer = createDrawerNavigator();

const DrawerNavigator=()=>{
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Main"  options={{drawerLabel:"Back to Dashboard", headerShown:false}} component={MainStackNavigator} />
      </Drawer.Navigator>
    )
}

export default DrawerNavigator