import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/core";
import { StackActions } from "@react-navigation/native";
import { getDoc, getDocs, query, collection, doc, setDoc, updateDoc, getFirestore, arrayUnion } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import styles from "./styles";

export default function UserItem({ user, app}) {
    const navigation = useNavigation();
    const route = useRoute();

    const openChat = async () => {
        const currentUserDoc = await getDoc(doc(getFirestore(app), 'users', getAuth(app).currentUser.uid));

        if (!currentUserDoc.exists) {
            console.log('Current user doc not found');
            return;
        }

        const currentUser = {
            id: currentUserDoc.data().id,
            email: currentUserDoc.data().email,
            name: currentUserDoc.data().name,
            photoURL: currentUserDoc.data().photoURL,
            status: currentUserDoc.data().status,
        };
        const clickedUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            photoURL: user.photoURL,
            status: user.status,
        };
        const db = getFirestore(app);
        let chatID = null;

        // check if a room already exists between these two users
        const querySnapshot = await getDocs(query(collection(db, "rooms")));
        querySnapshot.forEach((doc) => {
            let users = doc.data().users;
            let currentUserFound = (users.filter(u => u.id === currentUser.id).length > 0);
            let clickedUserFound = (users.filter(u => u.id === clickedUser.id).length > 0);

            // room found
            if (currentUserFound && clickedUserFound && users.length == 2) {
                chatID = doc.data().id;
                return;
            }
        });

        // if no room found, create a chat room
        if (!chatID) {
            chatID = "R" + Date.now().toString();

            await setDoc(doc(db, "rooms", chatID), {
                id: chatID,
                name: "",
                createdAt: new Date().toLocaleString(),
                users: [currentUser, clickedUser],
                messages: [],
                lastMessage: null,
                newMessages: 0
            });
            
            // connect authenticated user with the chat room
            await updateDoc(doc(db, 'users', currentUser.id), {
                rooms: arrayUnion(chatID)
            });

            // connect clicked user with the chat room
            await updateDoc(doc(db, 'users', user.id), {
                rooms: arrayUnion(chatID)
            });
        }
        
        navigation.navigate('ChatRoom', { id: chatID });
    }

    const addToChatRoom = async () => {
        if (!route?.params?.room) {
            console.log('No room provided');
            return;
        }

        const userToAdd = {
            id: user.id,
            email: user.email,
            name: user.name,
            photoURL: user.photoURL,
        };

        await updateDoc(doc(getFirestore(app), 'rooms', route.params.room.id), {
            users: arrayUnion(userToAdd)
        })

        navigation.dispatch(StackActions.pop(1));
    }

    const openProfile = async () => {
        navigation.navigate('UserProfile', { user: user });
    }

    const onPress = async () => {
        if (route?.params?.addToChatRoom)
            addToChatRoom();
        else if (route?.params?.openProfile)
            openProfile();
        else
            openChat();
    }

    return (
        <Pressable onPress={() => onPress()} style={styles.container}>
            <Image source={{ uri: user.photoURL }} style={styles.image} />
            <View style={styles.rightContainer}>
                <View style={styles.row}>
                    <Text style={styles.name}>{user.name}</Text>
                </View>
                <Text numberOfLines={1} style={styles.text}>Put user's status here</Text>
            </View>
        </Pressable>
    );
}
