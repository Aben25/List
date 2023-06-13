import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ListContext } from '../context/ListContext';

const Filter = ({ filterItems }) => {
  const { theme } = useContext(ListContext);

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity style={styles.filterButton} onPress={() => filterItems('all')}>
        <Text style={styles.filterButtonText}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={() => filterItems('electronics')}>
        <Text style={styles.filterButtonText}>Electronics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton} onPress={() => filterItems('clothing')}>
        <Text style={styles.filterButtonText}>Clothing</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Filter;
