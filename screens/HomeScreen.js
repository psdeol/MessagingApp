import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import { getDocs, query, collection, onSnapshot, doc, setDoc, updateDoc, getFirestore, arrayUnion } from "@firebase/firestore";
import { signOut, getAuth } from '@firebase/auth';

export default function HomeScreen({ app }) {
    const [rooms, setRooms] = useState(null);
    
    useEffect(() => {
        const fetchChatRooms = async () => {
            /*
            const currentUser = getAuth(app).currentUser;
            const querySnapshot = await getDocs(query(collection(getFirestore(app), "rooms")));
            const roomsList = [];

            querySnapshot.forEach((doc) => {
                if (doc.data().users.filter(u => u.id === currentUser.uid).length > 0) {
                    roomsList.push(doc.data());
                }
            });

            setRooms(roomsList);
            */
            const q = query(collection(getFirestore(app), "rooms"));
            const snapshot = onSnapshot(q, (querySnapshot) => {
                const roomsList = [];

                querySnapshot.forEach((doc) => {
                    if (doc.data().users.filter(u => u.id === getAuth(app).currentUser.uid).length > 0) {
                        roomsList.push(doc.data());
                    }
                })
                
                setRooms(roomsList);
            })
        }

        fetchChatRooms();
    }, []);    

    const logout = async () => {
        const auth = getAuth(app);
        await signOut(auth);
    }

    return (
        <View style={styles.page}>
            <FlatList 
                data={rooms}
                renderItem={({ item }) => <ChatRoomItem app={app} chatRoom={item}/>}
                showsVerticalScrollIndicator={false}
            />
            <Pressable onPress={() => logout()} style={{backgroundColor: 'red', height: 50, margin: 10, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Logout</Text>
            </Pressable>
        
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    },
})