import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomDrawer = (props) => {
    const [fontsLoaded] = useCustomFonts();
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    const { navigation } = props;

    return (
        <View style={styles.DrawerContainer}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: "#012970" }}
            >
                <View style={{ padding: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Image
                            source={require("../assets/PP.jpg")}
                            style={styles.ProfileImage}
                        />
                        <Text style={styles.ProfileText}>Rohan Kamath</Text>
                        <View style={{ flexDirection: "row" }}>
                            <MaterialCommunityIcons
                                style={{ marginTop: 5 }}
                                name="email-open-outline"
                                size={15}
                                color="white"
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontFamily: "merriweather-regular",
                                    color: "#fff",
                                    margin: 5,
                                }}
                            >
                                rkamath391@gmail.com
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,backgroundColor:"#fff",paddingTop:10}}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={styles.Footer}>
                <Text></Text>
            </View>
        </View>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    DrawerContainer: {
        flex: 1,
    },
    ProfileImage: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    ProfileText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "merriweather-bold",
    },
});
