import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const PointsDetailUser = ({ name, address, phone, allowedMaterials }) => {
    return (
        <View style={styles.pointContainer}>
            <Text style={styles.pointName}>{name}</Text>
            <Text style={styles.detail}>Endereço: {address}</Text>
            <Text style={styles.detail}>Telefone: {phone}</Text>
            <Text style={styles.detail}>
                Materiais Permitidos: {allowedMaterials.join(", ")}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    pointContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    pointName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    detail: {
        fontSize: 14,
        color: "#666",
    },
});

export default PointsDetailUser;
