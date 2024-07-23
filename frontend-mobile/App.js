import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./Navigation/AppNavigation";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {

    /* Splash Screen Code Starts */
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
    /* Splash Screen Code Ends */
  }, []);

  useEffect(() => {

    if (appIsReady) {
      SplashScreen.hideAsync();
    }

  }, [appIsReady]);

  /* Splash Screen Section Starts */
  if (!appIsReady) {
    return (
      <>
        <StatusBar backgroundColor="#012970" />
        <View style={styles.splashContainer}>
          <Image
            source={require("./assets/exp-logo.png")}
            style={styles.splashImage}
          />
        </View>
      </>
    );
  }
  /* Splash Screen Section Ends */

  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#012970",
  },
  splashImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});