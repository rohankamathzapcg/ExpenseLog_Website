import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AccountCard from "../Components/AccountCard";

const AccountScreen = ({ navigation }) => {
  // const { authUser } = useAuth();
  const [myAccount, setMyAccount] = useState([
    {
      accountNo: "123456789012",
      bankName: "Bank of America",
      branchName: "New York",
      balance: "5000",
    },
    {
      accountNo: "987654321098",
      bankName: "Chase Bank",
      branchName: "Los Angeles",
      balance: "7500",
    },
  ]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardContainer}>
          {myAccount.map((account, index) => (
            <AccountCard key={index} account={account} />
          ))}
          <TouchableOpacity
            style={styles.addCard}
            onPress={() => navigation.navigate("AddAccount")}
          >
            <Text style={styles.addText}> + </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  addCard: {
    width: "75%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#012970",
    borderWidth: 2,
    borderStyle: "dotted",
    borderRadius: 8,
    margin: 8,
    alignSelf: "center",
  },
  addText: {
    fontSize: 38,
    color: "#012970",
  },
});

export default AccountScreen;
