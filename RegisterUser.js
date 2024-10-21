import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { TextInput, Button, Text, Menu, Provider as PaperProvider } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as Yup from "yup";
import { formatPhoneNumber } from "../utils/format";
import CustomTextInput from "../components/CustomTextInput";
import { Formik } from "formik";
import ErrorMessage from "../components/ErrorMessageFormik";

const materials = [
    "Papel",
    "Plástico",
    "Vidro",
    "Metal",
    "Óleo",
    "Eletrônicos",
    "Tecido",
    "Resíduos Orgânicos",
];

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    email: Yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória"),
    phone: Yup.string().required("O número de telefone é obrigatório"),
    birthdate: Yup.date().required("A data de nascimento é obrigatória").max(new Date(), "A data de nascimento não pode ser igual ou posterior à data atual"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "As senhas não coincidem")
        .required("A confirmação da senha é obrigatória"),
    recyclingPreference: Yup.string(),
});

const RegisterUser = ({ navigation }) => {

    const [visible, setVisible] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function handleRegister(values) {

        try {
            const response = values;
            // await api.post(`/registeruser`,values);
            if (response) {
                Alert.alert("Conta criada com sucesso!");
                navigation.goBack()
            }
            else {
                Alert.alert("Erro ao criar conta!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const selectMaterial = (setFieldValue, material) => {
        setFieldValue("recyclingPreference", material);
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
                        phone: "",
                        password: "",
                        confirmPassword: "",
                        birthdate: new Date(),
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleRegister}
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
                                label="Telefone"
                                value={formatPhoneNumber(values.phone)}
                                onChangeText={text => {
                                    if (text.length <= 15) {
                                        handleChange("phone")(text);
                                    }
                                }}
                                onBlur={handleBlur("phone")}
                                keyboardType="phone-pad"
                            />
                            <ErrorMessage error={errors.phone} />

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
                                anchor={<Button onPress={openMenu} style={styles.menuButton} mode="outlined" labelStyle={{ color: "#000000" }}>{values.recyclingPreference || "Selecione um material"}</Button>}
                            >
                                <ScrollView style={styles.menuScroll}>
                                    {materials.map((material, index) => (
                                        <Menu.Item key={index} onPress={() => selectMaterial(setFieldValue, material)} title={material} />
                                    ))}
                                </ScrollView>
                            </Menu>

                            <ErrorMessage error={errors.recyclingPreference} />

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
        marginBottom: 20,
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
        color: "#000000",
        borderRadius: 8,
        marginTop: 8,
        marginBottom: 15
    },
    menuScroll: {
        backgroundColor: "#f0f0f0",
        maxHeight: 200,
    },
    menuStyle: {
        backgroundColor: "#f0f0f0",
        color: "#000000",
        borderRadius: 8,
        marginBottom: 10,
    },
    error: {
        color: "red",
        marginBottom: 10,
    },

});

export default RegisterUser;
