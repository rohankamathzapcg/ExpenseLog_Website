import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
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
  const [errors, setErrors] = useState({});

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "";
    } else if (!emailPattern.test(email)) {
      return "Invalid format";
    } else {
      return null;
    }
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!password) {
      return "";
    } else if (!passwordPattern.test(password)) {
      return "Password must contain alphanumeric characters, at least one special character, and be more than 8 characters long";
    } else {
      return null;
    }
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return "";
    } else if (password !== confirmPassword) {
      return "Passwords do not match";
    } else {
      return null;
    }
  };

  const validateOccupation = (occupation) => {
    if (!occupation) {
      return "";
    } else {
      return null;
    }
  };

  const validateFullname = (fullname) => {
    if (!fullname) {
      return "";
    } else {
      return null;
    }
  };

  const handleRegister = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, cpassword);
    const fullnameError = validateFullname(fname);
    const occupationError = validateOccupation(occupation);

    const allErrors = {
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      fullname: fullnameError,
      occupation: occupationError,
    };

    setErrors(allErrors);

    if (Object.values(allErrors).every((error) => error === null)) {
      Toast.show({
        type: "success",
        text1: "Registered Successfullyy!!",
        position: "top",
        visibilityTime: 1000,
      });
      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000);
    }
  };

  return (
    <>
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
          style={[styles.input, errors.fullname === "" ? styles.error : null]}
          placeholder="Enter your full name"
          value={fname}
          onChangeText={(text) => {
            setFname(text);
            setErrors((prevErrors) => ({
              ...prevErrors,
              fullname: validateFullname(text),
            }));
          }}
        />
        {errors.fullname !== "" && errors.fullname && (
          <Text style={styles.errorText}>{errors.fullname}</Text>
        )}
        <TextInput
          style={[styles.input, errors.email === "" ? styles.error : null]}
          placeholder="Enter your email-id"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: validateEmail(text),
            }));
          }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <TextInput
          style={[styles.input, errors.password === "" ? styles.error : null]}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors((prevErrors) => ({
              ...prevErrors,
              password: validatePassword(text),
              confirmPassword: validateConfirmPassword(text, cpassword),
            }));
          }}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        <TextInput
          style={[
            styles.input,
            errors.confirmPassword === "" ? styles.error : null,
          ]}
          placeholder="Enter confirm password"
          secureTextEntry
          value={cpassword}
          onChangeText={(text) => {
            setCpassword(text);
            setErrors((prevErrors) => ({
              ...prevErrors,
              confirmPassword: validateConfirmPassword(password, text),
            }));
          }}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
        <TextInput
          style={[styles.input, errors.occupation === "" ? styles.error : null]}
          placeholder="Enter your occupation"
          value={occupation}
          onChangeText={(text) => {
            setOccupation(text);
            setErrors((prevErrors) => ({
              ...prevErrors,
              occupation: validateOccupation(text),
            }));
          }}
        />
        {errors.occupation !== "" && errors.occupation && (
          <Text style={styles.errorText}>{errors.occupation}</Text>
        )}
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
            Login
          </Text>
        </Text>
      </View>
      {/* Toast message component */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
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
  error: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    width: "80%",
    textAlign: "left",
    fontFamily: "merriweather-regular",
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#012970",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "merriweather-bold",
    fontSize: 16,
  },
});
