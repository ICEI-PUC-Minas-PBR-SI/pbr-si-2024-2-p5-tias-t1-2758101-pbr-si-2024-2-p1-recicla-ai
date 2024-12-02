import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, RefreshControl } from "react-native";
import { PaperProvider, Menu, IconButton } from "react-native-paper";
import PointsDetailUser from "../../components/PointsDetailUser";
import CustomTextInput from "../../components/CustomTextInput";
import { makeGetRequest } from "../../services/apiRequests";
import LoadingModal from "../../components/LoadingModal";
import { useAuth } from "../../contexts/Auth";
import HistoryDetail from "../../components/HistoryDetail";

const materialsOptions = ["todos", "Papel", "Plástico", "Vidro", "Metal", "Óleo", "Eletrônicos", "Tecido", "Resíduos Orgânicos"];

const Points = () => {
  const {authData} = useAuth();
  const cpf = authData.cpf

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const fetchOrders = async () => {
    if (!cpf) {
      console.warn("CPF não disponível.");
      setOrders([]);
      setLoading(false);
      return;
    }
  
    try {
      setLoading(true);
      const response = await makeGetRequest(`order/${cpf}`);
  
      setOrders(response || []);
    } catch (err) {
      console.error("Erro ao carregar os pontos de coleta:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };
  
  

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };


  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <PaperProvider style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      >

        {loading ? (
          <LoadingModal visible={loading} />
        ) : orders.length === 0 ? (
          <Text style={styles.noPointsText}>Nenhum resgate foi concluído ainda</Text>
        ) : (
          orders.map((ord) => (
            <HistoryDetail
              key={ord.id}
              id={ord.name}
              cpf={ord.cpf}
              date={ord.transactionDate}
            />
          ))
        )}
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "center",
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  selectedItem: {
    backgroundColor: "#e0e0e0",
  },
  menuScroll: {
    backgroundColor: "#f0f0f0",
    maxHeight: 360,
  },
  noPointsText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default Points;
