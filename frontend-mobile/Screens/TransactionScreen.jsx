import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";
import TransactionCard from "../Components/TransactionCard";

const TransactionScreen = () => {
  const [fontsLoaded] = useCustomFonts();
  const [transactions, setTransactions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch transactions data from API or use dummy data
    const fetchedTransactions = [
      {
        transactionId: 1,
        formattedDate: "2024-08-01",
        accountNo: "1234567890",
        amount: 500,
        type: "Expense",
        categoryName: "Food",
        remarks: "Lunch",
        newBalance: 4500,
      },
      {
        transactionId: 2,
        formattedDate: "2024-08-01",
        accountNo: "1234567890",
        amount: 15000,
        type: "Income",
        categoryName: "N/A",
        remarks: "Salary",
        newBalance: 14500,
      },

      // Add more transactions here
    ];
    setTransactions(fetchedTransactions);
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTransaction")}
      >
        <Text style={styles.addButtonText}>Add New Transaction</Text>
      </TouchableOpacity>
      <TransactionCard transactions={transactions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  addButton: {
    backgroundColor: "#012970",
    padding: 10,
    borderRadius: 5,
    margin: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "merriweather-regular",
  },
});

export default TransactionScreen;
