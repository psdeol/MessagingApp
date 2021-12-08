import React from "react";
import { View, Image, Text, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { getDocs, query, collection, doc, setDoc, updateDoc, getFirestore, arrayUnion } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import styles from "./styles";

export default function UserItem({ user, app }) {
  const navigation = useNavigation();

  const onPress = async () => {
    const currentUser = {
      id: getAuth(app).currentUser.uid,
      email: getAuth(app).currentUser.email,
      name: getAuth(app).currentUser.displayName,
      photoURL: getAuth(app).currentUser.photoURL,
    };
    const clickedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      photoURL: user.photoURL,
    };
    const db = getFirestore(app);
    let chatID = null;

    // check a room already exists between these two users
    const querySnapshot = await getDocs(query(collection(db, "rooms")));
    querySnapshot.forEach((doc) => {
      let users = doc.data().users;
      let currentUserFound = (users.filter(u => u.id === currentUser.id).length > 0);
      let clickedUserFound = (users.filter(u => u.id === clickedUser.id).length > 0);

      if (currentUserFound && clickedUserFound) {
        chatID = doc.data().id;
        return;
      }
    });

    // Create a chat room
    if (!chatID) {
      chatID = "R" + Date.now().toString();

      await setDoc(doc(db, "rooms", chatID), {
        id: chatID,
        users: [currentUser, clickedUser],
        messages: [],
        newMessages: 0
      });
      
      // connect authenticated user with the chat room
      await updateDoc(doc(db, 'users', currentUser.id), {
        rooms: arrayUnion(chatID)
      });

      // connect clicked user with the chat room
      await updateDoc(doc(db, 'users', user.id), {
        rooms: arrayUnion(chatID)
      });
    }
    
    navigation.navigate('ChatRoom', { id: chatID });
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
