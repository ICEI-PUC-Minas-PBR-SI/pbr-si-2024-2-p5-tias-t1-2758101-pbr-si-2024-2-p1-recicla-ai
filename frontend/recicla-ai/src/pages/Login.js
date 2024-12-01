import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert, } from "react-native";
import { TextInput, Switch, Dropdown } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../components/ErrorMessageFormik";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import colors from "../utils/colors";
import { useAuth } from "../contexts/Auth";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
    password: Yup.string().required("Favor inserir a senha"),
});

const Login = ({ navigation }) => {
    const { signInUser, signInCompany, authData, authType } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    async function handleLogin(values, actions) {
        try {
            var response;
            if (isSwitchOn) {
                response = signInCompany(values);
            } else {
                response = signInUser(values);
            }

            if (!response) {
                Alert.alert("Erro", "Falha ao realizar login!");
            }
        } catch (e) {
            console.trace("erro: " + e);
        }
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, actions) => handleLogin(values, actions)}
            validationSchema={LoginSchema}
            validateOnBlur={false}
            validateOnChange={false}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => (
                <View style={styles.container}>
                    <Image source={require("../assets/logo.png")} style={styles.logo} />

                    <CustomTextInput
                        label="Email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        keyboardType="email-address"
                    />
                    <ErrorMessage error={errors.email} />

                    <TextInput
                        label="Senha"
                        value={values.password}
                        onChangeText={handleChange("password")}
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        right={<TextInput.Icon
                            icon={showPassword ? "eye-off" : "eye"}
                            onPress={() => setShowPassword(!showPassword)}
                        />}
                        mode="outlined"
                    />
                    <ErrorMessage error={errors.password} />

                    <View style={styles.switchContainer}>
                        <Text>Selecione o tipo de login</Text>
                        <View style={styles.switchRightContainer}>
                            <Text style={{ fontWeight: "bold", marginRight: 10, color: colors.backgroundButton }}>{isSwitchOn ? "EMPRESA" : "USUÁRIO"}</Text>
                            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} thumbColor={isSwitchOn ? colors.backgroundButton : colors.activeThumb} />
                        </View>
                    </View>

                    <CustomButton onPress={handleSubmit} title="Entrar" />

                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => { resetForm(); navigation.navigate("UserRegister") }}>
                            <Text style={styles.link}>Registrar Usuário</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { resetForm(); navigation.navigate("CompanyRegister") }}>
                            <Text style={styles.link}>Registrar Empresa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 16 },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 40,
        alignSelf: "center",
    },
    link: {
        marginHorizontal: 10,
        color: colors.text,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    input: {
        marginBottom: 20,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        height: 50,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    switchRightContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1,
    },

});

export default Login;
