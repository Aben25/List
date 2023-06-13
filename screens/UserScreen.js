import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function UserScreen() {
  
  const { user, setUser,signOut } = useContext(AuthContext);

  const handleSignOut = async () => {
    signOut();
    // Implement sign out logic
  };

  return (
    <View>
      <Text>User Screen</Text>
      {user && (
        <>
          <Text>Email: {user.email}</Text>
          <Text>Name: {user.name}</Text>
          {/* Display other user information */}
          <Button title="Sign Out" onPress={handleSignOut} />
        </>
      )}
    </View>
  );
}
