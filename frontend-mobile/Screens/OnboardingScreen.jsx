import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { setItem } from "../utils/asyncStorage";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    setItem("onboarded", "1");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            key: "page1", // Add a unique key prop to each page
            backgroundColor: "#012970",
            image: (
              <View>
                <LottieView
                  style={styles.lottie}
                  source={require("../assets/animation/expenses.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Effortless Expense Management",
            subtitle:
              "Customize and add new categories to organize your expenses efficiently.",
          },
          {
            key: "page2", // Add a unique key prop to each page
            backgroundColor: "#012970",
            image: (
              <View>
                <LottieView
                  style={styles.lottie}
                  source={require("../assets/animation/finance.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Comprehensive Financial Insights",
            subtitle:
              "Visualize your income, expenses, and financial trends with interactive charts and graphs.",
          },
          {
            key: "page3", // Add a unique key prop to each page
            backgroundColor: "#012970",
            image: (
              <View>
                <LottieView
                  style={styles.lottie}
                  source={require("../assets/animation/user.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Personalized User Experience",
            subtitle:
              "Manage and update your personal information and preferences with ease.",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: 300,
    height: 400,
  },
  donebtn: {
    padding: 18,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
});
