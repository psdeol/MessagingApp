import React, { useEffect, useState } from "react";
import { View, Image, Text, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import styles from "./styles";

export default function ChatRoomItem({ app, chatRoom }) {
    const [message, setMessage] = useState(null);
    const [timestamp, setTimestamp] = useState(null);
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (!chatRoom) return;

        let mounted = true;

        const fetchChatRoom = async () => {
            const authUser = getAuth(app).currentUser;

            if (mounted) 
                setUser(chatRoom.users.filter(u => u.id !== authUser.uid)[0]);

            const room = onSnapshot(doc(getFirestore(app), 'rooms', chatRoom.id), (doc) => {
                if (mounted) {
                    setMessage(doc.data().lastMessage?.content);

                    if (doc.data().lastMessage)
                        setTimestamp(doc.data().lastMessage.createdAt.toString());
                    else
                        setTimestamp(doc.data().createdAt.toString());
                }
            });
        }

        fetchChatRoom();
        
        return () => {
            mounted = false;
        }
    }, []);

    const onPress = () => {
        navigation.navigate('ChatRoom', { id: chatRoom.id });
    }

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image source={{uri: user?.photoURL}} style={styles.image} />
            {chatRoom.newMessages ? 
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
                </View> 
                : 
                null
            }
            <View style={styles.rightContainer}>
                <View style={styles.row}>
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.time}>{timestamp}</Text>
                </View>
                <Text numberOfLines={1} style={styles.text}>{message}</Text>
            </View>
        </Pressable>
    );
}