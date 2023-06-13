import React, { useContext, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ListContext } from '../context/ListContext';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Filter from '../components/Filter';
import ListView from '../components/ListView';

const HomePage = () => {
  const { items } = useContext(ListContext);
  const { theme } = useContext(ThemeContext);
  const [viewType, setViewType] = useState('grid');

  const toggleView = () => {
    setViewType(viewType === 'grid' ? 'list' : 'grid');
  };

  const filterItems = (category) => {
    // Implement your logic to filter items based on category
    // You can update the items state with the filtered items
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.innerContainer}>
        <Header toggleView={toggleView} />
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
});

export default HomePage;
