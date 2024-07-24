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
import { Entypo } from "@expo/vector-icons";
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";
import google from "../assets/google.png";
import microsoft from "../assets/microsoft.png";
import facebook from "../assets/facebook-icon.png";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [fontsLoaded] = useCustomFonts();

  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [occupation, setOccupation] = useState("");

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
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

      const userRegisterData = {
        fullName: fname,
        emailID: email,
        password: password,
        occupation: occupation
      }
      console.log(userRegisterData)
      
      axios.post("https://localhost:7026/api/UserAuth/register", userRegisterData)
        .then((result) => {
          console.log(result.status)
          if (result.status === 201) {
            Toast.show({
              type: "success",
              text1: "Registered Successfully",
              position: "top",
              visibilityTime: 2000,
            });
            setEmail("");
            setFname("");
            setPassword("");
            setCpassword("");
            setOccupation("");

            setTimeout(() => {
              navigation.navigate("Login");
            }, 2000);

          } else if (result.status === 200) {
            Toast.show({
              type: "error",
              text1: "An error occurred during registration",
              position: "top",
              visibilityTime: 2000,
            });
          }
        })
        .catch((error) => {
          console.log(error)
          Toast.show({
            type: "error",
            text1: "Contact Administrator",
            position: "top",
            visibilityTime: 2000,
          });
        })

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
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              styles.passwordInput,
              errors.password === "" ? styles.error : null,
            ]}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
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
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Entypo
              name={showPassword ? "eye-with-line" : "eye"}
              size={22}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              styles.passwordInput,
              errors.confirmPassword === "" ? styles.error : null,
            ]}
            placeholder="Enter confirm password"
            secureTextEntry={!showConfirmPassword}
            value={cpassword}
            onChangeText={(text) => {
              setCpassword(text);
              setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: validateConfirmPassword(password, text),
              }));
            }}
          />
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Entypo
              name={showConfirmPassword ? "eye-with-line" : "eye"}
              size={22}
              color="gray"
            />
          </TouchableOpacity>
        </View>
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
  passwordContainer: {
    width: "80%",
    position: "relative",
  },
  passwordInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: "merriweather-regular",
    paddingRight: 40,
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
    top: 20,
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