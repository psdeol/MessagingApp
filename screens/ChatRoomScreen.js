import React, { useEffect, useState } from "react"; 
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/core";
import { onSnapshot, getDoc, query, collection, doc, setDoc, updateDoc, getFirestore, arrayUnion } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";

export default function ChatRoomScreen({ app }) {
    const [messages, setMessages] = useState(null);
    const [chatRoom, setChatRoom] = useState(null);
    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchChatRoom = async () => {
            if (!route.params?.id) {
                console.log("No chatroom id provided");
                return;
            }
            
            const room = onSnapshot(doc(getFirestore(app), 'rooms', route.params?.id), (doc) => {
                setChatRoom(doc.data());
                setMessages(doc.data().messages.reverse());
            });

            /*
            if (room.exists())
                setChatRoom(room.data());
            else
                console.log("room document not found");
            */
        }

        fetchChatRoom();
    }, []);

    /*
    useEffect(() => {
        const fetchMessages = async () => {
            if (!chatRoom) 
                return;
            
            setMessages(chatRoom.messages.reverse());
        }
        
        fetchMessages();
    }, []);
    */

    if(!chatRoom) {
        return <ActivityIndicator />
    }

    return (
        <SafeAreaView style={styles.page}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Message app={app} message={item} />} 
                inverted
            />
            <MessageInput app={app} chatRoom={chatRoom} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    }
});