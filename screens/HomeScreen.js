import React, { useContext } from 'react';
import { Button, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getAuth } from 'firebase/auth';
import { app } from '../services/firebase';

export default function HomeScreen() {
  const { user, setUser } = useContext(AuthContext);
  const auth = getAuth(app);

  return (
    <>
      <Text>Home Screen</Text>
      {user && <Text>Email: {user.email}</Text>}
      <Button
        title="Sign out"
        onPress={async () => {
          try {
            await auth.signOut();
            setUser(null);
          } catch (error) {
            console.error(error);
          }
        }}
      />
    </>
  );
}
