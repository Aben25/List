import React, { useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Linking,
  StyleProp,
  TextStyle,
  ViewStyle,
  } from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { getAuth } from "firebase/auth";
import { app } from "../services/firebase";
import { Header as HeaderRNE, HeaderProps, Icon } from "@rneui/themed";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const docsNavigate = () => {
    Linking.openURL(`https://reactnativeelements.com/docs/${props.view}`);
  };
  
  const playgroundNavigate = () => {
    Linking.openURL(`https://@rneui/themed.js.org/#/${props.view}`);
  };
  const { user, setUser } = useContext(AuthContext);
  const auth = getAuth(app);

  return (
    <>
      <HeaderRNE
        leftComponent={{
          icon: "menu",
          color: "#fff",
        }}
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={docsNavigate}>
              <Icon name="description" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={playgroundNavigate}
            >
              <Icon type="antdesign" name="rocket1" color="white" />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: "Header", style: styles.heading }}
      />
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

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  });
  