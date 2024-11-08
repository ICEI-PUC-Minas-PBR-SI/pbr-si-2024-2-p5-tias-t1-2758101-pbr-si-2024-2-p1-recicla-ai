import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView, ActivityIndicator, Modal } from "react-native";
import { Button, Text, Menu, Provider as PaperProvider } from "react-native-paper";
import CustomButton from "../../components/CustomButton";
import * as Yup from "yup";
import { formatPhoneNumber, formatNoDots } from "../../utils/format";
import { validatePhoneNumber } from "../../utils/validations";
import CustomTextInput from "../../components/CustomTextInput";
import { Formik } from "formik";
import ErrorMessage from "../../components/ErrorMessageFormik";
import materials from "../../utils/materials";
import { makePostRequest, makeGetRequest } from "../../services/apiRequests";
import LoadingModal from "../../components/LoadingModal";

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    phoneNumber: Yup.string().required("O número de telefone é obrigatório").test("valid-phone", "Número de telefone inválido. Use o formato (00) 00000-0000", validatePhoneNumber),
    postal_code: Yup.string().required("O CEP é obrigatório"),
    addressNumber: Yup.string().required("O número é obrigatório"),
    recyclingPreferences: Yup.array().required("Selecione um ou mais materiais recicláveis que sua empresa aceitará."),
});

const RegisterRecyclePoints = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleRegisterRecyclePoints(values) {
        values.phoneNumber = formatNoDots(values.phoneNumber);

        try {
            setLoading(true);
            console.log(values);
            await makePostRequest("recycle", values);
            navigation.goBack();
        } catch (e) {
            console.error("Erro ao registrar novo ponto da Empresa:", e);
        } finally {
            setLoading(false);
        }
    }


    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const selectMaterial = (material, setFieldValue, values) => {
        const currentPreferences = values.recyclingPreferences || [];
        setFieldValue("recyclingPreferences", currentPreferences.includes(material)
            ? currentPreferences.filter((m) => m !== material)
            : [...currentPreferences, material]
        );
    };

    const fetchAddress = async (cep) => {
        try {
            const response = await makeGetRequest(`https://viacep.com.br/ws/${cep}/json/`);

            if (!response.erro) {
                const addrs = `${response.logradouro}, ${response.localidade}, ${response.uf}`;
                setAddress(addrs);
            } else {
                setAddress("");
                Alert.alert("Erro", "CEP não encontrado.");
            }
        } catch (error) {
            setAddress("");
            Alert.alert("Erro", "Falha ao buscar o CEP.");
        }
    };

    return (
        <PaperProvider style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Formik
                    initialValues={{
                        company_id: 1,
                        name: "",
                        phoneNumber: "",
                        postal_code: "",
                        addressNumber: "",
                        // recyclingPreferences: []
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleRegisterRecyclePoints}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                        <View style={styles.formContainer}>

                            <CustomTextInput
                                label="Nome do Ponto de Coleta"
                                value={values.name}
                                onChangeText={handleChange("name")}
                                onBlur={handleBlur("name")}
                            />
                            <ErrorMessage error={errors.name} />

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

                            <CustomTextInput
                                label="CEP"
                                value={values.postal_code}
                                onBlur={handleBlur("postal_code")}
                                keyboardType={"phone-pad"}
                                onChangeText={text => {
                                    handleChange("postal_code")(text);
                                    if (text.length === 8) {
                                        fetchAddress(text);
                                    }
                                }
                                }
                            />
                            <ErrorMessage error={errors.postal_code} />

                            <CustomTextInput
                                label="Endereço"
                                value={address}
                                disabled
                            />

                            <CustomTextInput
                                label="Número"
                                value={values.addressNumber}
                                onChangeText={handleChange("addressNumber")}
                                onBlur={handleBlur("addressNumber")}
                                keyboardType={"phone-pad"}
                            />
                            <ErrorMessage error={errors.addressNumber} />

                            <Text>Materiais recicláveis permitidos</Text>
                            <Menu
                                mode="outlined"
                                visible={visible}
                                onDismiss={closeMenu}
                                style={styles.menuStyle}
                                anchor={
                                    <Button onPress={openMenu} style={styles.menuButton} mode="outlined" labelStyle={{ color: "#000000" }}>
                                        {Array.isArray(values.recyclingPreferences) && values.recyclingPreferences.length > 0
                                            ? values.recyclingPreferences.join(", ")
                                            : "Selecione um ou mais materiais"}
                                    </Button>
                                }
                            >
                                <ScrollView style={styles.menuScroll}>
                                    {materials.map((material, index) => (
                                        <Menu.Item
                                            key={index}
                                            onPress={() => selectMaterial(material, setFieldValue, values)}
                                            title={material}
                                            style={{ backgroundColor: (values.recyclingPreferences || []).includes(material) ? "#d6d0d0" : "transparent" }}
                                        />
                                    ))}
                                </ScrollView>
                            </Menu>

                            <ErrorMessage error={errors.recyclingPreferences} />


                            <CustomButton onPress={handleSubmit} title="Registrar novo Ponto" />
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

export default RegisterRecyclePoints;
