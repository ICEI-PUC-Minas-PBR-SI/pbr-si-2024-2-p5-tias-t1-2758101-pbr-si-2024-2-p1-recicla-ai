import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView, ActivityIndicator, Modal } from "react-native";
import { Button, Text, Menu, Provider as PaperProvider, Title } from "react-native-paper";
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
import { useFocusEffect } from "@react-navigation/native"; 
import { useAuth } from "../../contexts/Auth";

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    phoneNumber: Yup.string().required("O número de telefone é obrigatório").test("valid-phone", "Número de telefone inválido. Use o formato (00) 00000-0000", validatePhoneNumber),
    postalCode: Yup.string().required("O CEP é obrigatório"),
    addressNumber: Yup.string().required("O número é obrigatório"),
    recyclePreference: Yup.string().required("Selecione o material reciclável que o ponto aceitará"),
});

const RegisterRecyclePoints = ({ navigation }) => {
    const {authData} = useAuth();
    const company_id = authData.id;
    const [visible, setVisible] = useState(false);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleRegisterRecyclePoints(values) {
        values.phoneNumber = formatNoDots(values.phoneNumber);

        try {
            setLoading(true);
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

    const selectMaterial = (setFieldValue, material) => {
        setFieldValue("recyclePreference", material);
        closeMenu();
    };

    const fetchAddress = async (cep, setFieldValue) => {
        try {
            const response = await makeGetRequest(`https://viacep.com.br/ws/${cep}/json/`);
    
            if (!response.erro) {
                const { logradouro, localidade, bairro, uf } = response;
                setAddress(`${logradouro}, ${localidade}, ${uf}`);
    
                setFieldValue("street", logradouro);
                setFieldValue("city", localidade);
                setFieldValue("district", bairro);
                setFieldValue("state", uf);
            } else {
                setAddress("");
                Alert.alert("Erro", "CEP não encontrado.");
            }
        } catch (error) {
            setAddress("");
            Alert.alert("Erro", "Falha ao buscar o CEP.");
        }
    };
    

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                if (formikRef.current) {
                    setAddress("");
                    formikRef.current.resetForm();
                }
            };
        }, [])
    );

    const formikRef = React.useRef();

    return (
        <PaperProvider style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Formik
                innerRef={formikRef}
                    initialValues={{
                        company_id: company_id,
                        name: "",
                        phoneNumber: "",
                        postalCode: "",
                        addressNumber: "",
                        recyclePreference: "",
                        street:"",
                        district:"",
                        city:"",
                        state:""
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleRegisterRecyclePoints}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                        <View style={styles.formContainer}>

                            <Title style={styles.title}>Novo Ponto de Coleta</Title>
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
                                value={values.postalCode}
                                onBlur={handleBlur("postalCode")}
                                keyboardType={"phone-pad"}
                                onChangeText={text => {
                                    handleChange("postalCode")(text);
                                    if (text.length === 8) {
                                        fetchAddress(text, setFieldValue);
                                    }
                                }
                                }
                            />
                            <ErrorMessage error={errors.postalCode} />

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

                            <Text>Material reciclável permitido</Text>
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
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    formContainer: {
        flexGrow: 1,
        width: "100%",
        justifyContent:"center",
        
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
