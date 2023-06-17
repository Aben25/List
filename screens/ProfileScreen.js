import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Icon, Button } from "@rneui/base";
import { ListContext } from "../context/ListContext";

export default function ProfileScreen() {
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const { user, signOut } = useContext(AuthContext);
    const { items } = useContext(ListContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            paddingHorizontal: 20,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: 30,
            paddingBottom: 20,
        },
        title: {
            marginBottom: 20,
            textAlign: "center",
            fontSize: 20,
        },
        info: {
            marginBottom: 10,
        },
        ScrollView: {
            flex: 1,
            marginTop: 0,
        },
        adContainer: {
            flex: 1,
            marginBottom: 0,
        },
        item: {
            padding: 10,
            marginVertical: 10,
            borderRadius: 5,
            backgroundColor: "#f9f9f9",
        },
        itemTitle: {
            fontSize: 16,
            fontWeight: "bold",
        },
        itemDescription: {
            fontSize: 14,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" type="feather" color="black" size={24} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("CreateAd")}>
                    <Icon name="plus" type="feather" color="black" size={24} />
                </TouchableOpacity>
            </View>

            <View style={styles.adContainer}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.info}>Email: {user ? user.email : ""}</Text>
                <Text style={styles.info}>Username: {user ? user.userName : ""}</Text>
                <Text style={styles.info}>Full Name: {user ? user.fullName : ""}</Text>
                <Button onPress={() => navigation.navigate("EditProfile")} title={"Edit Profile"} raised={true} buttonStyle={{ backgroundColor: theme.colors.primary }} />
                <Button onPress={signOut} title={"Sign Out"} raised={true} buttonStyle={{ backgroundColor: theme.colors.primary }} />
            </View>
            <ScrollView style={styles.ScrollView}>
                <View style={styles.adContainer}>
                    <Text style={styles.title}>Your Ads</Text>
                    {items.filter((item) => item.userId === user.uid).map((item) => (
                        <View key={item.id} style={styles.item}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
