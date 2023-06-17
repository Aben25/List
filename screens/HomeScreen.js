import React, { useContext, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { ListContext } from '../context/ListContext';
import { ThemeContext } from '../context/ThemeContext';
import Filter from '../components/Filter';
import ListView from '../components/ListView';
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";


const HomePage = () => {
  const { items } = useContext(ListContext);
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();



  const filterItems = (category) => {
    // Implement your logic to filter items based on category
    // You can update the items state with the filtered items
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Welcome to EthioFind
          </Text>

          {user ? (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => navigation.navigate("Profile")}
            >
              <Icon name="person" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.toggleButton} onPress={() => navigation.navigate("Login")}>
              <Icon name="person" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          )}

        </View>
        <TouchableOpacity
          style={styles.searchBox}
          onPress={() => navigation.navigate("Search")}
        >
          <Icon name="search" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
        <Filter filterItems={filterItems} />
        <ListView items={items} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  gridView: {
    flex: 1,
    // Implement your Grid view styling
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  toggleButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "e0e0e0",
    borderRadius: 2,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    borderWidth: 1,
  },
});

export default HomePage;
