import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../utils/colors";

const LoadingModal = ({ visible }) => {
    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.modalBackground}>
                <ActivityIndicator size="large" color={colors.backgroundButton} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});

export default LoadingModal;
