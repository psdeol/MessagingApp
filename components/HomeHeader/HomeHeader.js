import React from 'react';
import { Pressable, Text, View, Image, useWindowDimensions, } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { getAuth } from '@firebase/auth';

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
            <Pressable onPress={() => navigation.navigate('Settings')}>
                <Image source={{ uri: user.photoURL }} style={{ width: 30, height: 30, borderRadius: 30 }} />
            </Pressable>
            <Text style={{ flex: 1, textAlign: "center", marginLeft: 50, fontWeight: "bold" }} > Messaging App </Text>
            <Feather name="camera" size={24} color="black" style={{ marginHorizontal: 10 }} />
            <Pressable onPress={() => navigation.navigate('Users')} >
                <Feather name="edit-2" size={24} color="black" style={{ marginHorizontal: 10 }} />
            </Pressable>
        </View>
    );
};

export default HomeHeader;