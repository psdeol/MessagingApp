import React from "react"; 
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/core";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";

import chatRoomData from '../assets/dummy-data/Chats';

export default function ChatRoomScreen() {
    const route = useRoute();
    const navigation = useNavigation();

    navigation.setOptions({ title: 'Elon Musk' });

    return (
        <SafeAreaView style={styles.page}>
            <FlatList
                data={chatRoomData.messages}
                renderItem={({ item }) => <Message message={item} />} 
                inverted
            />
            <MessageInput />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    }
});