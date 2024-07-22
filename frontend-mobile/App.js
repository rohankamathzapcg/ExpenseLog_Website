import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DashboardScreen from "./Screens/DashboardScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import { useCustomFonts } from "./fonts/useCustomFont";
import AppLoading from "expo-app-loading";
import CategoriesScreen from "./Screens/CategoriesScreen";
import TransactionScreen from "./Screens/TransactionScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useCustomFonts();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

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

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const DrawerNavigator = () => (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#012970",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "merriweather-bold",
        },
        drawerLabelStyle: {
          fontFamily: "merriweather-regular",
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        options={{ title: "Dashboard" }}
        component={DashboardScreen}
      />
      <Drawer.Screen
        name="Categories"
        options={{ title: "Expense Categories" }}
        component={CategoriesScreen}
      />
      <Drawer.Screen
        name="Transactions"
        options={{ title: "Transactions" }}
        component={TransactionScreen}
      />
    </Drawer.Navigator>
  );

  return (
    <>
      <StatusBar backgroundColor="#012970" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Main"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
