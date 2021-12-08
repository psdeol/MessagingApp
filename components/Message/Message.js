import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAuth } from "@firebase/auth";

const Message = ({ app, message }) => {
    const [isMe, setIsMe] = useState(true);

    useEffect(() => {
        const checkIfMe = async () => {
            const authUser = getAuth(app).currentUser;
            setIsMe(message.user.id === authUser.uid);
        }
        checkIfMe();
    }, []);

    return (
        <View style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer ]}>
            <Text style={{ color: isMe ? "white" : "black" }}>{message.content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: "75%",
    },
    leftContainer: {
        backgroundColor: "lightgrey",
        marginLeft: 10,
        marginRight: "auto",
    },
    rightContainer: {
        backgroundColor: "#3777F0",
        marginLeft: "auto",
        marginRight: 10,
    },
});

export default Message;
