import React from "react";
import { View, Text } from "react-native";
import { Image , ButtonGroup} from "@rneui/themed";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const SingleListScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      
        <ScrollView style={styles.container}>
          <Image
            style={styles.img}
            source={{ uri: item.image }}
            containerStyle={styles.item}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.title}>Single List Screen</Text>
          <Text>Item ID: {item.id}</Text>
          <Text>Item Name: {item.disc}</Text>
          </ScrollView>      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 0,
    padding: 2,
  },
  list: {
    width: "100%",
    backgroundColor: "#000",
  },
  img: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 16,
  },

});

export default SingleListScreen;
