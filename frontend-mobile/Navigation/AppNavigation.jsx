import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "../Screens/DashboardScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";
import CategoriesScreen from "../Screens/CategoriesScreen";
import TransactionScreen from "../Screens/TransactionScreen";
import AccountScreen from "../Screens/AccountScreen";
import AnalyticsScreen from "../Screens/AnalyticsScreen";
import HelpCenterScreen from "../Screens/HelpCenterScreen";
import {
    MaterialCommunityIcons,
    Entypo,
    Ionicons,
    AntDesign,
} from "@expo/vector-icons";
import OnboardingScreen from "../Screens/OnboardingScreen";
import CustomDrawer from '../Components/CustomDrawer';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const [fontsLoaded] = useCustomFonts();

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
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen
                name="Dashboard"
                options={{
                    title: "Dashboard",
                    drawerIcon: () => (
                        <MaterialCommunityIcons
                            name="view-dashboard-outline"
                            size={22}
                            color="#012970"
                        />
                    ),
                }}
                component={DashboardScreen}
            />
            <Drawer.Screen
                name="Categories"
                options={{
                    title: "Expense Categories",
                    drawerIcon: () => (
                        <MaterialCommunityIcons
                            name="format-list-checkbox"
                            size={22}
                            color="#012970"
                        />
                    ),
                }}
                component={CategoriesScreen}
            />
            <Drawer.Screen
                name="Transactions"
                options={{
                    title: "Transactions",
                    drawerIcon: () => (
                        <Entypo name="back-in-time" size={22} color="#012970" />
                    ),
                }}
                component={TransactionScreen}
            />
            <Drawer.Screen
                name="Accounts"
                options={{
                    title: "My Accounts",
                    drawerIcon: () => (
                        <MaterialCommunityIcons
                            name="bank-outline"
                            size={22}
                            color="#012970"
                        />
                    ),
                }}
                component={AccountScreen}
            />
            <Drawer.Screen
                name="Analytics"
                options={{
                    title: "Analytics",
                    drawerIcon: () => (
                        <Ionicons name="bar-chart-outline" size={22} color="#012970" />
                    ),
                }}
                component={AnalyticsScreen}
            />
            <Drawer.Screen
                name="HelpCenter"
                options={{
                    title: "Help Center",
                    drawerIcon: () => (
                        <AntDesign name="customerservice" size={22} color="#012970" />
                    ),
                }}
                component={HelpCenterScreen}
            />
        </Drawer.Navigator>
    );

    return (
        <>
            <StatusBar backgroundColor="#012970" />
            <Stack.Navigator initialRouteName="Onboarding">
                <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                    options={{ headerShown: false }}
                />
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
        </>
    )
}

export default AppNavigation

const styles = StyleSheet.create({})