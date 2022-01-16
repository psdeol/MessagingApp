import React, { useState } from 'react';
import { StyleSheet, Image, Text, TextInput, TouchableHighlight, View, ImageBackground, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export default function RegistrationScreen({ navigation, app }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Login');
    }

    const onRegisterPress = async () => {
        if (!name) {
            Alert.alert('Name is required.');
        } else if (!email) {
            Alert.alert('Email is required.');
        } else if (!password) {
            Alert.alert('Password is required.');
        } else if (password !== confirmPassword) {
            Alert.alert("Passwords don't match");
        } else {
            register(email, password, name);
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }

    const register = async (email, password, name) => {
        try { 
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(auth, email, password);
            const currentUser = auth.currentUser;
            let num = Math.floor(Math.random() * (250 - 1 + 1)) + 1;
            await updateProfile(currentUser, {
                displayName: name,
                photoURL: `https://picsum.photos/id/${num}/300/300`,
            })
            
            const db = getFirestore(app);
            await setDoc(doc(db, 'users', currentUser.uid), {
                id: currentUser.uid,
                email: currentUser.email,
                name: currentUser.displayName,
                photoURL: currentUser.photoURL,
                status: `Hello, I'm ${currentUser.displayName}!`,
                rooms: [],
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ImageBackground 
            style={styles.container}
            source={{ uri: "https://picsum.photos/1000/1000" }} 
            blurRadius={5}  >
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setName(text)}
                    value={name}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableHighlight
                    activeOpacity={0.95}
                    underlayColor={'#7e96fc'}
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableHighlight>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 120,
        alignSelf: "center",
        margin: 40
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        borderColor: "black"
    },
    button: {
        backgroundColor: '#3777F0',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#ffffff'
    },
    footerLink: {
        color: "#3777F0",
        fontWeight: "bold",
        fontSize: 16
    }
})