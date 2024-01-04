import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export const loadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Bebas': require('./BebasNeue-Regular.ttf'),
    'Open Sans': require('./Opensans.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      console.info('Fonts loaded: ' + fontsLoaded);
    }
  }, [fontsLoaded]);

  return {
    fontsLoaded,
    onLayoutRootView,
  };
};
 