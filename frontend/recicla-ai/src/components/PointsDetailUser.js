import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import { Linking } from "react-native";

const PointsDetailUser = ({ name, address, phoneNumber, recyclePreference, postalCode }) => {

  const confirmNavigation = () => {
    Alert.alert(
      "Abrir Google Maps",
      "Você deseja sair do aplicativo para abrir o Google Maps?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: openGoogleMaps,
        },
      ]
    );
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${postalCode}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={confirmNavigation}>
      <View style={styles.pointContainer}>
        <Text style={styles.pointName}>{name}</Text>
        <Text style={styles.detail}>Endereço: {address}</Text>
        <Text style={styles.detail}>Telefone: {phoneNumber}</Text>
        <Text style={styles.detail}>
          Materiais Permitidos: {recyclePreference}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pointContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  pointName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 14,
    color: "#666",
  },
});

export default PointsDetailUser;
