import React, {useState, useEffect} from 'react';
import { Pressable, Text, View, Image, useWindowDimensions, } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { getDoc, doc, getFirestore } from "@firebase/firestore";
import { getAuth } from '@firebase/auth';

const HomeHeader = ({ app }) => {
    const [user, setUser] = useState(null);
    const { width } = useWindowDimensions();
    const navigation = useNavigation();

    useEffect(() => {
        let mounted = true;

        const fetchUser = async () => {
            const db = getFirestore(app);
            const authUser = getAuth(app).currentUser;
            const userDoc = await getDoc(doc(db, "users", authUser.uid));

            if (userDoc.exists()) {
                if (mounted)
                    setUser(userDoc?.data());

            } else {
                console.log('User doc not found');
            }
        };

        fetchUser();

        return () => {
            mounted = false;
        };

    }, [])

    return (
        <View 
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width,
                padding: 10,
                alignItems: "center",
                marginRight: 40,
            }}
        >
            <Pressable onPress={() => navigation.navigate('Settings')}>
                <Image source={{ uri: user?.photoURL }} style={{ width: 30, height: 30, borderRadius: 30 }} />
            </Pressable>
            <Text style={{ flex: 1, textAlign: "center", marginLeft: 45, fontWeight: "bold", fontSize: 16, }} > Messaging App </Text>
            <Feather name="camera" size={24} color="black" style={{ marginHorizontal: 10 }} />
            <Pressable onPress={() => navigation.navigate('Users')} >
                <Feather name="edit-2" size={24} color="black" style={{ marginHorizontal: 10 }} />
            </Pressable>
        </View>
    );
};

export default HomeHeader;