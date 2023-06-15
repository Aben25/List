import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Button, Input, Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function SignupScreen() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
    const { signUp } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // check if the passwords match and if the email is valid and update the error state
    const validateForm = () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        if (!email.includes("@")) {
            setError("Invalid email");
            return false;
        }
        return true;
    };

    // Handle user signup here
    const handleSignUp = async () => {
        if (validateForm()) {
            try {
                await signUp(email, password, userName, fullName);
            } catch (error) {
                setError(error.message);
            }
            
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

  const signup = () => {
    // Handle user signup here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Icon
            name="arrow-left"
            type="feather"
            color="black"
            size={24}
            style={styles.icon}
            />
      </TouchableOpacity>
      {/* Rest of your code */}
      <Text style={styles.title}>Sign up</Text>
    
      <Input
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChange={ () => setError("")}
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
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Input
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />

        <Text style={styles.error}>{error}</Text>

      <Button  onPress={handleSignUp} title={"Sign Up"} raised={true} buttonStyle={{backgroundColor: theme.colors.primary}}/>
      <Text></Text>
      

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}
