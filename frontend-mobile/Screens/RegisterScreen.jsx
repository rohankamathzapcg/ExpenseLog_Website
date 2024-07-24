// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import React, { useState } from "react";
// import { useCustomFonts } from "../fonts/useCustomFont";
// import AppLoading from "expo-app-loading";
// import google from "../assets/google.png";
// import microsoft from "../assets/microsoft.png";
// import facebook from "../assets/facebook-icon.png";

// const RegisterScreen = ({ navigation }) => {
//   const [fontsLoaded] = useCustomFonts();

//   const [fname, setFname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [cpassword, setCpassword] = useState("");
//   const [occupation, setOccupation] = useState("");
//   const [errors, setErrors] = useState({});

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }

//   const validateEmail = (email) => {
//     const newEmailErrors = {};
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!email) {
//       newEmailErrors.email = "Email Field is required";
//     } else if (email && !emailPattern.test(email)) {
//       newEmailErrors.email = "Invalid format";
//     } else {
//       newEmailErrors.email = null;
//     }
//     setErrors((prevErrors) => ({ ...prevErrors, ...newEmailErrors }));
//     return !newEmailErrors.email;
//   };

//   const validatePassword = (password) => {
//     const newPasswordErrors = {};
//     const passwordPattern =
//       /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

//     if (!password) {
//       newPasswordErrors.password = "Password Field is required";
//     } else if (password && !passwordPattern.test(password)) {
//       newPasswordErrors.password =
//         "Password must contain alphanumeric characters, at least one special character, and be more than 8 characters long";
//     } else {
//       newPasswordErrors.password = null;
//     }
//     setErrors((prevErrors) => ({ ...prevErrors, ...newPasswordErrors }));
//     return !newPasswordErrors.password;
//   };

//   const validateConfirmPassword = (password, confirmPassword) => {
//     const newConfirmPasswordErrors = {};
//     if (!confirmPassword) {
//       newConfirmPasswordErrors.confirmPassword =
//         "Confirm Password Field is required";
//     } else if (password !== confirmPassword) {
//       newConfirmPasswordErrors.confirmPassword = "Passwords do not match";
//     } else {
//       newConfirmPasswordErrors.confirmPassword = null;
//     }
//     setErrors((prevErrors) => ({ ...prevErrors, ...newConfirmPasswordErrors }));
//     return !newConfirmPasswordErrors.confirmPassword;
//   };

//   const validateOccupation = (occupation) => {
//     const newOccupationErrors = {};
//     if (!occupation) {
//       newOccupationErrors.occupation = "Occupation Field is required";
//     } else {
//       newOccupationErrors.occupation = null;
//     }
//     setErrors((prevErrors) => ({ ...prevErrors, ...newOccupationErrors }));
//     return !newOccupationErrors.occupation;
//   };

//   const validateFullname = (fullname) => {
//     const newFullnameErrors = {};
//     if (!fullname) {
//       newFullnameErrors.fullname = "Fullname Field is required";
//     } else {
//       newFullnameErrors.fullname = null;
//     }
//     setErrors((prevErrors) => ({ ...prevErrors, ...newFullnameErrors }));
//     return !newFullnameErrors.fullname;
//   };

//   const handleRegister = () => {
//     const isValidEmail = validateEmail(email);
//     const isValidPassword = validatePassword(password);
//     const isValidConfirmPassword = validateConfirmPassword(password, cpassword);
//     const isValidFullname = validateFullname(fname);
//     const isValidOccupation = validateOccupation(occupation);

//     if (
//       isValidEmail &&
//       isValidPassword &&
//       isValidConfirmPassword &&
//       isValidFullname &&
//       isValidOccupation
//     ) {
//       navigation.navigate("Login");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.signInText}>Sign Up</Text>
//       <Text style={styles.socialText}>with your social network</Text>
//       <View style={styles.socialButtons}>
//         <TouchableOpacity>
//           <Image source={google} alt="Google" style={styles.icon} />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image source={microsoft} alt="Microsoft" style={styles.icon} />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image source={facebook} alt="Facebook" style={styles.icon} />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.orText}>OR</Text>
//       <TextInput
//         style={[styles.input, errors.fullname ? styles.error : null]}
//         placeholder="Enter your full name"
//         value={fname}
//         onChangeText={(text) => {
//           setFname(text);
//           validateFullname(text);
//         }}
//       />
//       <TextInput
//         style={[styles.input, errors.email ? styles.error : null]}
//         placeholder="Enter your email-id"
//         value={email}
//         onChangeText={(text) => {
//           setEmail(text);
//           validateEmail(text);
//         }}
//       />
//       {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
//       <TextInput
//         style={[styles.input, errors.password ? styles.error : null]}
//         placeholder="Enter your password"
//         secureTextEntry
//         value={password}
//         onChangeText={(text) => {
//           setPassword(text);
//           validatePassword(text);
//           validateConfirmPassword(text, cpassword);
//         }}
//       />
//       {errors.password && (
//         <Text style={styles.errorText}>{errors.password}</Text>
//       )}
//       <TextInput
//         style={[styles.input, errors.confirmPassword ? styles.error : null]}
//         placeholder="Enter confirm password"
//         secureTextEntry
//         value={cpassword}
//         onChangeText={(text) => {
//           setCpassword(text);
//           validateConfirmPassword(password, text);
//         }}
//       />
//       {errors.confirmPassword && (
//         <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//       )}
//       <TextInput
//         style={[styles.input, errors.occupation ? styles.error : null]}
//         placeholder="Enter your occupation"
//         value={occupation}
//         onChangeText={(text) => {
//           setOccupation(text);
//           validateOccupation(text);
//         }}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>Register</Text>
//       </TouchableOpacity>
//       <Text
//         style={{
//           marginTop: 10,
//           fontFamily: "merriweather-regular",
//           fontSize: 14,
//         }}
//       >
//         Already have an account?
//         <Text
//           onPress={() => navigation.navigate("Login")}
//           style={{ color: "blue" }}
//         >
//           {" "}
//           Login!
//         </Text>
//       </Text>
//     </View>
//   );
// };

// export default RegisterScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: 20,
//     backgroundColor: "#ffffff",
//   },
//   signInText: {
//     fontSize: 24,
//     marginVertical: 10,
//     fontFamily: "merriweather-bold",
//     color: "#012970",
//   },
//   socialText: {
//     fontSize: 16,
//     marginVertical: 10,
//     fontFamily: "merriweather-regular",
//     color: "gray",
//   },
//   socialButtons: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginBottom: 10,
//   },
//   icon: {
//     marginHorizontal: 10,
//     width: 38,
//     height: 38,
//   },
//   orText: {
//     fontSize: 16,
//     marginVertical: 10,
//     fontFamily: "merriweather-regular",
//   },
//   input: {
//     width: "80%",
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginVertical: 10,
//     paddingHorizontal: 10,
//     fontFamily: "merriweather-regular",
//   },
//   error: {
//     borderColor: "red",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 12,
//     width: "80%",
//     textAlign: "left",
//   },
//   button: {
//     width: "80%",
//     height: 40,
//     backgroundColor: "#012970",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5,
//     marginVertical: 10,
//   },
//   buttonText: {
//     fontFamily: "merriweather-regular",
//     color: "#fff",
//     fontSize: 16,
//   },
// });
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
  const [errors, setErrors] = useState({});

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const validateEmail = (email) => {
    const newEmailErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailPattern.test(email)) {
      newEmailErrors.email = "Invalid format";
    } else {
      newEmailErrors.email = null;
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newEmailErrors }));
    return !newEmailErrors.email;
  };

  const validatePassword = (password) => {
    const newPasswordErrors = {};
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (password && !passwordPattern.test(password)) {
      newPasswordErrors.password =
        "Password must contain alphanumeric characters, at least one special character, and be more than 8 characters long";
    } else {
      newPasswordErrors.password = null;
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newPasswordErrors }));
    return !newPasswordErrors.password;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    const newConfirmPasswordErrors = {};
    if (confirmPassword && password !== confirmPassword) {
      newConfirmPasswordErrors.confirmPassword = "Passwords do not match";
    } else {
      newConfirmPasswordErrors.confirmPassword = null;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newConfirmPasswordErrors,
    }));
    return !newConfirmPasswordErrors.confirmPassword;
  };

  const validateOccupation = (occupation) => {
    const newOccupationErrors = {};
    if (!occupation) {
      newOccupationErrors.occupation = "Occupation Field is required";
    } else {
      newOccupationErrors.occupation = null;
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newOccupationErrors }));
    return !newOccupationErrors.occupation;
  };

  const validateFullname = (fullname) => {
    const newFullnameErrors = {};
    if (!fullname) {
      newFullnameErrors.fullname = "Fullname Field is required";
    } else {
      newFullnameErrors.fullname = null;
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newFullnameErrors }));
    return !newFullnameErrors.fullname;
  };

  const handleRegister = () => {
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const isValidConfirmPassword = validateConfirmPassword(password, cpassword);
    const isValidFullname = validateFullname(fname);
    const isValidOccupation = validateOccupation(occupation);

    if (
      isValidEmail &&
      isValidPassword &&
      isValidConfirmPassword &&
      isValidFullname &&
      isValidOccupation
    ) {
      navigation.navigate("Login");
    }
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
        style={[styles.input, errors.fullname ? styles.error : null]}
        placeholder="Enter your full name"
        value={fname}
        onChangeText={(text) => {
          setFname(text);
          validateFullname(text);
        }}
      />
      <TextInput
        style={[styles.input, errors.email ? styles.error : null]}
        placeholder="Enter your email-id"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        style={[styles.input, errors.password ? styles.error : null]}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          validatePassword(text);
          validateConfirmPassword(text, cpassword);
        }}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <TextInput
        style={[styles.input, errors.confirmPassword ? styles.error : null]}
        placeholder="Enter confirm password"
        secureTextEntry
        value={cpassword}
        onChangeText={(text) => {
          setCpassword(text);
          validateConfirmPassword(password, text);
        }}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}
      <TextInput
        style={[styles.input, errors.occupation ? styles.error : null]}
        placeholder="Enter your occupation"
        value={occupation}
        onChangeText={(text) => {
          setOccupation(text);
          validateOccupation(text);
        }}
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
          Login
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
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: "merriweather-regular",
    color: "#fff",
    fontSize: 16,
  },
});
