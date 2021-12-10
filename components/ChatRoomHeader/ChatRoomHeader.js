import React, { useEffect, useState } from "react";
import { View, Image, Text, useWindowDimensions, Pressable } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { getDoc, doc, getFirestore } from '@firebase/firestore';
import { getAuth } from "@firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

const ChatRoomHeader = ({ app, id }) => {
    const { width } = useWindowDimensions();
    const [user, setUser] = useState(null);
    const [room, setRoom] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()

    useEffect(() => {
        if (!id) return;

        let mounted = true;

        const fetchUsers = async () => {
            const db = getFirestore(app);
            const authUser = getAuth(app).currentUser;
            const roomDoc = await getDoc(doc(db, 'rooms', id));

            if (roomDoc.exists()) {
                if (mounted) setRoom(roomDoc.data());
                roomDoc.data().users.forEach((u) => {
                    if (u.id !== authUser.uid) {
                        if (mounted) setUser(u);
                        return;
                    }
                })
            } else {
                console.log("room document not found");
            }
        };

        fetchUsers();

        return () => {
            mounted = false;
        }

    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onTitlePress = () => {
        navigation.navigate('UserProfile', { user: user })
    };

    const onAddUserPress = () => {
        toggleModal();
        navigation.navigate('Users', { room: room, addToChatRoom: true });
    }

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: width - 30,
                padding: 10,
                alignItems: "center",
                marginRight: 100,
            }}
        >
            <Pressable onPress={() => onTitlePress()} style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <Image source={{ uri: user?.photoURL }} style={{ width: 30, height: 30, borderRadius: 30 }} />
                <Text style={{ flex: 1, marginLeft: 10, fontWeight: "bold", fontSize: 16}}> {user?.name} </Text>
            </Pressable>
            <Ionicons name="videocam" size={28} color="black" style={{ marginHorizontal: 10 }} />
            <Ionicons name="call" size={24} color="black" style={{ marginHorizontal: 10 }} />
            <Pressable onPress={() => toggleModal()}>
                <Ionicons name="ellipsis-vertical" size={24} color="black" style={{ marginHorizontal: 10 }} />
            </Pressable>
            <Modal 
                isVisible={isModalVisible} 
                onBackdropPress={() => setModalVisible(false)} 
                backdropOpacity={0.4}
                animationIn={'slideInUp'}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Pressable onPress={() => onAddUserPress()} style={{ justifyContent: 'center', alignItems:'center', width: '100%', height: 50, backgroundColor: 'white', marginBottom: 2 }} > 
                        <Text style={{ fontSize: 20 }}>Add User</Text>
                    </Pressable>
                    <Pressable style={{ justifyContent: 'center', alignItems:'center', width: '100%', height: 50, backgroundColor: 'white', }} > 
                        <Text style={{ fontSize: 20 }}>Leave Chat</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
};

/*
    TODO: USE react-native-modal for ellipsis drop down
*/

export default ChatRoomHeader;