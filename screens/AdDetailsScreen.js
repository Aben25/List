import React from "react";
import { View } from "react-native";
import { Text, Card, Button, Icon } from '@rneui/themed';


export default function AdDetailsScreen({ route }) {
  const { ad } = route.params;

  return (
    <View>
      <Text>Title: {ad.title}</Text>
      <Text>Description: {ad.description}</Text>
      {/* Render other ad details */}
    </View>
  );
}
