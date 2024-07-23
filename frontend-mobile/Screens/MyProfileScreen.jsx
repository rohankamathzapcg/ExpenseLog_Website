import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";

const MyProfileScreen = () => {
  const [fontsLoaded] = useCustomFonts();
  const [userDetails, setUserDetails] = useState({
    fullName: "Rohan Kamath",
    emailID: "rkamath391@gmail.com.com",
    occupation: "Software Engineer",
    monthlyIncome: "15000",
  });
  const [balance, setBalance] = useState("1000");

  const handleEditBtn = () => {
    // Add your update logic here
    console.log("Updated:", userDetails);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.pagetitle}>
        <Text style={styles.title}>Profile Settings</Text>
      </View> */}
      <View style={styles.profileSetting}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require("../assets/PP.jpg")}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.plusIconBadge}>
            <Text style={styles.plusIconText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.fullName}>{userDetails.fullName}</Text>
          <Text style={styles.email}>{userDetails.emailID}</Text>
        </View>
      </View>
      <View style={styles.formInput}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            autoComplete="off"
            value={userDetails.fullName}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email-Id:</Text>
          <TextInput
            style={[styles.input, styles.disabled]}
            placeholder="Enter your email-id"
            autoComplete="off"
            value={userDetails.emailID}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Occupation:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your occupation"
            autoComplete="off"
            value={userDetails.occupation}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Monthly Income:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your monthly income"
            autoComplete="off"
            value={userDetails.monthlyIncome}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Balance:</Text>
          <TextInput
            style={[styles.input, styles.disabled]}
            placeholder="Enter your balance"
            autoComplete="off"
            value={balance}
            editable={false}
          />
        </View>
        <TouchableOpacity style={styles.updateButton} onPress={handleEditBtn}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  profileSetting: {
    marginTop: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  plusIconBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#012970",
    justifyContent: "center",
    alignItems: "center",
  },
  plusIconText: {
    color: "#fff",
    fontSize: 20,
  },
  profileDetails: {
    alignItems: "center",
  },
  fullName: {
    marginTop: 10,
    fontFamily: "merriweather-black",
  },
  email: {
    color: "gray",
    fontFamily: "merriweather-regular",
  },
  formInput: {
    flex: 1,
  },
  formGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontFamily: "merriweather-bold",
  },
  input: {
    flex: 2,
    borderWidth: 0.9,
    borderColor: "lightgray",
    borderRadius: 6,
    padding: 8,
    fontFamily: "merriweather-regular",
  },
  disabled: {
    backgroundColor: "#f1f0f0",
  },
  updateButton: {
    marginTop: 20,
    backgroundColor: "#012970",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  updateButtonText: {
    color: "white",
    fontFamily: "merriweather-regular",
  },
});

export default MyProfileScreen;
