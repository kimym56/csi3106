import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useSetAtom } from 'jotai';
import { authAtom } from '../../atoms/auth';

export default function MyPageScreen() {
  const update = useSetAtom(authAtom);

  return (
    <View style={styles.container}>
      <Button
        title="로그아웃"
        onPress={() => {
          update({ type: 'logout' });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
