import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useLogout } from '../../hooks/auth';

export default function MyPageScreen() {
  const logout = useLogout();

  return (
    <View style={styles.container}>
      <Button title="๋ก๊ทธ์์" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
