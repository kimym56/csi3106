import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants';

export interface Props {
  title: string;
}

export default function TagItem({ title }: Props) {
  return <Text style={styles.container}>#{title}</Text>;
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    color: Colors.ACCENT,
    fontWeight: 'bold',
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.ACCENT,
    borderRadius: 20,
  },
});
