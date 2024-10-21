import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import colors from "../utils/colors";

const CustomButton = ({ onPress, title }) => {
    return (
        <Button mode="contained" onPress={onPress} style={styles.button}>
            {title}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        height: 40,
        backgroundColor: colors.backgroundButton

    },
});

export default CustomButton;
