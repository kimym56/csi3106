import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useCurrentUserQuery } from '../../hooks/user';

export default function ProfileDisplay() {
  const query = useCurrentUserQuery();

  return query.isLoading ? (
    <ActivityIndicator />
  ) : query.isSuccess ? (
    <View>
      <View style={styles.item}>
        <Text style={styles.header}>이메일</Text>
        <Text>{query.data?.email}</Text>
      </View>
      <Text>프로필 사진은.. 서버가 안 내려줘서 아직 못 보여주지만 꼭 보여줘야 할까?</Text>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
  },
  header: {
    marginRight: 4,
    fontWeight: 'bold',
  },
});
