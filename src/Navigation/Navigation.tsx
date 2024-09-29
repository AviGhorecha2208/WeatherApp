import React from 'react';
import { StatusBar } from 'react-native';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { About, Home, StartupScreen } from '../Screens';
import { Colors } from '../Utils/Colors';
import { Screens } from '../Utils/Const';
import SideMenu from '../Components/SideMenu';
import { widthPx } from '../Utils/Responsive';
import CustomBottomTabs from '../Components/CustomBottomTabs';

export type RootStackParamList = {
  Home: undefined;
  StartupScreen: undefined;
  About: undefined;
  Drawer: undefined;
};

export type DrawerStackParamList = {
  BottomTab: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const Navigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const Drawer = createDrawerNavigator<DrawerStackParamList>();
  const Tab = createBottomTabNavigator();

  const BottomTabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={() => <CustomBottomTabs />}>
        <Tab.Screen name={Screens.Home} component={Home} />
        <Tab.Screen name={Screens.About} component={About} />
      </Tab.Navigator>
    );
  };

  const DashboardDrawer = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          drawerStyle: { width: widthPx(60) },
        }}
        drawerContent={SideMenu}
      >
        <Drawer.Screen name={Screens.BottomTab} component={BottomTabNavigator} />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={Colors.primaryLight} barStyle={'dark-content'} />
      <Stack.Navigator
        initialRouteName={Screens.StartupScreen}
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name={Screens.StartupScreen} component={StartupScreen} />
        <Stack.Screen name={Screens.Drawer} component={DashboardDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
