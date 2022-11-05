import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { ParamList, ScreenName } from '../../constants';
import { useStyleQuery } from '../../hooks/style';

export default function StyleDetailScreen() {
  const { params } = useRoute<RouteProp<ParamList, ScreenName.스타일_상세>>();
  const query = useStyleQuery(params.clothesId);

  return (
    <>
      <Text>{JSON.stringify(query, undefined, 2)}</Text>
    </>
  );
}
