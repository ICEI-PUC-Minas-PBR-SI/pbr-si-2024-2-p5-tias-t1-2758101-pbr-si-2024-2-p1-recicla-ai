import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Text, Provider } from "react-native-paper";
import { makeGetRequest, makePostRequest } from "../../services/apiRequests";
import { useAuth } from "../../contexts/Auth";
import ItemCard from "../../components/ItemCard";
import ItemDetail from "../../components/ItemDetail";

export default function PurchaseScreen() {
  const { authData, updateUserData } = useAuth();
  const cpf = authData.cpf;
  const userPoints = authData.points;

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const handleRedeem = async (item) => {
    try {
      if (userPoints >= item.value) {

        const values = { "cpf": cpf, "product_id": item.id, "transaction_date": new Date() }

        await makePostRequest("order", values);
        await updateUserData();
        closeModal();
      }
    } catch (e) {
      console.error("Erro ao registrar Empresa:", e);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await makeGetRequest("product");

      setItems(response || []);
    } catch (err) {
      console.error("Erro ao carregar os pontos de coleta.");
    }
  };

  useEffect(() => {
    updateUserData();
    fetchItems();
  }, []);

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>Pontos: {userPoints ?? "0"}</Text>
        </View>

        <FlatList
          data={items}
          renderItem={({ item }) => <ItemCard item={item} onPress={handleItemPress} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
        />

        <ItemDetail
          visible={modalVisible}
          item={selectedItem}
          onClose={closeModal}
          onRedeem={handleRedeem}
          userPoints={userPoints}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  pointsContainer: {
    backgroundColor: "#4CAF50",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  pointsText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
});
