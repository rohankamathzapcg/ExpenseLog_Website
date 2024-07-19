import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";

const DashboardScreen = () => {
  const [fontsLoaded] = useCustomFonts();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View>
      <Text style={{ fontFamily: "merriweather-regular" }}>
        DashboardScreen
      </Text>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
