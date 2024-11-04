import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { PaperProvider, FAB, Menu, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import PointsDetail from "../../components/PointsDetail";
import CustomTextInput from "../../components/CustomTextInput";

const recyclePoints = [
  { id: "1", name: "Ponto de Coleta A", postalCode: "12345-678", phone: "31 912342421", materials: ["Papel", "Plástico"] },
  { id: "2", name: "Ponto de Coleta B", postalCode: "23456-789", phone: "31 912342421", materials: ["Metal", "Papel"] },
  { id: "3", name: "Ponto de Coleta C", postalCode: "34567-890", phone: "31 912342421", materials: ["Vidro", "Plástico"] },
  { id: "4", name: "Ponto de Coleta D", postalCode: "12345-128", phone: "31 912342421", materials: ["Papel", "Vidro"] },
];

const materialsOptions = ["todos", "Papel", "Plástico", "Vidro", "Metal", "Óleo", "Eletrônicos", "Tecido", "Resíduos Orgânicos"];

const MyPointsRecycleCompany = () => {
  const navigation = useNavigation();
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
                mode="contained"
                onPress={() => setVisible(true)}
              />
            }
          >
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
          </Menu>
        </View>

        {filteredPoints.map((point) => (
          <PointsDetail
            key={point.id}
            name={point.name}
            postalCode={point.postalCode}
            phone={point.phone}
            allowedMaterials={point.materials}
          />
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        label="Adicionar novo ponto"
        onPress={() => navigation.navigate("RegisterRecyclePoints")}
      />
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#e0e0e0"
  },
  selectedItem: {
    backgroundColor: "#e0e0e0",
  },
});

export default MyPointsRecycleCompany;
