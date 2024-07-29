import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";
import { BarChart, PieChart } from "react-native-chart-kit";
import DashCard from "../Components/DashCard";
import Carousel from "react-native-reanimated-carousel"; // Import Carousel

const screenWidth = Dimensions.get("window").width;

const cardData = [
  { id: "1", title: "Balance", balance: 3000, icon: "wallet-outline" },
  { id: "2", title: "Income", balance: 5000, icon: "cash-plus" },
  { id: "3", title: "Expense", balance: 2000, icon: "cash-minus" },
];

const barData = {
  labels: ["Page A", "Page B", "Page C", "Page D"],
  datasets: [
    {
      data: [4000, 3000, 2390, 3490],
    },
  ],
};

const pieData = [
  {
    name: "Food",
    population: 215,
    color: "#f00",
    legendFontColor: "#fff",
    legendFontSize: 15,
  },
  {
    name: "Rent",
    population: 280,
    color: "#0f0",
    legendFontColor: "#fff",
    legendFontSize: 15,
  },
  {
    name: "Utilities",
    population: 525,
    color: "#00f",
    legendFontColor: "#fff",
    legendFontSize: 15,
  },
  {
    name: "Miscellaneous",
    population: 150,
    color: "#ff0",
    legendFontColor: "#fff",
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.7,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  style: {
    borderRadius: 16,
  },
  fillShadowGradient: "#3FCA89",
  fillShadowGradientOpacity: 1,
};

const notificationsData = [];

const messagesData = [];

const DashboardScreen = () => {
  const [fontsLoaded] = useCustomFonts();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Render list or "No records to display" message
  const renderListOrMessage = (data, type) => {
    if (data.length === 0) {
      return <Text style={styles.cardBody}>No records to display</Text>;
    }
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>{item.title}</Text>
            <Text style={styles.listItemBody}>{item.body}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            autoPlay
            autoPlayInterval={2000}
            width={screenWidth}
            height={150} // Adjust the height as needed
            data={cardData}
            renderItem={({ item }) => (
              <DashCard
                title={item.title}
                balance={item.balance}
                icon={item.icon}
                style={styles.dashCard}
              />
            )}
          />
        </View>
        <View style={styles.additionalCardsContainer}>
          <View style={styles.additionalCard}>
            <ScrollView
              contentContainerStyle={styles.additionalCardContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.cardTitle}>Expense Categories</Text>
              {renderListOrMessage(notificationsData, "Notifications")}
            </ScrollView>
          </View>
          <View style={styles.additionalCard}>
            <ScrollView
              contentContainerStyle={styles.additionalCardContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.cardTitle}>Recent Transactions</Text>
              {renderListOrMessage(messagesData, "Messages")}
            </ScrollView>
          </View>
        </View>
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Expenses</Text>
          <BarChart
            style={styles.graphStyle}
            data={barData}
            width={screenWidth - 64}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={0}
          />
        </View>
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Expense Breakdown</Text>
          <PieChart
            data={pieData}
            width={screenWidth - 64}
            height={210}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 5]}
            absolute
          />
        </View>
      </View>
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
  carouselContainer: {
    marginBottom: 20,
  },
  additionalCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  additionalCard: {
    width: "48%",
    minHeight: 210,
    maxHeight: 210,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
    margin: 5,
  },
  additionalCardContent: {
    paddingVertical: 10,
  },
  cardTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "merriweather-bold",
  },
  cardBody: {
    fontSize: 14,
    textAlign: "center",
    color: "lightgray",
    fontFamily: "merriweather-regular",
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 16,
    marginVertical: 8,
  },
  graphStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: "merriweather-bold",
    marginBottom: 8,
    textAlign: "center",
  },
  dashCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  listItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  listItemTitle: {
    fontSize: 16,
    fontFamily: "merriweather-bold",
  },
  listItemBody: {
    fontSize: 14,
    fontFamily: "merriweather-regular",
  },
});
