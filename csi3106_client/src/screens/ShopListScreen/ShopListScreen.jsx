import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../../constants';
import ShopItem from './ShopItem';

export default function ShopListScreen({ data }) {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.flatView}
            onPress={() => navigate(ScreenName.상점_상세, { clothesId: item.id })}
          >
            <ShopItem data={item} />
          </TouchableOpacity>
        )}
        //Setting the number of column
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  flatView: {
    width: '50%',
    padding: 8,
    flexDirection: 'column',
  },
});
