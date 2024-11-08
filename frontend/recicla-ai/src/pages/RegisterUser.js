import React, { useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Modal } from "react-native";
import { TextInput, Button, Text, Menu, Provider as PaperProvider } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as Yup from "yup";
import { formatPhoneNumber, formatCPF, formatNoDots } from "../utils/format";
import { validateCpf, validatePhoneNumber } from "../utils/validations";
import CustomTextInput from "../components/CustomTextInput";
import { Formik } from "formik";
import ErrorMessage from "../components/ErrorMessageFormik";
import materials from "../utils/materials";
import { makePostRequest } from "../services/apiRequests";
import LoadingModal from "../components/LoadingModal";

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    email: Yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
    cpf: Yup.string().required("O CPF é obrigatório").test("valid-cpf", "CPF inválido. Use o formato 000.000.000-00", validateCpf),
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória"),
    phoneNumber: Yup.string()
        .required("O número de telefone é obrigatório")
        .test("valid-phone", "Número de telefone inválido. Use o formato (00) 00000-0000", validatePhoneNumber),
    birthdate: Yup.date().required("A data de nascimento é obrigatória").max(new Date(), "A data de nascimento não pode ser igual ou posterior à data atual"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "As senhas não coincidem")
        .required("A confirmação da senha é obrigatória"),
    recyclePreference: Yup.string(),
});

const RegisterUser = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleRegisterUser(values) {
        values.cpf = formatNoDots(values.cpf);
        values.phoneNumber = formatNoDots(values.phoneNumber);
        try {
            setLoading(true);
            await makePostRequest("user", values);
            navigation.goBack();
        } catch (e) {
            console.error("Erro ao registrar usuário:", e);
        } finally {
            setLoading(false);
        }
    }

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const selectMaterial = (setFieldValue, material) => {
        setFieldValue("recyclePreference", material);
        closeMenu();
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const onDateChange = (setFieldValue) => (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setFieldValue("birthdate", selectedDate);
        }
    };

    return (
        <PaperProvider style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        cpf: "",
                        phoneNumber: "",
                        password: "",
                        confirmPassword: "",
                        birthdate: new Date(),
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleRegisterUser}
                    validateOnChange={false}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                        <View style={styles.formContainer}>
                            <CustomTextInput
                                label="Nome"
                                value={values.name}
                                onChangeText={handleChange("name")}
                                onBlur={handleBlur("name")}
                            />
                            <ErrorMessage error={errors.name} />

                            <CustomTextInput
                                label="Email"
                                value={values.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                keyboardType="email-address"
                            />
                            <ErrorMessage error={errors.email} />

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

                            <CustomTextInput
                                label="Telefone"
                                value={formatPhoneNumber(values.phoneNumber)}
                                onChangeText={text => {
                                    const cleanedText = text.replace(/\D/g, "");
                                    if (cleanedText.length <= 11) {
                                        handleChange("phoneNumber")(cleanedText);
                                    }
                                }}
                                onBlur={handleBlur("phoneNumber")}
                                keyboardType="phone-pad"
                            />
                            <ErrorMessage error={errors.phoneNumber} />

                            <Text>Data de Nascimento</Text>
                            <Button onPress={showDatepicker} style={styles.dateButton} mode="outlined" textColor="#000000">
                                {values.birthdate ? format(values.birthdate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a Data"}
                            </Button>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={values.birthdate}
                                    mode="date"
                                    is24Hour={true}
                                    onChange={onDateChange(setFieldValue)}
                                />
                            )}
                            <ErrorMessage error={errors.birthdate} />

                            <Text style={{ marginTop: 10 }}>Preferência de Reciclagem</Text>
                            <Menu
                                mode="outlined"
                                visible={visible}
                                onDismiss={closeMenu}
                                style={styles.menuStyle}
                                anchor={<Button onPress={openMenu} style={styles.menuButton} mode="outlined" labelStyle={{ color: "#000000" }}>{values.recyclePreference || "Selecione um material"}</Button>}
                            >
                                <ScrollView style={styles.menuScroll}>
                                    {materials.map((material, index) => (
                                        <Menu.Item key={index} onPress={() => selectMaterial(setFieldValue, material)} title={material} />
                                    ))}
                                </ScrollView>
                            </Menu>
                            <ErrorMessage error={errors.recyclePreference} />

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

                            <TextInput
                                label="Confirmar Senha"
                                value={values.confirmPassword}
                                onChangeText={handleChange("confirmPassword")}
                                secureTextEntry={!showConfirmPassword}
                                style={styles.input}
                                right={<TextInput.Icon
                                    icon={showConfirmPassword ? "eye-off" : "eye"}
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                />}
                                mode="outlined"
                            />
                            <ErrorMessage error={errors.confirmPassword} />

                            <CustomButton onPress={handleSubmit} title="Registrar" />
                        </View>
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
    },
    formContainer: {
        flexGrow: 1,
    },
    input: {
        marginBottom: 5,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        height: 50,
    },
    dateButton: {
        marginTop: 8,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        height: 50,
        justifyContent: "center",
    },
    menuButton: {
        marginTop: 8,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        height: 50,
        justifyContent: "center",
    },
    menuStyle: {
        width: 300,
    },
    menuScroll: {
        maxHeight: 200,
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});

export default RegisterUser;
