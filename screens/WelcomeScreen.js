import React, { createContext, useState,useEffect ,useContext } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Button, Icon } from "@rneui/base";
import * as Google from "expo-auth-session/providers/google";
import { AuthContext } from "../context/AuthContext";
import * as WebBrowser from "expo-web-browser";


WebBrowser.maybeCompleteAuthSession();

export default function WelcomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { setUser } = useContext(AuthContext);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
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

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUser(user);
    } catch (error) {
      // Add your own error handler here
    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipLink} onPress={() => navigation.navigate('Home')}>
        <Text>Skip</Text>
      </TouchableOpacity>
      <Image style={styles.logo} source={require('../assets/icon.png')} />
      <Text style={styles.description}>Welcome to our amazing app!</Text>
    
      <TouchableOpacity   disabled={!request}
          onPress={() => {
            promptAsync();
          }}>
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
