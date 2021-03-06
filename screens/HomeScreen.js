import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import { getDocs, query, collection, onSnapshot, doc, setDoc, updateDoc, getFirestore, arrayUnion } from "@firebase/firestore";
import { getAuth } from '@firebase/auth';

export default function HomeScreen({ app }) {
    const [rooms, setRooms] = useState(null);
    
    useEffect(() => {
        let mounted = true;

        const fetchChatRooms = async () => {
            // listen for new rooms created with current user
            const q = query(collection(getFirestore(app), "rooms"));
            const snapshot = onSnapshot(q, (querySnapshot) => {
                const roomsList = [];

                querySnapshot.forEach((doc) => {
                    if (doc.data().users.filter(u => u.id === getAuth(app).currentUser.uid).length > 0) {
                        roomsList.push(doc.data());
                    }
                })
                
                if (mounted) setRooms(roomsList);
            })
        }

        fetchChatRooms();

        return () => {
            mounted = false;
        }

    }, []);    

    return (
        <View style={styles.page}>
            <FlatList 
                data={rooms}
                renderItem={({ item }) => <ChatRoomItem app={app} chatRoom={item}/>}
                showsVerticalScrollIndicator={false}
            />    
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    },
})