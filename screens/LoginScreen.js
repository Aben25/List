import React, { useContext, useState } from "react";
import { View, StyleSheet, Text , TouchableOpacity} from "react-native";
import { Button, Input, Icon } from "@rneui/base";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";


export default function LoginScreen() {

  const { theme } = useContext(ThemeContext);
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  // validate the email and password and update the error state
  const validateForm = () => {
    if (!email.includes("@")) {
      setError("Invalid email");
      return false;
    }
  };
  // Handle user login here
  const handleLogin = async () => {
   if (!validateForm()) {
    signIn(email, password);
    return;
  }
  try {
    await signIn(email, password);
  }
  catch (error) {
    setError(error.message);

  };
  };




  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    title: {
      marginBottom: 0,
      fontSize: 60,
      fontWeight: "bold",

    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 0,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    back: {
      position: "absolute",
      top: 30,
      left: 20,
    },

    title: {
      marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
    },
  });

  const login = () => {
    // Handle user login here
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

      <Text style={styles.title}>Login</Text>
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
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button title="Login Admin" onPress={() => signIn("t@gmail.com", "099300")}
      raised={true}
      buttonStyle={{backgroundColor: theme.colors.primary}}
      />
       <Button title="Login" onPress={handleLogin} 
      raised={true}
      buttonStyle={{backgroundColor: theme.colors.primary}}
      />
      <Text></Text>
        <Button title="New User? Sign up" onPress={() => navigation.navigate("Signup")}
      buttonStyle={{marginBottom: 10}}
      type="outline"

      />
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgot}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
}
