import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Displaying for 5 secs
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = async () => {
    if (appIsReady) {
      // Hide the splash screen
      await SplashScreen.hideAsync();
    }
  };

  if (!appIsReady) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require("./assets/exp-logo.png")}
          style={styles.splashImage}
        />
      </View>
    );
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Welcome to Expense Tracker</Text>
    </View>
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
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  splashText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 20,
  },
});
