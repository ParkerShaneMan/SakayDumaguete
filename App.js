
//essentials
import React, { useState, useEffect } from 'react';

//assets
import { loadFonts } from './assets/Fonts/fontsloader';

//components
// import { giveBorder, setBordered, getIsBordered } from './components/bordertesting';

//screens
import CarouselScreen from './screens/Carousel';
import Login from './screens/LogIn';
import FAQ from './screens/FAQ';
import Onboarding from './screens/Onboarding';
import SignUp from './screens/SignUp';
import MainPassengerNav from './screens/MainPassengerNav';
import MainDriverNav from './screens/MainDriverNav';
import EditProfile from './screens/EditProfile';
import About from './screens/About';

//router 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'



const Stack = createStackNavigator();

export default function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  const { fontsLoaded, onLayoutRootView } = loadFonts();
  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return (
      console.error("fonts not loaded")
    );
  }

  return (
    <NavigationContainer>
      {/* set to actual initial for testing purposes only ni ako gi signup */}
      <Stack.Navigator initialRouteName="Carousel">
        <Stack.Screen
          name="Carousel"
          component={CarouselScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} options={{ headerTitle: 'Welcome to SAKAY Duma!' }} />
        <Stack.Screen name="FAQ" component={FAQ} options={{ title: "" }} />
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ title: "" }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Cancel" }} />
        <Stack.Screen name="MainPassengerNav" component={MainPassengerNav} options={{ title: "", headerShadowVisible: false }} />
        <Stack.Screen name="MainDriverNav" component={MainDriverNav} options={{ title: "", headerShadowVisible: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "" }} />
        <Stack.Screen name="About" component={About} options={{ title: "" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
