import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React from "react";
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";
import DashCard from "../Components/DashCard";
import { BarChart } from "react-native-graph-kit";

const cardData = [
  { id: "1", title: "Balance", balance: 3000, icon: "wallet-outline" },
  { id: "2", title: "Income", balance: 5000, icon: "cash-plus" },
  { id: "3", title: "Expense", balance: 2000, icon: "cash-minus" },
];

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      data: [30, 45, 28, 80, 99],
    },
  ],
};

const DashboardScreen = () => {
  const [fontsLoaded] = useCustomFonts();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <FlatList
        data={cardData}
        renderItem={({ item }) => (
          <DashCard
            title={item.title}
            balance={item.balance}
            icon={item.icon}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.additionalCardsContainer}>
        <View style={styles.additionalCard}>
          <ScrollView
            contentContainerStyle={styles.additionalCardContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.cardTitle}>Notifications</Text>
            <Text style={styles.cardBody}>No records to display</Text>
          </ScrollView>
        </View>
        <View style={styles.additionalCard}>
          <ScrollView
            contentContainerStyle={styles.additionalCardContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.cardTitle}>Messages</Text>
            <Text style={styles.cardBody}>No records to display</Text>
          </ScrollView>
        </View>
      </View>
      {/* <BarChart
        data={data}
        width={320}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientTo: "#081c15",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      /> */}
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
  },
  flatList: {
    marginBottom: 20, // Space between DashCards and additional cards
  },
  flatListContent: {
    paddingRight: 16,
  },
  additionalCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 0, // Ensure it is below the FlatList
  },
  additionalCard: {
    width: "48%",
    minHeight: 210,
    maxHeight: 210,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
    margin: 5,
  },
  additionalCardContent: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 16,
    textAlign: "center",
  },
  chartContainer: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    padding: 10,
    margin: 10,
    shadowColor: "lightgrey",
    shadowOpacity: 1,
    backgroundColor: "white",
    shadowOffset: {
      height: 6,
      width: 5,
    },
  },
});
