import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Button, Input, Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { ListContext } from "../context/ListContext";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import { app } from "../services/firebase";
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAvoidingView } from 'react-native';



import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CreateAdScreen() {
    const [image, setImage] = useState(null);
    const [imageBlob, setImageBlob] = useState(null);
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const { addItem } = useContext(ListContext);
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [open, setOpen] = useState(false);
    const [catogory, setCatogory] = useState(null);
    const [items, setItems] = useState([
        { label: 'English', value: 'en' },
        { label: 'Deutsch', value: 'de' },
        { label: 'French', value: 'fr' },
    ]);

    // create category list
    const [selectedIndex, setSelectedIndex] = useState(0);
    const buttons = ["Electronics", "Furniture", "Clothing", "Other"];




    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);

            const response = await fetch(result.assets[0].uri);
            const blob = await response.blob();
            setImageBlob(blob);
        }
    };

    const handleCreate = async () => {
        try {
            const adData = {
                id: Date.now().toString(),
                userId: user.uid,
                title,
                description,
                price,
                catogory,
                phone,
                location


            };

            const storage = getStorage(app);
            const storageRef = ref(storage, `images/${adData.id}`);
            const uploadSnapshot = await uploadBytes(storageRef, imageBlob);

            const downloadURL = await getDownloadURL(storageRef);
            adData.image = downloadURL;

            await addItem(adData);
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
        
        <ScrollView keyboardShouldPersistTaps='handled'
        horizontal={true}
  contentContainerStyle={{
   flexDirection: 'column',
   justifyContent: 'space-around',
   width: '100%',
  }}
        >

            <View style={styles.container}>
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
                <Input
                    style={styles.input}
                    onChangeText={setLocation}
                    value={location}
                    placeholder="Ad Location"
                />
                <Input
                    style={styles.input}
                    onChangeText={setPhone}
                    value={phone}
                    placeholder="Ad Phone"
                    keyboardType="phone-pad"
                />
                <Input
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Ad Email"
                    keyboardType="email-address"
                />
                <DropDownPicker
                    open={open}
                    value={catogory}
                    items={items}
                    setOpen={setOpen}
                    setValue={setCatogory}
                    setItems={setItems}
                />

                <View style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    marginBottom: 10,
                    marginVertical: 11,

                }}>
                    <TouchableOpacity onPress={pickImage}>
                        <Text style={{
                            color: theme.colors.primary,
                            marginVertical: 10,
                            marginLeft: 10,
                        }}>Pick an image from camera roll <Icon name="add" type="material" color={theme.colors.primary} style={{
                            color: theme.colors.primary,
                            marginVertical: 0,
                        }} /></Text>

                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
                </View>

                <Button onPress={handleCreate} title={"Create Ad"} raised={true} buttonStyle={{ backgroundColor: theme.colors.primary }} />
            </View>
        </ScrollView>

    );
}
