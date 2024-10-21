import React, {useState} from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert,} from "react-native";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../components/ErrorMessageFormik";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import colors from "../utils/colors";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
    password: Yup.string().required("Favor inserir a senha"),
});

const Login = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);


    async function handleLogin(values) {
        try {
            const response = values;

            // await api.post(`/login`,values);
            if (response) {
                Alert.alert("Logou!");
            }
            else {
                Alert.alert("Erro ao entrar no aplicativo!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={values => handleLogin(values)}
            validationSchema={LoginSchema}
            validateOnBlur={false}
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

                    <CustomButton onPress={handleSubmit} title="Entrar" />

                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => { resetForm(); navigation.navigate("UserRegister")}}>
                            <Text style={styles.link}>Registrar Usuário</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { resetForm();navigation.navigate("CompanyRegister")}}>
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
    errorText: {
        color: colors.red,
        marginBottom: 10,
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

});

export default Login;
