import React, { useContext } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Button, Icon } from "@rneui/base";
import * as Google from "expo-auth-session/providers/google";
import { AuthContext } from "../context/AuthContext";

export default function WelcomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { setUser } = useContext(AuthContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 200,
      height: 200,
    },
    description: {
      textAlign: "center",
      marginHorizontal: 20,
    },
    button: {
      backgroundColor: theme.colors.secondary,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5,
      width: 150,
      height: 45,
      marginHorizontal: 10,
      marginVertical: 10,
      color: theme.colors.textOnPrimary,
    },
    skipLink: {
      position: "absolute",
      top: 30,
      right: 20,
    },
    bottomContainer: {
      position: "absolute",
      bottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
    },
    google: {
      backgroundColor: theme.colors.secondary,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5,
      width: 150,
      height: 45,
      marginHorizontal: 10,
      marginVertical: 10,
      color: theme.colors.textOnPrimary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'center',
      paddingVertical: 10,
      marginLeft: 20,

    },
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "664096704221-of2gctqemnjcn6d597rcihpc11toapkj.apps.googleusercontent.com",
    expoClientId:
      "664096704221-dnvki4bbpf9pq5pefckgdb0crrssn3ed.apps.googleusercontent.com",
  });

  const signInWithGoogle = async () => {
    try {
      const { authentication } = await promptAsync();
      // Handle authentication and sign-in here
      const credential = GoogleAuthProvider.credentialFromResult(authentication);
      if (credential) {
        const { user: firebaseUser } = await signInWithCredential(auth, credential);
        await AsyncStorage.setItem("@user", JSON.stringify(firebaseUser));
        setUser(firebaseUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipLink} onPress={() => navigation.navigate('Home')}>
        <Text>Skip</Text>
      </TouchableOpacity>
      <Image style={styles.logo} source={require('../assets/icon.png')} />
      <Text style={styles.description}>Welcome to our amazing app!</Text>
    
      <TouchableOpacity  onPress={signInWithGoogle}>
      <Text style={styles.google}>
      <Icon name="google" type="font-awesome" />
        Sign in with Google
      </Text>
      </TouchableOpacity>
    
      <View style={styles.bottomContainer}>
        <Text>Or continue with</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
