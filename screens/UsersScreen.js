import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getDocs, query, collection, doc, onSnapshot, getFirestore } from '@firebase/firestore';
import { getAuth } from "@firebase/auth";
import UserItem from '../components/UserItem';

export default function UsersScreen({ app }) {
    const [users, setUsers] = useState(null);
    const route = useRoute();

    useEffect(() => {
        let mounted = true;

        const getUsers = async () => {
            const currentUser = getAuth(app).currentUser;
            const q = query(collection(getFirestore(app), 'users'));

            // listen for updates to users collection
            const snapshot = onSnapshot(q, (querySnapshot) => {
                const usersList = [];
                querySnapshot.forEach((doc) => {
                    // don't display current user
                    if (currentUser.uid !== doc.data().id)
                        usersList.push(doc.data());
                })
                if (mounted) setUsers(usersList);
            })
        }

        const getUsersNotInRoom = async () => {
            if (!route.params.room) {
                console.log("No room provided");
                return;
            }

            const currentUser = getAuth(app).currentUser;
            const q = query(collection(getFirestore(app), "users"));
            const snapshot = onSnapshot(q, (querySnapshot) => {
                const room = route.params.room;
                const usersList = [];
                querySnapshot.forEach((doc) => {
                    if ((currentUser.uid !== doc.data().id) && !(room.users.filter(u => u.id === doc.data().id).length > 0))
                        usersList.push(doc.data());
                })
                if (mounted) setUsers(usersList);
            })
        }

        if (route?.params?.addToChatRoom) 
            getUsersNotInRoom();
        else
            getUsers();

        return () => {
            mounted = false;
        }

    }, []);

    return (
        <View style={styles.page}>
            <FlatList 
                data={users}
                renderItem={({ item }) => <UserItem user={item} app={app} />}
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