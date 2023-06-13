import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SingleListScreen = ({ route }) => {
    const { list } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Single List Screen</Text>
      {/* Add your list content here */}
      <Text>{list.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default SingleListScreen;



