import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, ScrollView, View, TextInput, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAuth, signOut } from 'firebase/auth';

export default function SettingsScreen({ app }) {
    const user = getAuth(app).currentUser;

    const logout = async () => {
        const auth = getAuth(app);
        await signOut(auth);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={{ uri: user.photoURL }} style={styles.image} />
            </View>
            <TextInput value={user.displayName} style={styles.input} />
            <TextInput value={user.email} style={styles.input} />
            <TextInput value={"********"} style={styles.input} />
            <Pressable onPress={() => logout()} style={styles.logoutButton}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18}}>Logout</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 50
    },
    container: {
        flex: 1,
        width: '100%',
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 30,
        paddingLeft: 16,
        borderColor: "black"
    },
    logoutButton: {
        backgroundColor: 'red', 
        height: 48, 
        marginVertical: 10,
        marginHorizontal: 30, 
        borderRadius: 5, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});