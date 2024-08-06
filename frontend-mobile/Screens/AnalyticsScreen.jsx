// import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
// import React from "react";
// import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
// import { Provider as PaperProvider } from "react-native-paper";
// import ChartFilter from "../Components/ChartFilter";

// const screenWidth = Dimensions.get("window").width;

// const lineData = {
//   labels: ["January", "February", "March", "April", "May", "June"],
//   datasets: [
//     {
//       data: [50, 10, 40, 95, 85, 100],
//       color: (opacity = 1) => `rgba(0, 0, 245, ${opacity})`, // Changed color to blue
//       strokeWidth: 2, // optional
//     },
//   ],
// };

// const barData = {
//   labels: ["Page A", "Page B", "Page C", "Page D"],
//   datasets: [
//     {
//       data: [4000, 3000, 2390, 3490],
//       colors: [(opacity = 1) => `rgba(75, 192, 192, ${opacity})`],
//     },
//   ],
// };

// const pieData = [
//   {
//     name: "Food",
//     population: 215,
//     color: "#f00",
//     legendFontColor: "#fff",
//     legendFontSize: 15,
//   },
//   {
//     name: "Rent",
//     population: 280,
//     color: "#0f0",
//     legendFontColor: "#fff",
//     legendFontSize: 15,
//   },
//   {
//     name: "Utilities",
//     population: 525,
//     color: "#00f",
//     legendFontColor: "#fff",
//     legendFontSize: 15,
//   },
// ];

// const chartConfig = {
//   backgroundGradientFrom: "#ffffff",
//   backgroundGradientFromOpacity: 0,
//   backgroundGradientTo: "#ffffff",
//   backgroundGradientToOpacity: 0,
//   color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
//   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   barPercentage: 0.7,
//   useShadowColorFromDataset: false,
//   decimalPlaces: 0,
//   style: {
//     borderRadius: 16,
//   },
//   fillShadowGradient: "#3FCA89",
//   fillShadowGradientOpacity: 1,
// };

// const AnalyticsScreen = () => {
//   return (
//     <ScrollView
//       style={styles.scrollview}
//       contentContainerStyle={styles.container}
//     >
//       <PaperProvider>
//         <ChartFilter filterChange={(filter) => console.log(filter)} />
//       </PaperProvider>
//       {/* Line Chart Card */}
//       <View style={styles.chartCard}>
//         <Text style={styles.chartTitle}>Monthly Trends</Text>
//         <LineChart
//           data={lineData}
//           width={screenWidth - 32} // Adjusting for padding inside the card
//           height={220}
//           chartConfig={chartConfig}
//           bezier
//           style={styles.chart}
//         />
//       </View>

//       {/* Bar Chart Card */}
//       <View style={styles.chartCard}>
//         <Text style={styles.chartTitle}>Bar Chart</Text>
//         <BarChart
//           data={barData}
//           width={screenWidth - 32} // Adjusting for padding inside the card
//           height={220}
//           chartConfig={chartConfig}
//           style={styles.chart}
//         />
//       </View>

//       {/* Pie Chart Card */}
//       <View style={styles.chartCard}>
//         <Text style={styles.chartTitle}>Expense Breakdown</Text>
//         <PieChart
//           data={pieData}
//           width={screenWidth - 32} // Adjusting for padding inside the card
//           height={220}
//           chartConfig={chartConfig}
//           accessor="population"
//           backgroundColor="transparent"
//           paddingLeft="15"
//           center={[10, 10]}
//           absolute
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default AnalyticsScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   scrollview: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   chartCard: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     elevation: 3, // For Android shadow
//     shadowColor: "#000", // For iOS shadow
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     padding: 16,
//     marginVertical: 8,
//   },
//   chartTitle: {
//     fontSize: 16,
//     fontFamily: "merriweather-bold",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   chart: {
//     marginVertical: 8,
//     borderRadius: 16,
//   },
// });
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { Provider as PaperProvider } from "react-native-paper";
import ChartFilter from "../Components/ChartFilter";

const screenWidth = Dimensions.get("window").width;

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [50, 10, 40, 95, 85, 100],
      color: (opacity = 1) => `rgba(0, 0, 245, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const barData = {
  labels: ["Page A", "Page B", "Page C", "Page D"],
  datasets: [
    {
      data: [4000, 3000, 2390, 3490],
      colors: [(opacity = 1) => `rgba(75, 192, 192, ${opacity})`],
    },
  ],
};

const pieData = [
  {
    name: "Food",
    population: 215,
    color: "#f00",
    legendFontColor: "#000",
    legendFontSize: 12,
  },
  {
    name: "Rent",
    population: 280,
    color: "#0f0",
    legendFontColor: "#000",
    legendFontSize: 12,
  },
  {
    name: "Utilities",
    population: 525,
    color: "#00f",
    legendFontColor: "#000",
    legendFontSize: 12,
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

const AnalyticsScreen = () => {
  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.container}
    >
      <PaperProvider>
        {/* Line Chart Card */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Trends</Text>
          <LineChart
            data={lineData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Bar Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.filterContainer}>
            <ChartFilter filterChange={(filter) => console.log(filter)} />
          </View>
          <Text style={styles.chartTitle}>Bar Chart</Text>
          <BarChart
            data={barData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </View>

        {/* Pie Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.filterContainer}>
            <ChartFilter filterChange={(filter) => console.log(filter)} />
          </View>
          <Text style={styles.chartTitle}>Expense Breakdown</Text>
          <PieChart
            data={pieData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 10]}
            absolute
          />
        </View>
      </PaperProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#fff",
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
    position: "relative",
  },
  filterContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: "merriweather-bold",
    marginBottom: 8,
    textAlign: "left",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default AnalyticsScreen;
