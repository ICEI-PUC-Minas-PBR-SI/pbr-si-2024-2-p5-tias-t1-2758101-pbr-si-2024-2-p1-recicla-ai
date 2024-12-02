import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import colors from "../utils/colors";

const CustomButton = ({ onPress, title, style }) => {

    const buttonStyle = style ? [styles.button, style] : [styles.button, { backgroundColor: colors.backgroundButton }];

    return (
        <Button 
            onPress={onPress} 
            style={buttonStyle} 
            labelStyle={styles.buttonLabel}
        >
            {title}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonLabel: {
        color: "#fff",
    }
});

export default CustomButton;
