import React, { useState, useContext } from 'react'
import { StyleSheet, Image, Text, TextInput, TouchableHighlight, View, ImageBackground } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signInWithEmailAndPassword, getAuth } from '@firebase/auth';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState(''); // used to store email
    const [password, setPassword] = useState(''); // used to store password

    // called when registration link clicked
    const onFooterLinkPress = () => {
        navigation.navigate('Register');
    }

    // called when login button clicked
    const onLoginPress = () => {
        if (!email) {
            Alert.alert('Email field is required.');
        } else if (!password) {
            Alert.alert('Password field is required.');
        } else {
            login(email, password);
            setEmail('');
            setPassword('');
        }
    }

    const login = async (email, password) => {
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ImageBackground 
            style={styles.container}
            source={{ uri: "https://picsum.photos/1000/1000" }} 
            blurRadius={5} >
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    keyboardType='email-address'
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
                <TouchableHighlight
                    activeOpacity={0.95}
                    underlayColor={'#7e96fc'}
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableHighlight>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
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
        paddingLeft: 16
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
