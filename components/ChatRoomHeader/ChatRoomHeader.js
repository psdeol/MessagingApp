import React, { useEffect, useState } from "react";
import { View, Image, Text, useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getDoc, doc, getFirestore } from '@firebase/firestore';
import { getAuth } from "@firebase/auth";

const ChatRoomHeader = ({ app, id }) => {
    const { width } = useWindowDimensions();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!id) return;

        let mounted = true;

        const fetchUsers = async () => {
            const db = getFirestore(app);
            const authUser = getAuth(app).currentUser;
            const room = await getDoc(doc(db, 'rooms', id));

            if (room.exists()) {
                room.data().users.forEach((u) => {
                    if (u.id !== authUser.uid) {
                        if (mounted) setUser(u);
                        return;
                    }
                })
            } else {
                console.log("room document not found");
            }
        }

        fetchUsers();

        return () => {
            mounted = false;
        }

    }, []);

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
            source={{ uri: user?.photoURL }}
            style={{ width: 30, height: 30, borderRadius: 30 }}
        />
        <Text style={{ flex: 1, marginLeft: 10, fontWeight: "bold"}}> {user?.name} </Text>
        <Feather name="camera" size={24} color="black" style={{ marginHorizontal: 10 }} />
        <Feather name="edit-2" size={24} color="black" style={{ marginHorizontal: 10 }} />
        </View>
    );
};

export default ChatRoomHeader;