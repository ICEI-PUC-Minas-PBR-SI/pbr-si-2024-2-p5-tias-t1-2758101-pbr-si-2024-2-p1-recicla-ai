import React from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";

const CustomTextInput = ({ label, value, onChangeText, style,keyboardType, disabled=false }) => {
    return (
        <TextInput
            label={label}
            value={value}
            onChangeText={onChangeText}
            style={[styles.input, style]}
            mode="outlined"
            outlineColor="#ccc"
            activeOutlineColor="#007BFF"
            keyboardType={keyboardType}
            disabled={disabled}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        height: 50,
    },
});

export default CustomTextInput;