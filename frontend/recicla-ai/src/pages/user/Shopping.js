import React, { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Button, Card, Title, Paragraph, Text, Avatar, Modal as PaperModal, Portal, Provider } from "react-native-paper";
import { useAuth } from "../../contexts/Auth";

const items = [
  { id: "1", title: "Item 1", description: "Descrição detalhada do Item 1", image: "https://via.placeholder.com/100", value: 50 },
  { id: "2", title: "Item 2", description: "Descrição detalhada do Item 2", image: "https://via.placeholder.com/100", value: 70 },
  { id: "3", title: "Item 3", description: "Descrição detalhada do Item 3", image: "https://via.placeholder.com/100", value: 100 },
  { id: "4", title: "Item 4", description: "Descrição detalhada do Item 4", image: "https://via.placeholder.com/100", value: 200 },
  { id: "5", title: "Item 5", description: "Descrição detalhada do Item 5", image: "https://via.placeholder.com/100", value: 150 },
  { id: "6", title: "Item 6", description: "Descrição detalhada do Item 6", image: "https://via.placeholder.com/100", value: 1000 },
];

export default function PurchaseScreen() {
  const { authData } = useAuth();
  const userPoints = authData.points;
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.item} onPress={() => handleItemPress(item)}>
      <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
      <Card.Content>
        <Title style={styles.cardTitle}>{item.title}</Title>
        <Paragraph style={styles.cardValue}>Valor: {item.value} pontos</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>Pontos: {userPoints ?? "0" }</Text>
        </View>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
        />

        <Portal>
          <PaperModal visible={modalVisible} onDismiss={closeModal} contentContainerStyle={styles.modalContent}>
            {selectedItem && (
              <>
                <Avatar.Image size={150} source={{ uri: selectedItem.image }} style={styles.modalImage} />
                <Title>{selectedItem.title}</Title>
                <Paragraph>{selectedItem.description}</Paragraph>
                <Paragraph style={styles.modalValue}>Valor: {selectedItem.value} pontos</Paragraph>
                <Button mode="contained" onPress={closeModal}>Fechar</Button>
              </>
            )}
          </PaperModal>
        </Portal>
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
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    height: 150,
  },
  pointsText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    margin: 10,
    elevation: 3,
    maxWidth: "50%",
  },
  cardImage: {
    width: "100%",
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 14,
    color: "#888",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  modalImage: {
    marginBottom: 10,
  },
  modalValue: {
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
  },
});
