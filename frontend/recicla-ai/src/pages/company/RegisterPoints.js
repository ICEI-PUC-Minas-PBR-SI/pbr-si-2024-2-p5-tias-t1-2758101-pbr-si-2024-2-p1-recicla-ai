import React, { useState } from "react";
import { StyleSheet, Alert, ScrollView, Modal, ActivityIndicator } from "react-native";
import { Title, Paragraph, PaperProvider } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { makePostRequest } from "../../services/apiRequests";
import { validateCpf } from "../../utils/validations";
import CustomTextInput from "../../components/CustomTextInput";
import ErrorMessage from "../../components/ErrorMessageFormik";
import { formatCPF, formatNoDots } from "../../utils/format";
import CustomButton from "../../components/CustomButton";
import LoadingModal from "../../components/LoadingModal";


const RegisterPoints = ({ navigation }) => {

    const [loading, setLoading] = useState(false);

    async function handleRegisterPoints(values, actions) {
        values.cpf = formatNoDots(values.cpf);
        try {
            setLoading(true);
            await makePostRequest("points", values);
            actions.resetForm();
            Alert.alert("Sucesso", `${values.quantity} pontos adicionados para o usuário com CPF: ${values.cpf}`);
        } catch (e) {
            console.error("Erro ao registrar Pontos do usuário:", e);
        } finally {
            setLoading(false);
        }
    }

    const validationSchema = Yup.object().shape({
        cpf: Yup.string()
            .required("Campo obrigatório")
            .test("valid-cpf", "CPF inválido. Use o formato 000.000.000-00", validateCpf),
        quantity: Yup.number()
            .typeError("Por favor, insira um número válido")
            .positive("Os pontos devem ser positivos")
            .required("Campo obrigatório"),
    });

    return (
        <PaperProvider style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Title style={styles.title}>Adicionar Pontos</Title>
                <Formik
                    initialValues={{ cpf: "", quantity: "", company_id: 1 }}
                    onSubmit={handleRegisterPoints}
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
                                value={values.quantity}
                                onChangeText={(text) => {
                                    const numericValue = text.replace(/[^0-9]/g, "");
                                    handleChange("quantity")(numericValue);
                                }}
                                onBlur={handleBlur("quantity")}
                                keyboardType="phone-pad"
                            />
                            <ErrorMessage error={errors.points} />

                            <CustomButton onPress={handleSubmit} title="Registrar" />
                        </>
                    )}
                </Formik>
                <LoadingModal visible={loading} />
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
