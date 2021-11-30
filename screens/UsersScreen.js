import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { getDocs, query, collection, doc, onSnapshot, getFirestore } from '@firebase/firestore';

import UserItem from '../components/UserItem';

export default function UsersScreen({ app }) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(query(collection(db, "users")));
      const usersList = [];
      querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        usersList.push(doc.data());
      });
      setUsers(usersList);
    }
    getUsers();
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