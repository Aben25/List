import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { Button, createTheme } from "@rneui/themed";
import { SafeAreaView, StyleSheet } from "react-native";
import { AdsProvider } from "./context/SearchContext";
import SettingsScreen from "./screens/SettingsScreen";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import { Switch } from "@rneui/themed";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignupScreen from "./screens/Signup";
import { ListContext, ListProvider } from "./context/ListContext";
import SingleListScreen from "./screens/SingleListScreen";
import ForgotPasswordScreen from "./screens/ForgotPassword";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import CreateAdScreen from "./screens/CreateAdScreen";


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
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Profile" component={ProfileScreen}
              options={{ headerShown: false }}
              />
              <Stack.Screen name="EditProfile" component={EditProfileScreen}
              options={{ headerShown: false }}
              />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="SingleList" component={SingleListScreen} />
              <Stack.Screen name="CreateAd" component={CreateAdScreen} />
              

            </>
          ) : (
            <>
              <Stack.Screen name="SingleList" component={SingleListScreen} />

              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
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
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Search" component={SearchScreen}
              options={{ headerShown: false }} />
              

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
    <ListProvider>
      <AuthProvider>
        <AdsProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AdsProvider>
      </AuthProvider>
    </ListProvider>
  );
}

export default AppWrapper;
