import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useCustomFonts } from "../fonts/useCustomFont";
import AppLoading from "expo-app-loading";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomDrawer = (props) => {
    const [fontsLoaded] = useCustomFonts();
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <View style={styles.DrawerContainer}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#012970" }}>
                <View style={{ padding: 20 }}>
                    <Image source={require('../assets/PP.jpg')} style={styles.profileImage} />
                    <Text style={styles.profileText}>Rohan Kamath</Text>
                    <View style={{ flexDirection: 'row' }} >
                        <MaterialCommunityIcons style={{ marginTop: 5 }} name="email-open-outline" size={15} color="white" />
                        <Text style={{ fontSize: 12, fontFamily: "merriweather-regular", color: "#fff", margin: 5 }}>rkamath391@gmail.com</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View>
                <Text>Footer</Text>
            </View>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    DrawerContainer: {
        flex: 1
    },
    profileImage: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 10
    },
    profileText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "merriweather-bold"
    }
})