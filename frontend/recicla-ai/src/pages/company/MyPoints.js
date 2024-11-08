import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Modal, ActivityIndicator } from "react-native";
import { PaperProvider, FAB, Menu, IconButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import PointsDetail from "../../components/PointsDetail";
import CustomTextInput from "../../components/CustomTextInput";
import { makePostRequest, makeGetRequest } from "../../services/apiRequests";
import LoadingModal from "../../components/LoadingModal";


const materialsOptions = ["todos", "Papel", "Plástico", "Vidro", "Metal", "Óleo", "Eletrônicos", "Tecido", "Resíduos Orgânicos"];

const MyPointsRecycleCompany = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("todos");
  const [recyclePoints, setRecyclePoints] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const filteredPoints = recyclePoints.filter((point) => {
    const matchesFilter = point.name.toLowerCase().includes(filter.toLowerCase());
    const matchesMaterial =
      selectedMaterial === "todos" || (point.recyclePreference?.includes(selectedMaterial) ?? false);
    return matchesFilter && matchesMaterial;
  });

  useEffect(() => {
    const fetchRecyclePoints = async () => {
      try {
        const response = await makeGetRequest("recycle");
        setRecyclePoints(response || []);
      } catch (err) {
        console.error("Erro ao carregar os pontos de coleta.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecyclePoints();
  }, []);

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
        {loading ? (
          <LoadingModal visible={loading} />
        ) : filteredPoints.length === 0 ? (
          <Text style={styles.noPointsText}>Nenhum ponto de coleta foi encontrado</Text>
        ) : (
          filteredPoints.map((point) => (
            <PointsDetail
              key={point.id}
              name={point.name}
              postalCode={point.postalCode}
              phoneNumber={point.phoneNumber}
              recyclePreference={point.recyclePreference}
            />
          ))
        )}
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
