import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const Header = ({ toggleView }) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <>
     
    </>
  );
};

const styles = StyleSheet.create({
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

export default Header;
