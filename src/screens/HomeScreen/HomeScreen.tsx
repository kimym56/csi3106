import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-paper';
import MenuButton from './MenuButton';
import ProfileDisplay from './ProfileDisplay';

export default function HomeScreen() {
  return (
    <Portal.Host>
      <View>
        <View style={styles.topContainer}>
          <ProfileDisplay />
        </View>
        <MenuButton />
      </View>
    </Portal.Host>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
