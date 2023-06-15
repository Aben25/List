import React, { useContext, useState } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { AdsProvider } from '../context/SearchContext';
import { AdsContext } from '../context/SearchContext';
export default function SearchScreen() {
  const { ads, loading, searchAds } = useContext(AdsContext);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    searchAds(query);
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchInput}
        value={query}
        onChangeText={setQuery}
        placeholder="Search Ads..."
        onSubmitEditing={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={ads}
          keyExtractor={(item) => item.objectID}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>{item.title}</Text>
              {/* Render more item properties here */}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  listItem: {
    marginBottom: 10,
    // Add more styles here
  },
});
