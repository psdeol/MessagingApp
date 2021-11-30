import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { doc, setDoc, getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

import styles from "./styles";

export default function UserItem({ user, app }) {
  const navigation = useNavigation();

  const onPress = async () => {
    const db = getFirestore(app);
    const currentUser = getAuth(app).currentUser;

    // TODO if there is already a chat room between these 2 users
    // then redirect to the existing chat room
    // otherwise, create a new chatroom 


    // Create a chat room
    const chatID = Date.now();

    await setDoc(doc(db, "rooms", chatID.toString()), {
      id: chatID,
      users: [
        {
          id: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        user,
      ],
      messages: [],
      newMessages: 0
    });
    
    // connect authenticated user with the chat room


    // connect clicked user with the chat room


    //navigation.navigate('ChatRoom', { id: newChatRoom.id });
  }

  return (
    <Pressable onPress={() => onPress()} style={styles.container}>
      <Image source={{ uri: user.photoURL }} style={styles.image} />

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}
