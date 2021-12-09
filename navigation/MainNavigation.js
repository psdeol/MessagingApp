import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';

import ChatRoomScreen from '../screens/ChatRoomScreen';
import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeHeader from '../components/HomeHeader';
import ChatRoomHeader from '../components/ChatRoomHeader';

const Stack = createNativeStackNavigator();

export default function MainNavigator({ app }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerTitle: () => <HomeHeader app={app} /> }}
                app={app}
            />
            <Stack.Screen
                name="ChatRoom"
                component={ChatRoomScreen}
                options={({ route }) => ({
                    headerTitle: () => <ChatRoomHeader app={app} id={route.params?.id} />,
                    headerBackTitleVisible: false,
                })}
                app={app}
            />
            <Stack.Screen
                name="Users"
                component={UsersScreen}
                options={{ title: "Users" }}
                app={app}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: "Settings" }}
                app={app}
            />
        </Stack.Navigator>
    );
}
