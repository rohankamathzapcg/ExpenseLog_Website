import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      // Simulate a task by waiting for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAppIsReady(true);
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the splash screen
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require("./assets/welcome.jpg")}
          style={styles.splashImage}
        />
        <Text style={styles.splashText}>Welcome to MyApp!</Text>
      </View>
    );
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color for the splash screen
  },
  splashImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  splashText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
