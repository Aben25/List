import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const Header = ({ toggleView }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Welcome to My Marketplace</Text>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleView}>
        <Text style={styles.toggleButtonText}>Toggle View</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
