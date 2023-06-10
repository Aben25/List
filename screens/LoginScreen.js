import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { Input } from '@rneui/themed';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, signUp, user } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    // Check if the user is already signed in
    if (user) {
      navigation.navigate('Home');
    }
  }, [user, navigation]);

  const handleSignIn = () => {
    signIn(email.trim(), password.trim())
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignUp = () => {
    signUp(email.trim(), password.trim())
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Input
          placeholder="Email"
          leftIcon={{ type: 'font-awesome', name: 'at' }}
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Password"
          value={password}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.buttonContainer}>
          <Button
            title="SIGN IN"
            disabled={false}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={styles.button}
            onPress={handleSignIn}
          />

          <Button
            title="SIGN UP"
            disabled={false}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={styles.button}
            onPress={handleSignUp}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'rgba(92, 99,216, 1)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    width: 150,
    height: 45,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
