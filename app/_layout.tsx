import { SplashScreen, Stack } from "expo-router";
import {useFonts} from "expo-font";
import { useEffect } from "react";


import './globals.css';

export default function RootLayout() {
  const [fontsLoaded, error] =useFonts({
    'QuickSand-bold': require('../assets/fonts/Quicksand-Bold.ttf',),
    'QuickSand-semiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'QuickSand-regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    'QuickSand-medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    'QuickSand-light': require('../assets/fonts/Quicksand-Light.ttf'),

  });

  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
