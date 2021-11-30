import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import { ColorSchemeName, Pressable, Text, View, Image, useWindowDimensions, BackHandler, } from 'react-native';
import { Feather } from '@expo/vector-icons';

import ChatRoomScreen from '../screens/ChatRoomScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator({ app }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerTitle: HomeHeader }}
                app={app}
            />
            <Stack.Screen
                name="ChatRoom"
                component={ChatRoomScreen}
                options={{ headerTitle: ChatRoomHeader, headerBackTitleVisible: false }}
            />
        </Stack.Navigator>
    );
}

const HomeHeader = (props) => {
    const { width } = useWindowDimensions();

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
            source={{ uri: "https://picsum.photos/500/500" }}
            style={{ width: 30, height: 30, borderRadius: 30 }} 
        />
        <Text style={{ flex: 1, textAlign: "center", marginLeft: 50, fontWeight: "bold" }} > Signal </Text>
        <Feather name="camera" size={24} color="black" style={{ marginHorizontal: 10 }} />
        <Feather name="edit-2" size={24} color="black" style={{ marginHorizontal: 10 }} />
        </View>
    );
};

const ChatRoomHeader = (props) => {
    const { width } = useWindowDimensions();

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: width - 40,
                padding: 10,
                alignItems: "center",
                marginRight: 170,
            }}
        >
        <Image
            source={{ uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg" }}
            style={{ width: 30, height: 30, borderRadius: 30 }}
        />
        <Text style={{ flex: 1, marginLeft: 10, fontWeight: "bold" }}> {props.children} </Text>
        <Feather name="camera" size={24} color="black" style={{ marginHorizontal: 10 }} />
        <Feather name="edit-2" size={24} color="black" style={{ marginHorizontal: 10 }} />
        </View>
    );
};
