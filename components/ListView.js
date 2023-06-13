import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image , TouchableOpacity} from 'react-native';
import { ListContext } from '../context/ListContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const ListView = ({ items }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  const renderItem = ({ item }) => (
    <View style={styles.listItemContainer}>
      <Image source={{ uri: item.imageUrls }} style={styles.listItemImage} />
      <View style={styles.listItemContent}>
        <Text style={[styles.listItemTitle, { color: theme.colors.primary }]}>{item.title}</Text>
        <Text style={styles.listItemDescription}>{item.category}</Text>
        <TouchableOpacity style={styles.listItemButton}
        onPress={() => {
          navigation.navigate('SingleList', { item: item });
        }}
        >
            <Text style={styles.listItemButtonText}>View Details</Text>
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
  },
  listItemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  listItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listItemDescription: {
    fontSize: 14,
    color: '#888888',
  },
    listItemButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    marginTop: 8,
    },
});

export default ListView;
