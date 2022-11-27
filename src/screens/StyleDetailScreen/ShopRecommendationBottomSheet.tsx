import React, { useCallback, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Text } from 'react-native-paper';
import { useRecommendedMarketListQuery } from '../../hooks/market';

export interface Props {
  styleId: number;
}

const snapPoints = ['30%', '95%'];

export default function ShopRecommendationBottomSheet({ styleId }: Props) {
  const ref = useRef<BottomSheet>(null);
  const query = useRecommendedMarketListQuery({ styleId });

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
            <View style={styles.flatView}>
              <Text>{item.id}</Text>
              <View style={styles.imageStyle} />
            </View>
          )}
          numColumns={2}
          keyExtractor={(index) => index.toString()}
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
