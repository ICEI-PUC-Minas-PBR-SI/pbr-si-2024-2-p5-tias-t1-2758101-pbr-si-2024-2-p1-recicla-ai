import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, ScrollView, Modal, ActivityIndicator } from "react-native";
import { Title, Paragraph, PaperProvider, Text, Menu, Button} from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeGetRequest, makePostRequest } from "../../services/apiRequests";
import { validateCpf } from "../../utils/validations";
import CustomTextInput from "../../components/CustomTextInput";
import ErrorMessage from "../../components/ErrorMessageFormik";
import { formatCPF, formatNoDots } from "../../utils/format";
import CustomButton from "../../components/CustomButton";
import LoadingModal from "../../components/LoadingModal";
import { useAuth } from "../../contexts/Auth";
import { useFocusEffect } from "@react-navigation/native";

const RegisterPoints = ({ navigation }) => {
    const { authData } = useAuth();
    const company_id = authData.id;

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [recyclePoints, setRecyclePoints] = useState([]);
    const [selectedPointName, setSelectedPointName] = useState("");

    const filteredPoints = recyclePoints.filter((point) => point.companyId == company_id);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    async function handleRegisterPoints(values, actions) {
        values.cpf = formatNoDots(values.cpf);
        try {
            setLoading(true);
            await makePostRequest("points", values);
            actions.resetForm();
            setSelectedPointName("");
            Alert.alert("Sucesso", `${values.quantity} pontos adicionados para o usuário com CPF: ${values.cpf}`);
        } catch (e) {
            console.error("Erro ao registrar Pontos do usuário:", e);
        } finally {
            setLoading(false);
        }
    }

    const fetchRecyclePoints = async () => {
        setLoading(true);
        try {
            const response = await makeGetRequest("recycle");
            setRecyclePoints(response || []);
        } catch (err) {
            console.error("Erro ao carregar os pontos de coleta.");
        } finally {
            setLoading(false);
        }
    };

    const validationSchema = Yup.object().shape({
        cpf: Yup.string()
            .required("Campo obrigatório")
            .test("valid-cpf", "CPF inválido. Use o formato 000.000.000-00", validateCpf),
        quantity: Yup.number()
            .typeError("Por favor, insira um número válido")
            .positive("Os pontos devem ser positivos")
            .required("Campo obrigatório"),
        recycle_address_id: Yup.string().required("Selecione o ponto que está sendo feito o registro dos pontos"),
    });

    const selectRecycleAddress = (setFieldValue, point) => {
        setFieldValue("recycle_address_id", point.id);
        setSelectedPointName(point.name);
        closeMenu();
    };

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                if (formikRef.current) {
                    formikRef.current.resetForm();
                    setSelectedPointName("");
                }
            };
        }, [])
    );

    useEffect(() => {
        fetchRecyclePoints();
    }, []);

    const formikRef = React.useRef();

    return (
        <PaperProvider style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Title style={styles.title}>Adicionar Pontos</Title>
                <Formik
                    innerRef={formikRef}
                    initialValues={{ cpf: "", quantity: "", company_id: company_id, recycle_address_id: "" }}
                    onSubmit={handleRegisterPoints}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
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
                            <ErrorMessage error={errors.quantity} />

                            <Text>Selecione o Ponto que está sendo feito o registro</Text>
                            <Menu
                                mode="outlined"
                                visible={visible}
                                onDismiss={closeMenu}
                                style={styles.menuStyle}
                                anchor={<Button onPress={openMenu} style={styles.menuButton} mode="outlined" labelStyle={{ color: "#000000" }}>{selectedPointName || "Selecione um ponto de coleta"}</Button>}
                            >
                                <ScrollView style={styles.menuScroll}>
                                    {filteredPoints.map((point, index) => (
                                        <Menu.Item key={index} onPress={() => selectRecycleAddress(setFieldValue, point)} title={point.name} />
                                    ))}
                                </ScrollView>
                            </Menu>
                            <ErrorMessage error={errors.recycle_address_id} />

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
    menuStyle: {
        backgroundColor: "#f0f0f0",
        color: "#000000",
        borderRadius: 8,
        marginBottom: 10,
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
});

export default RegisterPoints;
