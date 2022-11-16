import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import ClothesImage from '../../components/ClothesImage';
import DateTimeDisplay from '../../components/DateTimeDisplay';
import Tag from '../../components/Tag';
import { Colors, ParamList, ScreenName } from '../../constants';
import { useStyleQuery } from '../../hooks/style';

export default function StyleDetailScreen() {
  const { params } = useRoute<RouteProp<ParamList, ScreenName.스타일_상세>>();
  const query = useStyleQuery(params.styleId);

  return query.data == null ? (
    <ActivityIndicator />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.captionContainer}>
        <Text style={styles.uploaderText}>{query.data.uploaderName}님</Text>
        <DateTimeDisplay style={styles.uploadedTimeText} format="yyyy.M.d.">
          {query.data.uploadedTime}
        </DateTimeDisplay>
      </View>
      <ClothesImage style={styles.image} path={query.data.imagePath} />
      <Tag.List style={styles.tagContainer}>
        <Tag.Item title={query.data.type} />
      </Tag.List>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 26,
  },
  captionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploaderText: {
    color: Colors.ACCENT,
    fontSize: 12,
  },
  uploadedTimeText: {
    color: Colors.SECONDARY,
    fontSize: 12,
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 300,
    aspectRatio: 1.0,
    marginTop: 8,
    borderRadius: 8,
  },
  tagContainer: {
    marginTop: 12,
  },
});
