import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGE_URL_PREFIX, ScreenName } from '../../constants';
import { useMyShopListQuery } from '../../hooks/shop';

export default function ShopListScreen() {
  const layout = useWindowDimensions();
  const { navigate } = useNavigation();

  const { data: DATA } = useMyShopListQuery();

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={styles.flatView}>
            <TouchableOpacity onPress={() => navigate(ScreenName.상점_상세, { clothesId: item.id })}>
              <Image
                style={[styles.imageStyle, { width: layout.width / 3, height: ((layout.width / 3) * 4) / 3 }]}
                source={{ uri: `${IMAGE_URL_PREFIX}${item.frontImagePath}` }}
              />
            </TouchableOpacity>
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatView: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
