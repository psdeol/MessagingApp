import * as React from 'react';
import { View, Image, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import { signOut, getAuth } from '@firebase/auth';

import chatRooomsData from '../assets/dummy-data/ChatRooms'

export default function HomeScreen({ app }) {

  const logout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
  }

  return (
    <View style={styles.page}>
      <FlatList 
        data={chatRooomsData}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item}/>}
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