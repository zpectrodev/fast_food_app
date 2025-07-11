import {SplashScreen, Stack} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";


import './globals.css';
import * as Sentry from '@sentry/react-native';
import useAuthStore from "@/store/auth.store";

Sentry.init({
    dsn: 'https://5d6a5cf2d286ff0399fba814e5f2e435@o4507008233308160.ingest.us.sentry.io/4509648254664704',

    // Adds more context data to events (IP address, cookies, user, etc.)
    // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
    sendDefaultPii: true,

    // Configure Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
    const{isLoading, fetchAuthenticatedUser} = useAuthStore()
    const [fontsLoaded, error] = useFonts({
        'QuickSand-bold': require('../assets/fonts/Quicksand-Bold.ttf',),
        'QuickSand-semiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
        'QuickSand-regular': require('../assets/fonts/Quicksand-Regular.ttf'),
        'QuickSand-medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        'QuickSand-light': require('../assets/fonts/Quicksand-Light.ttf'),

    });

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    useEffect(() => {
        fetchAuthenticatedUser();
    }, []);

    if (!fontsLoaded || isLoading) {
        return null; // or a loading spinner
    }
    return <Stack screenOptions={{headerShown: false}}/>;
});