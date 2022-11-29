import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function profileImage() {
  return (
    <View style={styles.profileImage}>
      <LinearGradient colors={['#6600ff', '#ff6bd0']} style={{ flex: 1, borderRadius: 50 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    alignSelf: 'center',
  },
  profileImage: {
    marginTop: 18,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#6600ff',
    borderStyle: 'solid',
    borderRadius: 50,
  },
});
