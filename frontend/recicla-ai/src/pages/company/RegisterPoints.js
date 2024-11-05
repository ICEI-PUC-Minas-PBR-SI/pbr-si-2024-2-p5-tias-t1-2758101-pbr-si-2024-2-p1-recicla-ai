import React, { useState } from "react";
import { StyleSheet, Alert, ScrollView } from "react-native";
import { Title, Paragraph, PaperProvider } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import CustomTextInput from "../../components/CustomTextInput";
import ErrorMessage from "../../components/ErrorMessageFormik";
import {formatCPF, formatNoDots} from "../../utils/format";
import CustomButton from "../../components/CustomButton";
import api from "../../services/api";

const validateDocument = (document) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(document);
};

const RegisterPoints = ({ navigation }) => {

    const handleRegisterCompany = (values, actions) => {
        const addPoints = Number(values.points);
        const formattedCpf = values.cpf;
    
        // Fazer req;

            try {
                console.log(values)
                const response = api.post(`/points`, values)
                    .then(response => {
                        console.log(response);
                        console.log(response.data);
                        Alert.alert("Pontos adicionados com sucesso!");
                        navigation.goBack()
                    })
                    .catch(error => {
                        Alert.alert("Erro ao criar conta!");
                        if (error.response) {
                            console.error("Erro na resposta:", error.response.data);
                        }
                    });
            } catch (e) {
                console.log(e);
            }


        actions.resetForm();
        Alert.alert("Sucesso", `${addPoints} pontos adicionados para o usuário com CPF: ${formattedCpf}`);
    };

    const validationSchema = Yup.object().shape({
        cpf: Yup.string()
            .required("Campo obrigatório")
            .test("valid-cpf", "CPF inválido. Use o formato 000.000.000-00", validateDocument),
        points: Yup.number()
            .typeError("Por favor, insira um número válido")
            .positive("Os pontos devem ser positivos")
            .required("Campo obrigatório"),
    });

    return (
        <PaperProvider style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Title style={styles.title}>Adicionar Pontos</Title>
                <Formik
                    initialValues={{ cpf: "", points: "" }}
                    onSubmit={handleRegisterCompany}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, }) => (
                        <>
                            <Paragraph style={styles.label}>Digite o CPF do usuário:</Paragraph>
                            <CustomTextInput
                                label="CPF"
                                value={formatCPF(values.cpf)}
                                onChangeText={text => {
                                    if (text.length <= 14) {
                                        handleChange("cpf")(text);
                                    }
                                }}
                                onBlur={handleBlur("cpf")}
                                keyboardType="phone-pad"
                            />
                            <ErrorMessage error={errors.cpf} />

                            <Paragraph style={styles.label}>Digite a quantidade de pontos:</Paragraph>

                            <CustomTextInput
                                label="Pontos"
                                value={values.points}
                                onChangeText={(text) => {
                                    const numericValue = text.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
                                    handleChange("points")(numericValue);
                                }}
                                onBlur={handleBlur("points")}
                                keyboardType="phone-pad"
                            />
                            <ErrorMessage error={errors.points} />

                            <CustomButton onPress={handleSubmit} title="Registrar" />
                        </>
                    )}
                </Formik>
            </ScrollView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 16,
        alignContent: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        width: "80%",
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        width: "80%",
        paddingVertical: 5,
    },
    total: {
        fontSize: 18,
        marginTop: 20,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
    },
});

export default RegisterPoints;
