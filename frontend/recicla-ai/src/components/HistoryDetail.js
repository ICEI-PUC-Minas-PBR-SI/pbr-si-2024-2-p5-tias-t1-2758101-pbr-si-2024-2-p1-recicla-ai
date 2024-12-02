import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const HistoryDetail = ({ id, cpf, date }) => {
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={styles.pointContainer}>
            <Text style={styles.success}>Resgate confirmado</Text>
            <Text style={styles.detail}>CPF: {cpf}</Text>
            <Text style={styles.detail}>Data: {formatDate(date)}</Text>
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
    detail: {
        fontSize: 14,
        color: "#666",
    },
    success: {
        fontSize: 14,
        color: "green",
    },
});

export default HistoryDetail;
