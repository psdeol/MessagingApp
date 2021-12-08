import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { SimpleLineIcons, Feather, MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { getDocs, query, collection, doc, setDoc, updateDoc, getFirestore, arrayUnion } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import styles from './styles';

const MessageInput = ({ app, chatRoom }) => {
    const [message, setMessage] = useState(null);

    const sendMessage = async () => {
        console.log("sending: ", message);

        const msg = {
            id: 'M' + Date.now().toString(),
            chatRoomID: chatRoom.id,
            content: message,
            createdAt: new Date().toLocaleString(),
            user: { 
                id: getAuth().currentUser.uid,
                name: getAuth().currentUser.displayName,
            }
        }

        await updateDoc(doc(getFirestore(app), 'rooms', chatRoom.id), {
            messages: arrayUnion(msg),
            lastMessage: msg,
        })

        resetFields();
    };

    const onPlusClicked = async () => {
        console.warn("on plus clicked");
    };

    const onPress = () => {
        if (message) {
            sendMessage();
        } else {
            onPlusClicked();
        }
    };

    const resetFields = () => {
        setMessage("");
    }

    return (
        <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
            <View style={styles.inputContainer}>
                <SimpleLineIcons name="emotsmile" size={24} color="#595959" style={styles.icon} />
                <TextInput style={styles.input} value={message} onChangeText={(newMessage) => setMessage(newMessage)} placeholder="Send message" />
                <Feather name="camera" size={24} color="#595959" style={styles.icon} />
                <MaterialCommunityIcons name="microphone-outline" size={24} color="#595959" style={styles.icon} />
            </View>
            <Pressable onPress={onPress} style={styles.buttonContainer}>
                {message ? (
                    <Ionicons name="send" size={18} color="white" />
                ) : (
                    <AntDesign name="plus" size={24} color="white" />
                )}
            </Pressable>
        </KeyboardAvoidingView>
    );
};

export default MessageInput;
