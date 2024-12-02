import React from "react";
import { StyleSheet, View } from "react-native";
import { Title, Paragraph, Modal as PaperModal, Portal } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import CustomButton from "../components/CustomButton";

export default function ItemDetail({ visible, item, onClose, onRedeem, userPoints }) {
    if (!item) return null;

    const getIconName = (category) => {
        switch (category) {
            case "Cupom":
                return "tag";
            case "produto":
                return "package";
            case "serviço":
                return "briefcase";
            default:
                return "help-circle";
        }
    };

    const canRedeem = userPoints >= item.value;

    return (
        <Portal>
            <PaperModal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContent}>
                <Feather name={getIconName(item.category)} size={100} color="#4CAF50" style={styles.modalIcon} />
                <Title>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
                <Paragraph style={styles.modalValue}>Valor: {item.value} pontos</Paragraph>

                <View style={styles.buttonsContainer}>
                    <CustomButton
                        onPress={onClose}
                        title="Fechar"
                        style={{ backgroundColor: "red" }}
                    />
                    <CustomButton
                        onPress={() => onRedeem(item)}
                        title={canRedeem ? "Resgatar" : "Pontos Insuficientes"}
                        style={{ backgroundColor: canRedeem ? "green": "gray" }}
                    />
                </View>
            </PaperModal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        alignItems: "center",
        borderRadius: 10,
    },
    modalIcon: {
        marginTop: 10,
        marginBottom: 20,
    },
    modalValue: {
        fontWeight: "bold",
        color: "#4CAF50",
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    closeButton: {
        marginTop: 10,
    },
    redeemButton: {
        marginTop: 10,
    },
});
