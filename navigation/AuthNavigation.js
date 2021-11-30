import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';

import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator({ app }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterationScreen}
                app={app}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
        </Stack.Navigator>
    );
}