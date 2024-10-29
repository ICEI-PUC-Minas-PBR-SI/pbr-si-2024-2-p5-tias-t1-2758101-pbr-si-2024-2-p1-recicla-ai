import {Text, View, StyleSheet} from "react-native";


export default function Profile() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 22,
        fontWeight: "bold"
    }
})