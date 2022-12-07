import React, { useCallback, useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import ClothesImage from '../../components/ClothesImage';
import { ScreenName } from '../../constants';
import { useRecommendedMarketListQuery } from '../../hooks/market';

export interface Props {
  styleId: number;
}

const snapPoints = ['30%', '95%'];

export default function ShopRecommendationBottomSheet({ styleId }: Props) {
  const ref = useRef<BottomSheet>(null);
  const query = useRecommendedMarketListQuery({ styleId });
  const { navigate } = useNavigation();

  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);

  return (
    <BottomSheet
      style={{
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 9 },
        shadowRadius: 24,
        shadowOpacity: 0.48,
        elevation: 18,
      }}
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
    >
      <View style={styles.container}>
        <FlatList
          data={query.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.flatView}
              onPress={() => {
                navigate(ScreenName.상점_상세, { clothesId: item.id });
              }}
            >
              <Text>{item.id}</Text>
              {item.frontImagePath != null && <ClothesImage style={styles.imageStyle} path={item.frontImagePath} />}
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  contentContainer: {
    flex: 1,

    alignItems: 'center',
  },
  flatView: {
    flex: 1,
    flexDirection: 'column',
  },
  imageStyle: {
    margin: 4,
    flex: 1 / 2,
    borderRadius: 8,
    height: 160,
    backgroundColor: 'gray',

    justifyContent: 'center',
    alignItems: 'center',
  },
});
