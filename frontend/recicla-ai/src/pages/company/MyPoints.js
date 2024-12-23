import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { PaperProvider, IconButton, Menu, Text } from "react-native-paper";
import PointsDetail from "../../components/PointsDetail";
import CustomTextInput from "../../components/CustomTextInput";
import { makeGetRequest } from "../../services/apiRequests";
import LoadingModal from "../../components/LoadingModal";
import { useAuth } from "../../contexts/Auth";

const materialsOptions = ["todos", "Papel", "Plástico", "Vidro", "Metal", "Óleo", "Eletrônicos", "Tecido", "Resíduos Orgânicos"];

const MyPointsRecycleCompany = () => {
  const { authData } = useAuth();
  const company_id = authData.id;
  
  const [filter, setFilter] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("todos");
  const [recyclePoints, setRecyclePoints] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const filteredPoints = recyclePoints.filter((point) => {
    const matchesFilter = point.name.toLowerCase().includes(filter.toLowerCase());
    const matchesMaterial =
      selectedMaterial === "todos" || (point.recyclePreference?.includes(selectedMaterial) ?? false);
    const matchcompany = point.companyId == company_id;

    return matchesFilter && matchesMaterial && matchcompany;
  });

  const fetchRecyclePoints = async () => {
    try {
      setLoading(true);
      const response = await makeGetRequest("recycle");
      setRecyclePoints(response || []);
    } catch (err) {
      console.error("Erro ao carregar os pontos de coleta.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecyclePoints();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchRecyclePoints();
  }, []);

  return (
    <PaperProvider style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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
  noPointsText: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default MyPointsRecycleCompany;
