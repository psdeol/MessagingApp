import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from './navigation';

import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from '@env';

import { initializeApp } from 'firebase/app'
//import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
    return (
        <SafeAreaProvider>
        <Navigation app={app} />
        <StatusBar />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
