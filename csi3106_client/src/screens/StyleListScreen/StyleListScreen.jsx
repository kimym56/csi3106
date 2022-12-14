import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClothesImage from '../../components/ClothesImage';
import { ScreenName } from '../../constants';

export default function StyleListScreen({ data }) {
  const layout = useWindowDimensions();
  const { navigate } = useNavigation();

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.flatView}>
            <TouchableOpacity onPress={() => navigate(ScreenName.스타일_상세, { styleId: item.id })}>
              <ClothesImage
                style={[styles.imageStyle, { width: layout.width / 3, height: layout.width / 3 }]}
                path={item.imagePath}
              />
            </TouchableOpacity>
          </View>
        )}
        //Setting the number of column
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatView: {
    flex: 1 / 3,
    flexDirection: 'column',
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
