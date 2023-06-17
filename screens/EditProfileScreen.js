import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Button, Input, Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const { user, updateProfile } = useContext(AuthContext);

  const [email, setEmail] = useState(user.email);
  const [userName, setUserName] = useState(user.userName);
  const [fullName, setFullName] = useState(user.fullName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [address, setAddress] = useState(user.address || "");
  const [preference, setPreference] = useState(user.preference || "");
  const handleUpdate = async () => {
    try {
      const profileData = {};
      if (email !== undefined && email !== "") profileData.email = email;
      if (userName !== undefined && userName !== "") profileData.userName = userName;
      if (fullName !== undefined && fullName !== "") profileData.fullName = fullName;
      if (phoneNumber !== undefined && phoneNumber !== "") profileData.phoneNumber = phoneNumber;
      if (address !== undefined && address !== "") profileData.address = address;
      if (preference !== undefined && preference !== "") profileData.preference = preference;

      console.log(profileData);
  
      await updateProfile(profileData);
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
      <Text style={styles.title}>Edit Profile</Text>
      <Input
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
        placeholder="User Name"
        autoCapitalize="none"
      />
      <Input
        style={styles.input}
        onChangeText={setFullName}
        value={fullName}
        placeholder="Full Name"
        autoCapitalize="none"
      />
      <Input
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        autoCapitalize="none"
      />
      <Input
        style={styles.input}
        onChangeText={setAddress}
        value={address}
        placeholder="Address"
      />
      <Input
        style={styles.input}
        onChangeText={setPreference}
        value={preference}
        placeholder="Preference"
      />
      <Button onPress={handleUpdate} title={"Update Profile"} raised={true} buttonStyle={{backgroundColor: theme.colors.primary}}/>
    </View>
  );
}
