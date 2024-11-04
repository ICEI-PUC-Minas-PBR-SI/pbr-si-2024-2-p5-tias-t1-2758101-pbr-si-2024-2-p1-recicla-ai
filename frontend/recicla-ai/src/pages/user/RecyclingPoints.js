import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native"; // Importando Text
import { PaperProvider, Menu, IconButton } from "react-native-paper";
import PointsDetailUser from "../../components/PointsDetailUser";
import CustomTextInput from "../../components/CustomTextInput";

const recyclePoints = [
  { id: "1", name: "Ponto de Coleta A", address: "Rua A, 123 - Centro", phone: "31 912342421", materials: ["Papel", "Plástico"] },
  { id: "2", name: "Ponto de Coleta B", address: "Avenida B, 456 - Bairro", phone: "31 912342421", materials: ["Metal", "Papel"] },
  { id: "3", name: "Ponto de Coleta C", address: "Praça C, 789 - Vila", phone: "31 912342421", materials: ["Vidro", "Plástico"] },
  { id: "4", name: "Ponto de Coleta D", address: "Estrada D, 101 - Zona Rural", phone: "31 912342421", materials: ["Papel", "Vidro"] },
];

const materialsOptions = ["todos", "Papel", "Plástico", "Vidro", "Metal", "Óleo", "Eletrônicos", "Tecido", "Resíduos Orgânicos"];

const Points = () => {
  const [filter, setFilter] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("todos");
  const [visible, setVisible] = useState(false);

  const filteredPoints = recyclePoints.filter(point => {
    const matchesFilter = point.name.toLowerCase().includes(filter.toLowerCase());
    const matchesMaterial = selectedMaterial === "todos" || point.materials.includes(selectedMaterial);
    return matchesFilter && matchesMaterial;
  });

  return (
    <PaperProvider style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Filtrar pontos de coleta..."
            value={filter}
            onChangeText={setFilter}
            style={{ flex: 1, marginRight: 10 }}
          />
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <IconButton
                icon="filter"
                color="black"
                mode="outlined"
                onPress={() => setVisible(true)}
              />
            }
          >
            <ScrollView style={styles.menuScroll}>
              {materialsOptions.map((material) => (
                <Menu.Item
                  key={material}
                  onPress={() => {
                    setSelectedMaterial(material);
                    setVisible(false);
                  }}
                  title={material}
                  style={selectedMaterial === material ? styles.selectedItem : null}
                />
              ))}
            </ScrollView>
          </Menu>
        </View>

        {filteredPoints.length === 0 ? ( // Verifica se não há pontos filtrados
          <Text style={styles.noPointsText}>Nenhum ponto de coleta foi encontrado com esse filtro</Text>
        ) : (
          filteredPoints.map((point) => (
            <PointsDetailUser
              key={point.id}
              name={point.name}
              address={point.address}
              phone={point.phone}
              allowedMaterials={point.materials}
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
