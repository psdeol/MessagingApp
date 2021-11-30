import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    badgeContainer: {
        backgroundColor: '#3777F0',
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 45,
        top: 10,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 3,
    },
    time: {
        color: 'grey',
    },
    text: {
        color: 'grey',
    }
});

export default styles;