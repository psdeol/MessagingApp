import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        padding: 10,
    },
    inputContainer: {
        backgroundColor: "#F2F2F2",
        flexDirection: "row",
        flex: 1,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#DEDEDE",
        alignItems: "center",
        padding: 5,
    },
    icon: {
        marginHorizontal: 5,
    },
    input: {
        flex: 1,
        marginHorizontal: 5,
    },
    buttonContainer: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: "#3777F0",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 35,
    },
});

export default styles;