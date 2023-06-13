import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Linking,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { getAuth } from "firebase/auth";
import { app } from "../services/firebase";
import { Header as HeaderRNE, Icon, Text, Card, Button } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
import { AdsContext } from "../context/AdsContext";
import { useNavigation } from "@react-navigation/native";
export default function HomeScreen() {
  const { ads, loading, searchAds } = useContext(AdsContext);
  const { user, setUser } = useContext(AuthContext);
  const auth = getAuth(app);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    searchAds(searchText);
  };

  const handleNavigateToSettings = () => {
    navigation.navigate("Settings");
  };

  const handleNavigateToUser = () => {
    navigation.navigate("User");
  };
  const handleNavigateToAdDetails = (ad) => {
    navigation.navigate("AdDetails", { ad });
  };
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <HeaderRNE
        leftComponent={{
          icon: "menu",
          color: "#fff",
        }}
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={handleNavigateToSettings}>
              <Icon type="antdesign" name="setting" color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={handleNavigateToUser}
            >
              <Icon type="antdesign" name="user" color="white" />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: "EthioList", style: styles.heading }}
      />

      <SearchBar
        placeholder="Search Ads..."
        onChangeText={setSearchText}
        value={searchText}
        onSubmitEditing={handleSearch}
      />

      {ads.length === 0 ? (
        <Text>No ads available</Text>
      ) : (
        <FlatList
          data={ads}
          keyExtractor={(item) => item.objectID}
          renderItem={({ item }) => (
            <View>
              <Card>
                <Card.Title>{item.title}</Card.Title>
                <Card.Divider />
                <Card.Image
                  style={{ padding: 0 }}
                  source={{
                    uri: item.imageUrls,
                  }}
                />
                <Text style={{ marginBottom: 10 }}>{item.description}</Text>
                <Button
                  icon={
                    <Icon
                      name="code"
                      color="#ffffff"
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  onPress={() => handleNavigateToAdDetails(item)}
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  title="VIEW NOW"
                />
              </Card>
            </View>
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#397af8",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 15,
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
