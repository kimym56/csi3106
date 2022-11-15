import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { IMAGE_URL_PREFIX, ScreenName } from '../../constants';
import { client } from '../../utils/network';

export default function StyleListScreen() {
  const layout = useWindowDimensions();
  const { navigate } = useNavigation();

  const { data: DATA } = useQuery({
    queryKey: ['styles'],
    queryFn: () => client.get('api/v1/styles/me').json(),
  });

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={styles.flatView}>
            <TouchableOpacity onPress={() => navigate(ScreenName.스타일_상세, { clothesId: item.id })}>
              <Image
                style={[styles.imageStyle, { width: layout.width / 3, height: ((layout.width / 3) * 4) / 3 }]}
                source={{ uri: `${IMAGE_URL_PREFIX}${item.imagePath}` }}
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
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
