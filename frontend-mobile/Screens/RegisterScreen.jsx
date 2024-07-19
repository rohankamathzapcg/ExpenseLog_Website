import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";
import google from "../assets/google.png";
import microsoft from "../assets/microsoft.png";
import facebook from "../assets/facebook-icon.png";

const RegisterScreen = ({ navigation }) => {
  const [fontsLoaded] = useCustomFonts();

  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [occupation, setOccupation] = useState("");

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleRegister = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signInText}>Sign Up</Text>
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
        style={styles.input}
        placeholder="Enter your full name"
        value={fname}
        onChangeText={setFname}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email-id"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter confirm password"
        secureTextEntry
        value={cpassword}
        onChangeText={setCpassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your occupation"
        value={occupation}
        onChangeText={setOccupation}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 10,
          fontFamily: "merriweather-regular",
          fontSize: 14,
        }}
      >
        Already have an account?
        <Text
          onPress={() => navigation.navigate("Login")}
          style={{ color: "blue" }}
        >
          {" "}
          Login!
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;

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
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 10,
    width: 38,
    height: 38,
  },
  orText: {
    fontSize: 16,
    marginVertical: 10,
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
