import {Text, View, StyleSheet} from "react-native";


export default function Points() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pontos</Text>
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