import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";


const getIconByCategory = (category) => {
  switch (category) {
    case "Cupom":
      return "tag";
    case "produto":
      return "box";
    case "serviço":
      return "tool";
    default:
      return "gift";
  }
};

export default function ItemCard({ item, onPress }) {
  return (
    <Card style={styles.item} onPress={() => onPress(item)}>
      <Card.Content style={styles.cardContent}>
        <Feather name={getIconByCategory(item.category)} size={50} color="#4CAF50" style={styles.icon} />
        <Title style={styles.cardTitle}>{item.title}</Title>
        <Paragraph style={styles.cardValue}>{item.value} pontos</Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 10,
    elevation: 3,
    maxWidth: "50%",
  },
  cardContent: {
    alignItems: "center",
  },
  icon: {
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 14,
    color: "#888",
    fontWeight:"bold"
  },
});
