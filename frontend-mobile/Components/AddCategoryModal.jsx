// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const AddCategoryModal = ({ visible, onClose, onAddCategory }) => {
//   const [categoryName, setCategoryName] = useState("");
//   const [errors, setErrors] = useState("");

//   const validateCategory = () => {
//     if (categoryName.trim() === "") {
//       setErrors("* Category name field is required");
//       return false;
//     }
//     setErrors("");
//     return true;
//   };

//   const handleAddCategory = () => {
//     if (!validateCategory()) {
//       return;
//     }
//     onAddCategory(categoryName); // Call the function to add the category
//     onClose(); // Close the modal
//   };

//   return (
//     <Modal
//       transparent={true}
//       visible={visible}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.title}>Add New Category</Text>
//             <View style={styles.inputContainer}>
//               <MaterialCommunityIcons
//                 name="tag-outline"
//                 size={20}
//                 style={styles.icon}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter category name"
//                 value={categoryName}
//                 onChangeText={setCategoryName}
//                 onBlur={validateCategory}
//               />
//             </View>
//             {errors ? <Text style={styles.error}>{errors}</Text> : null}
//             <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
//               <Text style={styles.buttonText}>Save changes</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//               <Text style={styles.closeButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   title: {
//     fontFamily: "merriweather-bold",
//     color: "#012970",
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   modalContent: {
//     width: "80%",
//     padding: 16,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 0.9,
//     borderColor: "#ccc",
//     marginBottom: 16,
//     borderRadius: 10,
//     width: "100%",
//   },
//   icon: {
//     marginRight: 8,
//     marginLeft: 10,
//     color: "gray",
//   },
//   input: {
//     flex: 1,
//     padding: 13,
//     fontSize: 14,
//     fontFamily: "merriweather-regular",
//   },
//   error: {
//     color: "red",
//     fontSize: 11,
//     fontFamily: "merriweather-regular",
//     marginBottom: 8,
//     marginTop: -8,
//   },
//   button: {
//     backgroundColor: "#012970",
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 10,
//     alignItems: "center",
//     width: "100%",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontFamily: "merriweather-bold",
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//   },
//   closeButtonText: {
//     color: "#007BFF",
//     fontSize: 16,
//     fontFamily: "merriweather-bold",
//   },
// });

// export default AddCategoryModal;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AddCategoryModal = ({ visible, onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState("");

  const validateCategory = () => {
    if (categoryName.trim() === "") {
      setErrors("* Category name field is required");
      return false;
    }
    setErrors("");
    return true;
  };

  const handleAddCategory = () => {
    if (!validateCategory()) {
      return;
    }
    onAddCategory(categoryName); // Call the function to add the category
    setCategoryName("");
    onClose(); // Close the modal
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.title}>Add New Category</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="tag-outline"
                size={20}
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter category name"
                value={categoryName}
                onChangeText={setCategoryName}
                onBlur={validateCategory}
              />
            </View>
            {errors ? <Text style={styles.error}>{errors}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
              <Text style={styles.buttonText}>Save changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    position: "relative", // To position the close icon
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  title: {
    fontFamily: "merriweather-bold",
    color: "#012970",
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.9,
    borderColor: "#ccc",
    marginBottom: 16,
    borderRadius: 10,
    width: "100%",
  },
  icon: {
    marginRight: 8,
    marginLeft: 10,
    color: "gray",
  },
  input: {
    flex: 1,
    padding: 13,
    fontSize: 14,
    fontFamily: "merriweather-regular",
  },
  error: {
    color: "red",
    fontSize: 11,
    fontFamily: "merriweather-regular",
    marginBottom: 8,
    marginTop: -8,
  },
  button: {
    backgroundColor: "#012970",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "merriweather-bold",
  },
});

export default AddCategoryModal;
