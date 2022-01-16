import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getAuth } from "@firebase/auth";

const Message = ({ app, message, isGroupChat }) => {
    const [isMe, setIsMe] = useState(true);

    useEffect(() => {
        const checkIfMe = async () => {
            const authUser = getAuth(app).currentUser;
            setIsMe(message.user.id === authUser.uid);
        }
        checkIfMe();
    }, []);

    
    if (!isGroupChat) {
        return (
            <View style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer ]}>
                <Text style={{ color: isMe ? "white" : "black" }}>{message.content}</Text>
            </View>
        );
    } else {
        return (
            <View>
            { isMe ?
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end',  }}>
                    <View style={[styles.container, styles.groupRightContainer]}>
                        <Text style={{ color: isMe ? "white" : "black" }}>{message.content}</Text>
                    </View>
                </View>
                :
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', }}>
                    <Image source={{ uri: message.user.photoURL }} style={styles.leftImage} />
                    <View style={[styles.container, styles.groupLeftContainer]}>
                        <Text style={{ color: isMe ? "white" : "black" }}>{message.content}</Text>
                    </View>
                </View>
            }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: "69%",
    },
    leftContainer: {
        backgroundColor: "#dedede",
        marginLeft: 10,
        marginRight: "auto",
    },
    rightContainer: {
        backgroundColor: "#3777F0",
        marginLeft: "auto",
        marginRight: 10,
    },
    groupLeftContainer: {
        backgroundColor: "#dedede",
        marginLeft: 5,
        marginRight: "auto",
    },
    groupRightContainer: {
        backgroundColor: "#3777F0",
        marginLeft: "auto",
        marginRight: 10,
    },
    leftImage: {
        width: 25, 
        height: 25,
        borderRadius: 12.5,
        marginBottom: 10,
        marginLeft: 5,
    },
    rightImage: {
        width: 20, 
        height: 20,
        borderRadius: 10,
        marginBottom: 10,
        marginRight: 5,
    },
});

export default Message;
