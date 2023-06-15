import React, { useContext, useState } from "react";
import { View, StyleSheet, Text , TouchableOpacity} from "react-native";
import { Button, Input, Icon, Dialog } from "@rneui/base";

import { ThemeContext } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";


export default function ForgotPasswordScreen() {

  const { theme } = useContext(ThemeContext);
  const { forgotPassword } = useContext(AuthContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleResetPassword = async () => {
    try {
      await forgotPassword(email);
      setDialogVisible(true);
    } catch (error) {
      setError(error.message);
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
    back: {
      position: "absolute",
      top: 30,
      left: 20,
    },
  });

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

      <Text style={styles.title}>Reset Password</Text>
      <Input
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button title="Reset Password" onPress={handleResetPassword}
      raised={true}
      buttonStyle={{backgroundColor: theme.colors.primary}}
      />

      <Dialog style={{backgroundColor: theme.colors.background }}
        isVisible={dialogVisible}
        onBackdropPress={() => setDialogVisible(false)}
      >
        <Dialog.Title title="Password Reset"/>
        <Text style={{ color:theme.colors.background }}>An email has been sent to reset your password.</Text>
        <Dialog.Actions>
          <Dialog.Button title="OK" onPress={() => { setDialogVisible(false), navigation.navigate("Login")}}/>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
