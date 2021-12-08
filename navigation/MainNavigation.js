import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import { Pressable, Text, View, Image, useWindowDimensions, } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { getAuth } from '@firebase/auth';

import ChatRoomScreen from '../screens/ChatRoomScreen';
import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';
import ChatRoomHeader from '../components/ChatRoomHeader';

const Stack = createNativeStackNavigator();

export default function MainNavigator({ app }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerTitle: (app) => HomeHeader(app) }}
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
        </Stack.Navigator>
    );
}

const HomeHeader = ({ app }) => {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    const user = getAuth(app).currentUser;

    return (
        <View 
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width,
                padding: 10,
                alignItems: "center",
                marginRight: 64,
            }}
        >
        <Image
            source={{ uri: user.photoURL }}
            style={{ width: 30, height: 30, borderRadius: 30 }} 
        />
        <Text style={{ flex: 1, textAlign: "center", marginLeft: 50, fontWeight: "bold" }} > Messaging App </Text>
        <Feather name="camera" size={24} color="black" style={{ marginHorizontal: 10 }} />
        <Pressable onPress={() => navigation.navigate('Users')} >
            <Feather name="edit-2" size={24} color="black" style={{ marginHorizontal: 10 }} />
        </Pressable>
        </View>
    );
};


