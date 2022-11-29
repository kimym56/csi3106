import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClothesImage from '../../components/ClothesImage';
import { IMAGE_URL_PREFIX, ParamList, ScreenName } from '../../constants';
import { useMarketListQuery } from '../../hooks/market';

export default function MarketListScreen() {
  const layout = useWindowDimensions();
  const { navigate } = useNavigation();
  const { data: DATA } = useMarketListQuery();
  return (
    <View
      style={{
        marginTop: 16,
        flex: 1,
        marginHorizontal: 16,
      }}
    >
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={styles.flatView}>
            <TouchableOpacity onPress={() => navigate(ScreenName.상점_상세, { clothesId: item.id })}>
              <View style={styles.imageStyle}>
                <Image
                  source={{ uri: `${IMAGE_URL_PREFIX}${item.frontImagePath}` }}
                  style={{ flex: 1, borderRadius: 8 }}
                />
              </View>
            </TouchableOpacity>

            <View style={{ paddingHorizontal: 6, paddingTop: 4, paddingBottom: 20 }}>
              <Text style={{ fontSize: 12, fontWeight: '400' }}>{item.owner.owner_name}</Text>
              <Text style={{ fontSize: 14, fontWeight: '800', color: 'black' }}>{item.title}</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: 'black' }}>{item.price.toLocaleString()}원</Text>
            </View>
          </View>
        )}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatView: {
    flex: 1 / 2,
    flexDirection: 'column',
    alignContent: 'center',
  },
  imageStyle: {
    height: 160,
    width: 160,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 3,
    borderRadius: 8,
  },
});
