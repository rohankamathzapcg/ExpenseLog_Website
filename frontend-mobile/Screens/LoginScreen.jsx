import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { CommonActions } from "@react-navigation/native";
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";
import google from "../assets/google.png";
import microsoft from "../assets/microsoft.png";
import facebook from "../assets/facebook-icon.png";

const LoginScreen = ({ navigation }) => {
  const [fontsLoaded] = useCustomFonts();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const validateLoginEmail = (email) => {
    const newEmailErrors = {};

    if (!email) {
      newEmailErrors.emailLogin = "Email Field is required";
    }

    setErrors(newEmailErrors);
    return !newEmailErrors.emailLogin;
  };

  const validateLoginPassword = (password) => {
    const passwordErrors = {};

    if (!password) {
      passwordErrors.passwordLogin = "Password Field is required";
    }
    setErrors(passwordErrors);
    return !passwordErrors.passwordLogin;
  };

  const handleLogin = () => {
    if (validateLoginEmail(email) && validateLoginPassword(password)) {
      // Proceed with login
      // navigation.navigate("Main");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Main" }],
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signInText}>Sign In</Text>
      <Text style={styles.socialText}>with your social network</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity>
          <Image source={google} alt="Google" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={microsoft} alt="Microsoft" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={facebook} alt="Facebook" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.orText}>OR</Text>
      <TextInput
        style={[styles.input, errors.emailLogin && styles.errorInput]}
        placeholder="Enter your email-id"
        autoCompleteType="off"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, errors.passwordLogin && styles.errorInput]}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 10,
          fontFamily: "merriweather-regular",
          fontSize: 14,
        }}
      >
        Don't have an account?
        <Text
          onPress={() => navigation.navigate("Register")}
          style={{ color: "blue" }}
        >
          {" "}
          Register!
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#ffffff",
  },
  signInText: {
    fontSize: 24,
    marginVertical: 10,
    fontFamily: "merriweather-bold",
    color: "#012970",
  },
  socialText: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: "merriweather-regular",
    color: "gray",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  icon: {
    marginHorizontal: 10,
    width: 38,
    height: 38,
  },
  orText: {
    fontSize: 16,
    marginVertical: 10,
    marginBottom: 15,
    fontFamily: "merriweather-regular",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontFamily: "merriweather-regular",
  },
  errorInput: {
    borderColor: "red",
  },
  validationText: {
    color: "red",
    marginTop: 4,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#012970",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: "merriweather-regular",
    color: "#fff",
    fontSize: 16,
  },
});
