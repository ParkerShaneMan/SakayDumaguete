import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPassenger from './MainPassenger';

import EditProfile from './EditProfile';
import Profile from './Profile';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
//style for navbar
const screenOptions = {
  tabBarStyle:{
    backgroundColor:'#073F40',
    borderTopWidth: 0,
    height:60,
    elevation: 10,
  },
  tabBarItemStyle:{
    margin:5,
    borderRadius:10,

  },
  tabBarLabelStyle: {
    fontSize: 15, 
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
  },
  tabBarInactiveTintColor: '#021212',
  tabBarActiveTintColor: '#A5E5E8',
  // tabBarActiveBackgroundColor: '#aed7d940',
  

};

const MainTabNavigator = () => {
  return (
    
    <Tab.Navigator {...{ screenOptions }}>
      <Tab.Screen
        name="MainPassenger"
        component={MainPassenger}
        options={{
          title: "Home",
          headerShown: false,
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          // You can add additional styling here
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerShown: false,
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),

          // You can add additional styling here
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;