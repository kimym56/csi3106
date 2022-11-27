import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClothesImage from '../../components/ClothesImage';
import { ScreenName } from '../../constants';
import { useMyStyleListQuery } from '../../hooks/style';

export default function MarketListScreen() {
  const layout = useWindowDimensions();
  const { navigate } = useNavigation();
  // const { data: DATA } = useMyStyleListQuery();
  const DATA = [0, 1, 2, 3, 4];

  return (
    <View
      style={{
        marginTop: 16,
        marginHorizontal: 8,
        flex: 1,
      }}
    >
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={styles.flatView}>
            {/* <TouchableOpacity
                onPress={() => {
                  console.log('nav');
                }}
              /> */}
            <View style={styles.imageStyle} />
            <View style={{ marginHorizontal: 6, marginVertical: 4 }}>
              <Text>판매자 이름</Text>
              <Text>판매글 제목</Text>
              <Text>000,000원</Text>
            </View>
          </View>
        )}
        numColumns={2}
        keyExtractor={(index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatView: {
    flex: 1 / 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageStyle: {
    backgroundColor: 'gray',
    height: 160,
    width: 160,
    borderRadius: 8,
    flex: 1,
    marginLeft: 6,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
