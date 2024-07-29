import React from "react";
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DashCard = ({ title, balance, icon }) => {
  const [fontsLoaded] = useCustomFonts();

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.cardContent}>
          <View style={styles.cardIcon}>
            <MaterialCommunityIcons name={icon} size={25} color="white" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.balanceText}>₹{balance}.0</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 120,
    marginRight: 10,
    marginLeft: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 20,
  },
  cardBody: {
    padding: 2,
  },
  cardTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "merriweather-bold",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#012970",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardTextContainer: {
    // flex: 1,
  },
  balanceText: {
    fontSize: 18,
    fontFamily: "Roboto", // Adjust to ensure proper font application
  },
});

export default DashCard;
