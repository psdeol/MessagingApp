import { Image, ImageBackground, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import React from 'react';

export default function WelcomeScreen({ navigation }) {
    return (
      <ImageBackground
        style={styles.background}
        source={{ uri: "https://picsum.photos/1000/1000" }}
      >
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.logoText}>MESSAGING APP</Text>
        </View>
        <TouchableHighlight
          activeOpacity={0.95}
          underlayColor={"#7e96fc"}
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.95}
          underlayColor={"#ffffff"}
          style={styles.registerButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerButtonText}>Create Account</Text>
        </TouchableHighlight>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: '100%',
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    loginButton: {
        width: "80%",
        backgroundColor: '#3777F0',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    registerButton: {
        width: "80%",
        backgroundColor: '#f0f0f0',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 80,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: 'absolute',
        top: 90,
        alignItems: 'center',
    },
    logoText: {
        fontWeight: 'bold',
        color: '#ffffff'
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    registerButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3777F0',
    }
})
