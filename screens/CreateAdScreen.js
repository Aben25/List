import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Button, Input, Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { ListContext } from "../context/ListContext";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';

export default function CreateAdScreen() {
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const { addItem } = useContext(ListContext);
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [contactInfo, setContactInfo] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    };

    const handleCreate = async () => {
        try {
            const adData = {
                userId: user.uid,
                title,
                description,
                price
            };

            console.log(adData);

            await addItem(adData, imageUri);
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            justifyContent: "center",
            paddingHorizontal: 20,
        },
        title: {
            marginBottom: 20,
            textAlign: "center",
            fontSize: 20,
        },
        input: {
            height: 40,
            borderColor: "gray",
            borderWidth: 0,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderRadius: 5,
        },
        button: {
            marginTop: 10,
            marginBottom: 10,
        },
        back: {
            position: "absolute",
            top: 30,
            left: 20,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" type="feather" color="black" size={24} />
            </TouchableOpacity>
            <Text style={styles.title}>Create Ad</Text>
            <Input
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Ad Title"
            />
            <Input
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="Ad Description"
            />
            <Input
                style={styles.input}
                onChangeText={setPrice}
                value={price}
                placeholder="Ad Price"
                keyboardType="decimal-pad"
            />
            <Button onPress={pickImage} title="Pick an image" />
            <Input
                style={styles.input}
                onChangeText={setContactInfo}
                value={contactInfo}
                placeholder="Contact Info"
            />
            <Input
                style={styles.input}
                onChangeText={setLocation}
                value={location}
                placeholder="Location"
            />
            <Input
                style={styles.input}
                onChangeText={setCategory}
                value={category}
                placeholder="Category"
            />
            <Input
                style={styles.input}
                onChangeText={setTags}
                value={tags}
                placeholder="Tags"
            />
            <Button onPress={handleCreate} title={"Create Ad"} raised={true} buttonStyle={{ backgroundColor: theme.colors.primary }} />
        </View>
    );
}
