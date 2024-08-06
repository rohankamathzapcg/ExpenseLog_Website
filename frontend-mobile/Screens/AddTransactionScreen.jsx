import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DropDown from "react-native-drop-down-mith";
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTransactionScreen = ({ navigation }) => {
  const [fontsLoaded] = useCustomFonts();
  const [transactionDetails, setTransactionDetails] = useState({
    transactionType: "",
    transactionDate: new Date(),
    tCategory: "",
    bAccount: "",
    remarks: "",
    amount: 0,
  });
  const [errors, setErrors] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // Fetch accounts and categories data here
    setAccounts([
      { id: 0, value: "123456", label: "Bank A - 123456" },
      { id: 1, value: "789012", label: "Bank B - 789012" },
    ]);
    setCategories([
      { id: 0, value: "1", label: "Food" },
      { id: 1, value: "2", label: "Travel" },
    ]);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!transactionDetails.transactionType) {
      newErrors.transactionType = "* Transaction type is required";
    }
    if (!transactionDetails.transactionDate) {
      newErrors.transactionDate = "* Transaction Date is required";
    }
    if (
      transactionDetails.transactionType === "Expense" &&
      !transactionDetails.tCategory
    ) {
      newErrors.tCategory = "* Category is required for expense mode";
    }
    if (!transactionDetails.bAccount) {
      newErrors.bAccount = "* Bank account is required";
    }
    if (!transactionDetails.amount) {
      newErrors.amount = "* Amount is required";
    }
    if (!transactionDetails.remarks) {
      newErrors.remarks = "* Remarks are required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTransactionDetails({
        ...transactionDetails,
        transactionDate: selectedDate,
      });
    }
  };

  const handleSubmitBtn = () => {
    if (validateForm()) {
      console.log(transactionDetails);
      Toast.show({
        type: "success",
        text1: "Transaction Added Successfully",
        visibilityTime: 2000,
        onHide: () => {
          navigation.goBack();
        },
      });
      setTransactionDetails({
        transactionType: "",
        transactionDate: new Date(),
        tCategory: "",
        bAccount: "",
        remarks: "",
        amount: 0,
      });
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Transaction Type</Text>
        <DropDown
          titleStyle={styles.dropdownTitle}
          // title={
          //   transactionDetails.transactionType || "Choose your transaction mode"
          // }
          onClick={(item) =>
            setTransactionDetails({
              ...transactionDetails,
              transactionType: item.value,
            })
          }
          placeHolder="Choose your transaction mode"
          data={[
            { id: 0, value: "Income", label: "Income Mode" },
            { id: 1, value: "Expense", label: "Expense Mode" },
          ]}
          itemStyle={styles.dropdownItem} // Custom font for dropdown items
        />
        {errors.transactionType && (
          <Text style={styles.error}>{errors.transactionType}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Transaction Date</Text>
        <TextInput
          style={styles.input}
          value={transactionDetails.transactionDate.toDateString()}
          onTouchStart={() => setShowDatePicker(true)}
          editable={true}
        />
        {showDatePicker && (
          <DateTimePicker
            value={transactionDetails.transactionDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {errors.transactionDate && (
          <Text style={styles.error}>{errors.transactionDate}</Text>
        )}
      </View>

      {transactionDetails.transactionType === "Expense" && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <DropDown
            titleStyle={styles.dropdownTitle}
            // title={"Choose your category"}
            onClick={(item) =>
              setTransactionDetails({
                ...transactionDetails,
                tCategory: item.label,
              })
            }
            placeHolder="Choose your category"
            data={categories}
            itemStyle={styles.dropdownItem} // Custom font for dropdown items
          />
          {errors.tCategory && (
            <Text style={styles.error}>{errors.tCategory}</Text>
          )}
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Bank Account</Text>
        <DropDown
          titleStyle={styles.dropdownTitle}
          // title={transactionDetails.bAccount || "Choose your bank account"}
          onClick={(item) =>
            setTransactionDetails({
              ...transactionDetails,
              bAccount: item.value,
            })
          }
          placeHolder="Choose your bank account"
          data={accounts}
          itemStyle={styles.dropdownItem} // Custom font for dropdown items
        />
        {errors.bAccount && <Text style={styles.error}>{errors.bAccount}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          // placeholder=""
          value={transactionDetails.amount}
          keyboardType="numeric"
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except dot
            setTransactionDetails({
              ...transactionDetails,
              amount: numericValue,
            });
          }}
        />
        {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Remarks</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Leave your remarks here"
          multiline
          value={transactionDetails.remarks}
          textAlignVertical="top"
          onChangeText={(text) =>
            setTransactionDetails({ ...transactionDetails, remarks: text })
          }
        />
        {errors.remarks && <Text style={styles.error}>{errors.remarks}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmitBtn}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "merriweather-bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    fontFamily: "merriweather-regular",
    height: 40,
  },
  dropdownTitle: {
    marginBottom: 5,
    marginLeft: 3,
    fontFamily: "merriweather-bold",
    // fontWeight: "bold",
  },
  dropdownItem: {
    fontFamily: "merriweather-regular", // Custom font for dropdown items
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    fontFamily: "merriweather-regular",
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    height: 100,
  },
  error: {
    color: "red",
    marginTop: 5,
    fontFamily: "merriweather-regular",
    fontSize: 10,
  },
  button: {
    backgroundColor: "#012970",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "merriweather-regular",
  },
});

export default AddTransactionScreen;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import DropDown from "react-native-drop-down-mith";
// import { useCustomFonts } from "../fonts/useCustomFont";
// import AppLoading from "expo-app-loading";
// import Toast from "react-native-toast-message";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

// const AddTransactionScreen = ({ navigation }) => {
//   const [fontsLoaded] = useCustomFonts();
//   const [transactionDetails, setTransactionDetails] = useState({
//     transactionType: "",
//     transactionDate: new Date(),
//     tCategory: "",
//     bAccount: "",
//     remarks: "",
//     amount: 0,
//   });
//   const [errors, setErrors] = useState({});
//   const [accounts, setAccounts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     // Fetch accounts and categories data here
//     setAccounts([
//       { id: 0, value: "123456", label: "Bank A - 123456" },
//       { id: 1, value: "789012", label: "Bank B - 789012" },
//     ]);
//     setCategories([
//       { id: 0, value: "1", label: "Food" },
//       { id: 1, value: "2", label: "Travel" },
//     ]);
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!transactionDetails.transactionType) {
//       newErrors.transactionType = "* Transaction type is required";
//     }
//     if (!transactionDetails.transactionDate) {
//       newErrors.transactionDate = "* Transaction Date is required";
//     }
//     if (
//       transactionDetails.transactionType === "Expense" &&
//       !transactionDetails.tCategory
//     ) {
//       newErrors.tCategory = "* Category is required for expense mode";
//     }
//     if (!transactionDetails.bAccount) {
//       newErrors.bAccount = "* Bank account is required";
//     }
//     if (!transactionDetails.amount) {
//       newErrors.amount = "* Amount is required";
//     }
//     if (!transactionDetails.remarks) {
//       newErrors.remarks = "* Remarks are required";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setTransactionDetails({
//         ...transactionDetails,
//         transactionDate: selectedDate,
//       });
//     }
//   };

//   const handleSubmitBtn = () => {
//     if (validateForm()) {
//       console.log(transactionDetails);
//       Toast.show({
//         type: "success",
//         text1: "Transaction Added Successfully",
//         visibilityTime: 2000,
//         onHide: () => {
//           navigation.goBack();
//         },
//       });
//       setTransactionDetails({
//         transactionType: "",
//         transactionDate: new Date(),
//         tCategory: "",
//         bAccount: "",
//         remarks: "",
//         amount: 0,
//       });
//     }
//   };

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Transaction Type</Text>
//         <View style={styles.inputContainer}>
//           <MaterialCommunityIcons
//             name="swap-horizontal"
//             size={20}
//             style={styles.icon}
//           />
//           <DropDown
//             titleStyle={styles.dropdownTitle}
//             onClick={(item) =>
//               setTransactionDetails({
//                 ...transactionDetails,
//                 transactionType: item.value,
//               })
//             }
//             placeHolder="Choose your transaction mode"
//             data={[
//               { id: 0, value: "Income", label: "Income Mode" },
//               { id: 1, value: "Expense", label: "Expense Mode" },
//             ]}
//             itemStyle={styles.dropdownItem}
//           />
//         </View>
//         {errors.transactionType && (
//           <Text style={styles.error}>{errors.transactionType}</Text>
//         )}
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Transaction Date</Text>
//         <View style={styles.inputContainer}>
//           <MaterialCommunityIcons
//             name="calendar"
//             size={20}
//             style={styles.icon}
//           />
//           <TextInput
//             style={styles.input}
//             value={transactionDetails.transactionDate.toDateString()}
//             onTouchStart={() => setShowDatePicker(true)}
//             editable={false}
//           />
//           {showDatePicker && (
//             <DateTimePicker
//               value={transactionDetails.transactionDate}
//               mode="date"
//               display="default"
//               onChange={handleDateChange}
//             />
//           )}
//         </View>
//         {errors.transactionDate && (
//           <Text style={styles.error}>{errors.transactionDate}</Text>
//         )}
//       </View>

//       {transactionDetails.transactionType === "Expense" && (
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Category</Text>
//           <View style={styles.inputContainer}>
//             <MaterialCommunityIcons name="tag" size={20} style={styles.icon} />
//             <DropDown
//               titleStyle={styles.dropdownTitle}
//               onClick={(item) =>
//                 setTransactionDetails({
//                   ...transactionDetails,
//                   tCategory: item.label,
//                 })
//               }
//               placeHolder="Choose your category"
//               data={categories}
//               itemStyle={styles.dropdownItem}
//             />
//           </View>
//           {errors.tCategory && (
//             <Text style={styles.error}>{errors.tCategory}</Text>
//           )}
//         </View>
//       )}

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Bank Account</Text>
//         <View style={styles.inputContainer}>
//           <MaterialCommunityIcons name="bank" size={20} style={styles.icon} />
//           <DropDown
//             titleStyle={styles.dropdownTitle}
//             onClick={(item) =>
//               setTransactionDetails({
//                 ...transactionDetails,
//                 bAccount: item.value,
//               })
//             }
//             placeHolder="Choose your bank account"
//             data={accounts}
//             itemStyle={styles.dropdownItem}
//           />
//         </View>
//         {errors.bAccount && <Text style={styles.error}>{errors.bAccount}</Text>}
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Amount</Text>
//         <View style={styles.inputContainer}>
//           <FontAwesome name="money" size={20} style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             value={transactionDetails.amount.toString()}
//             keyboardType="numeric"
//             onChangeText={(text) => {
//               const numericValue = text.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except dot
//               setTransactionDetails({
//                 ...transactionDetails,
//                 amount: numericValue,
//               });
//             }}
//           />
//         </View>
//         {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Remarks</Text>
//         <View style={styles.inputContainer}>
//           <FontAwesome name="pencil" size={20} style={styles.icon} />
//           <TextInput
//             style={styles.textArea}
//             placeholder="Leave your remarks here"
//             multiline
//             value={transactionDetails.remarks}
//             textAlignVertical="top"
//             onChangeText={(text) =>
//               setTransactionDetails({ ...transactionDetails, remarks: text })
//             }
//           />
//         </View>
//         {errors.remarks && <Text style={styles.error}>{errors.remarks}</Text>}
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmitBtn}>
//         <Text style={styles.buttonText}>Save Changes</Text>
//       </TouchableOpacity>
//       <Toast ref={(ref) => Toast.setRef(ref)} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 5,
//     fontFamily: "merriweather-bold",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 2,
//     padding: 10,
//     height: 40,
//   },
//   input: {
//     flex: 1,
//     fontSize: 14,
//     fontFamily: "merriweather-regular",
//   },
//   dropdownTitle: {
//     marginBottom: 5,
//     marginLeft: 3,
//     fontFamily: "merriweather-bold",
//   },
//   dropdownItem: {
//     fontFamily: "merriweather-regular",
//   },
//   textArea: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     fontFamily: "merriweather-regular",
//     borderRadius: 5,
//     padding: 10,
//     fontSize: 14,
//     height: 100,
//   },
//   error: {
//     color: "red",
//     fontSize: 12,
//     fontFamily: "merriweather-regular",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontFamily: "merriweather-bold",
//   },
//   icon: {
//     marginRight: 10,
//   },
// });

// export default AddTransactionScreen;
