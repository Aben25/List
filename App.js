import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { Button, createTheme } from "@rneui/themed";
import { SafeAreaView, StyleSheet } from "react-native";
import { AdsProvider } from "./context/AdsContext";
import UserScreen from "./screens/UserScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AdDetailsScreen from "./screens/AdDetailsScreen";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import { Switch } from "@rneui/themed";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignupScreen from "./screens/Signup";
const Stack = createStackNavigator();

function App() {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(false);


  //


  return (
    <SafeAreaView style={styles.container}>
      {/* <Switch 
      value={checked} 
      onValueChange={(value) => {setChecked(value); toggleTheme()}}
      color="primary"
      /> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="User" component={UserScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="AdDetails" component={AdDetailsScreen} />
            </>
          ) : (
            <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

function AppWrapper() {
  return (
    <AuthProvider>
      <AdsProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AdsProvider>
    </AuthProvider>
  );
}

export default AppWrapper;
