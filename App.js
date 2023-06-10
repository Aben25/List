import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, AuthProvider } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { ThemeProvider, Button, createTheme } from '@rneui/themed';
import { SafeAreaView, StyleSheet } from 'react-native';

const Stack = createStackNavigator();


const theme = createTheme({
  components: {
    Button: {
      raised: true,
    },
  },
});

function App() {
  const { user } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>

        <NavigationContainer>
          <Stack.Navigator>
            {user ? (
              <Stack.Screen name="Home" component={HomeScreen} 
              options={{headerShown: false}}/>
            ) : (
              <Stack.Screen name="Login" component={LoginScreen}
              options={{headerShown: false}}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>

    </ThemeProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWrapper;
