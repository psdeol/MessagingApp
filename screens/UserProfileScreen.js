import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, ScrollView, View, TextInput, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAuth } from 'firebase/auth';

export default function UserProfileScreen({ app }) {
    const [user, setUser] = useState(null);
    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        if (!route.params.user) {
            console.log('No user provided');
            return;
        }
        setUser(route.params.user);
    }, [])

    return (
        <View style={{ flex: 1 }} >
            <Image source={{ uri: user?.photoURL }} style={styles.image} />
            <ScrollView style={styles.container} >
                <View style={styles.userInfoContainer}>
                    <View>
                        <Text style={styles.name}>{user?.name}</Text>
                        <Text style={styles.email}>{user?.email}</Text>
                        <Text style={styles.phone}>XXX-XXX-XXXX</Text>
                    </View>
                    <View style={styles.iconsContainer}>
                        <Pressable onPress={() => console.log("hello")} style={styles.iconContainer} >
                            <Ionicons name="chatbubble" size={24} color="black"  />
                        </Pressable>
                        <Pressable onPress={() => console.log("hello")} style={styles.iconContainer} >
                            <Ionicons name="videocam" size={24} color="black"  />
                        </Pressable>
                        <Pressable onPress={() => console.log("hello")} style={styles.iconContainer} >
                            <Ionicons name="call" size={24} color="black"  />
                        </Pressable>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', marginVertical: 1 }}>
                    <Text style={styles.status}>The user's status will go here probably </Text>
                </View>
                <Pressable style={{ backgroundColor: 'white', marginTop: 40, marginBottom: 1, alignItems: 'center' }}>
                    <Text style={{ color: 'red', fontSize: 18, padding: 15}}>Block User </Text>
                </Pressable>
                <Pressable style={{ backgroundColor: 'white', marginVertical: 1, alignItems: 'center' }}>
                    <Text style={{ color: 'red', fontSize: 18, padding: 15}}>Report User </Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '55%',
        borderRadius: 0,
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
    userInfoContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 1,
        justifyContent: 'space-between'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 30
    },  
    iconContainer: {
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginLeft: 5,
    },
    name: {
        fontSize: 20,
        marginLeft: 30,
        marginTop: 15,
        marginBottom: 5,
    },
    email: {
        fontSize: 12, 
        marginLeft: 30,
        color: '#787878'
    },
    phone: {
        fontSize: 12,
        marginLeft: 30,
        marginBottom: 15,
        color: '#787878'
    },
    status: {
        fontSize: 14,
        paddingHorizontal: 30,
        paddingVertical: 15,
    }
});